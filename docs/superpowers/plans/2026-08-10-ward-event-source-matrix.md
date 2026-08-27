# Ward Event Source Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a verified 23-ward source matrix for moving, pregnancy/birth/child-rearing, and death.

**Architecture:** Define one canonical 33-subflow taxonomy, research wards in three independent shards, normalize source capabilities and coverage states, then merge and validate the full 759-record cross-product. Existing production procedure and engine files remain unchanged.

**Tech Stack:** Markdown, JSON, official web sources, PowerShell/Node read-only validation.

---

### Task 1: Freeze taxonomy and schema

**Files:**
- Create: `CORE_SUBFLOWS_2026-08-10.md`
- Create: `data/ward_event_subflows.json`

- [ ] Define 11 moving, 10 childbirth, and 12 death subflows.
- [ ] Map applicable subflows to existing `procedures.json` IDs.
- [ ] Define coverage and capability enums without ambiguous booleans.
- [ ] Verify 33 unique subflow IDs and valid event IDs.

### Task 2: Research wards 13101–13108

**Files:**
- Create: `data/research_parts/ward_event_sources_13101_13108.json`

- [ ] Open official ward pages and officially linked services for Chiyoda through Koto.
- [ ] Produce eight ward records, each with sources and exactly 33 coverage records.
- [ ] Record official page update dates separately from the verification date.
- [ ] Do not treat reservation, prefill, or assisted counters as online completion.

### Task 3: Research wards 13109–13116

**Files:**
- Create: `data/research_parts/ward_event_sources_13109_13116.json`

- [ ] Open official ward pages and officially linked services for Shinagawa through Toshima.
- [ ] Produce eight ward records, each with sources and exactly 33 coverage records.
- [ ] Record vendor hosting and official wrapper pages.
- [ ] Use `missing` only after an explicit official-site search.

### Task 4: Research wards 13117–13123

**Files:**
- Create: `data/research_parts/ward_event_sources_13117_13123.json`

- [ ] Open official ward pages and officially linked services for Kita through Edogawa.
- [ ] Produce seven ward records, each with sources and exactly 33 coverage records.
- [ ] Treat Nerima's older CSV as discovery evidence, not automatically current procedure truth.
- [ ] Preserve source-level update dates for Edogawa and other mixed-freshness entries.

### Task 5: Merge normalized dataset

**Files:**
- Create: `data/ward_event_source_matrix.json`

- [ ] Combine taxonomy, definitions, and all three ward shards.
- [ ] Sort wards by code and coverage by canonical subflow order.
- [ ] Preserve every source reference and do not deduplicate across different authorities.

### Task 6: Build human-readable report

**Files:**
- Create: `WARD_EVENT_SOURCE_MATRIX_2026-08-10.md`

- [ ] Show one status grid per life event.
- [ ] Summarize complete/partial/missing/unverified counts by ward and event.
- [ ] List source-capability evidence and the most important gaps.
- [ ] State limitations and recommended offline checks.

### Task 7: Full validation

**Files:**
- Verify: all artifacts above

- [ ] Confirm 23 ward codes, 33 subflows, and 759 unique coverage records.
- [ ] Check source references, enum values, required reasons, HTTPS URLs, and replacement characters.
- [ ] Check every `complete/partial` row has at least one source.
- [ ] Check capability contradictions, especially prefill versus online submission.
- [ ] Re-read requirements and report any remaining evidence gaps honestly.

## Plan self-review

- Every approved deliverable maps to a concrete task and file.
- Wards are isolated into three non-conflicting research files.
- No existing engine or production-data mutation is included.
- No vague implementation placeholders remain.
