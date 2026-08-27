/**
 * 経路計算エンジンのテスト。`npm test` で実行（Node built-in test runner、依存無し）。
 * 実データではなくフィクスチャに対して回す——データの増減でテストが壊れないように。
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addCalendar, computeDue, daysUntil,
  evalExpr, resolveRoute, countDocuments, groupByWindow, timeline,
  YES, NO, UNKNOWN,
} from '../src/route.js';

/* ── 期限の暦計算 ───────────────────────────── */

test('3か月は90日ではない（暦の応当日で満了）', () => {
  const due = addCalendar(new Date('2026-08-01'), 3, 'month');
  assert.equal(due.toISOString().slice(0, 10), '2026-11-01'); // 92日後
});

test('10か月・3年も暦で計算される', () => {
  assert.equal(addCalendar(new Date('2026-08-01'), 10, 'month').toISOString().slice(0, 10), '2027-06-01');
  assert.equal(addCalendar(new Date('2026-08-01'), 3, 'year').toISOString().slice(0, 10), '2029-08-01');
});

test('応当日が無い月は月末に丸める（1/31の1か月後→2/28）', () => {
  assert.equal(addCalendar(new Date('2026-01-31'), 1, 'month').toISOString().slice(0, 10), '2026-02-28');
  assert.equal(addCalendar(new Date('2024-01-31'), 1, 'month').toISOString().slice(0, 10), '2024-02-29'); // 閏年
});

test('day 単位は素直に日数加算', () => {
  assert.equal(addCalendar(new Date('2026-08-25'), 14, 'day').toISOString().slice(0, 10), '2026-09-08');
});

test('起算日は deadline.from のイベント日。無ければ仮置き(assumed)', () => {
  const dl = { value: 3, unit: 'month', from: 'death', kind: 'irreversible' };
  const base = new Date('2026-08-07');

  const known = computeDue(dl, base, { death: new Date('2026-08-01') });
  assert.equal(known.assumed, false);
  assert.equal(known.due.toISOString().slice(0, 10), '2026-11-01');

  const assumed = computeDue(dl, base, {});
  assert.equal(assumed.assumed, true);
  assert.equal(assumed.due.toISOString().slice(0, 10), '2026-11-07'); // baseDate起算で仮置き
});

test('daysUntil は経過を差し引いた残り日数を返す', () => {
  const dl = { value: 3, unit: 'month', from: 'death' };
  const days = daysUntil(dl, new Date('2026-08-07'), { death: new Date('2026-08-01') });
  assert.equal(days, 86); // 11/1 まで、8/7 から数えて
});

/* ── 3値論理 ───────────────────────────── */

test('未回答は UNKNOWN、駅は消えない', () => {
  assert.equal(evalExpr('insurance==kokuho', {}), UNKNOWN);
  assert.equal(evalExpr('insurance==kokuho', { insurance: 'kokuho' }), YES);
  assert.equal(evalExpr('insurance==kokuho', { insurance: 'shaho' }), NO);
});

/* ── 書類の通数（要確認を含む） ───────────────────────────── */

const docDb = {
  documents: { documents: [{ id: 'koseki', name: { ja: '戸籍謄本' }, fee: 450, reusable: false }] },
};
const mkStation = (id, detail) => ({
  id, status: 'required', requires: ['koseki'],
  requires_detail: detail === undefined ? undefined : { koseki: detail },
});

test('submit は通数に積む、show は1通を使い回す', () => {
  const r = countDocuments(docDb, [mkStation('a', 'submit'), mkStation('b', 'submit'), mkStation('c', 'show')]);
  assert.equal(r[0].copies, 2);
  assert.equal(r[0].copiesMax, 2);
});

test('提出方法が未確認の手続は show 扱いにせず「要確認」として幅で返す', () => {
  const r = countDocuments(docDb, [mkStation('a', 'submit'), mkStation('b', undefined), mkStation('c', undefined)]);
  assert.equal(r[0].copies, 1);        // 最少 = 確認済み submit のみ
  assert.equal(r[0].copiesMax, 3);     // 最多 = 未確認2件が全て submit だった場合
  assert.equal(r[0].unconfirmedAt.length, 2);
  assert.equal(r[0].costMax, 1350);
});

/* ── 窓口のまとめ（管轄地） ───────────────────────────── */

const winStation = (id, jurisdiction) => ({
  id, status: 'required', requires: [],
  window: {
    type: 'kuyakusho', authority: '市区町村',
    label: { ja: 'お住まいの市区町村の窓口' },
    ...(jurisdiction ? { jurisdiction } : {}),
  },
});

test('旧住所地と新住所地は同じ「市区町村」でも別グループになる', () => {
  const emptyDb = { documents: { documents: [] } };
  const groups = groupByWindow(emptyDb, [
    winStation('tenshutsu', 'old'),
    winStation('tennyu', 'new'),
    winStation('mynumber', 'new'),
    winStation('kokuho', 'both'),
  ]);
  assert.equal(groups.length, 3); // old / new / both
  const byJur = Object.fromEntries(groups.map(g => [g.jurisdiction, g]));
  assert.equal(byJur.new.total, 2);
  assert.equal(byJur.new.oneTripPossible, true);   // 新住所地の役所内ではまとめられる
  assert.equal(byJur.both.oneTripPossible, false); // 両方で手続が要るものは1回では済まない
});

test('jurisdiction 無し（死別など同一自治体内）は従来どおり1グループ', () => {
  const emptyDb = { documents: { documents: [] } };
  const groups = groupByWindow(emptyDb, [winStation('a'), winStation('b')]);
  assert.equal(groups.length, 1);
  assert.equal(groups[0].oneTripPossible, true);
});

/* ── timeline に起算日情報が乗る ───────────────────────────── */

test('timeline は due と「起算日が仮置きか」を返す', () => {
  const stations = [{
    id: 'x', status: 'required', name: { ja: 'x' }, line: 'l',
    deadline: { value: 14, unit: 'day', from: 'moving', kind: 'legal' },
  }];
  const withDate = timeline(stations, new Date('2026-08-07'), { moving: new Date('2026-08-20') });
  assert.equal(withDate[0].dueAssumed, false);
  assert.equal(withDate[0].due.toISOString().slice(0, 10), '2026-09-03');
  assert.equal(withDate[0].days, 27); // 8/7 から 9/3 まで

  const noDate = timeline(stations, new Date('2026-08-07'), {});
  assert.equal(noDate[0].dueAssumed, true);
});

/* ── resolveRoute の3値 ───────────────────────────── */

test('appears_when が偽なら hidden、未回答なら maybe で残る', () => {
  const db = {
    scenarios: { scenarios: [{ id: 's', procedures: ['p'] }] },
    procedures: { procedures: [{ id: 'p', appears_when: ['has_dog==true'], window: { type: 'kuyakusho', authority: '市区町村', label: { ja: 'w' } } }] },
  };
  assert.equal(resolveRoute(db, 's', { has_dog: false }).stations[0].status, 'hidden');
  assert.equal(resolveRoute(db, 's', {}).stations[0].status, 'maybe');
  assert.equal(resolveRoute(db, 's', { has_dog: true }).stations[0].status, 'required');
});
