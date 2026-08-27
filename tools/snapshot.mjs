/** ブラウザで描いた路線図SVGを受け取って docs/ に保存する（発表用スクショの元） */
import fs from 'node:fs';
process.stdin.setEncoding('utf-8');
let buf = '';
process.stdin.on('data', d => buf += d);
process.stdin.on('end', () => {
  fs.writeFileSync(process.argv[2], buf, 'utf-8');
  console.log('saved', process.argv[2], buf.length, 'bytes');
});
