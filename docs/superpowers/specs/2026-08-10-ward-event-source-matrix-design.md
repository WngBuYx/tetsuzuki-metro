# Ward Event Source Matrix Design

## Goal

Create a source-traceable Tokyo 23-ward matrix for three first-version life events: moving, pregnancy/birth/child-rearing, and death. The matrix must show which concrete subflows are covered and must distinguish information, questionnaire, reservation, prefill, formal online submission, mandatory visit, and assisted counter.

## Approved scope

The user explicitly approved these three deliverables on 2026-08-10:

1. Split the three core life events into concrete subflows.
2. Build `ward × event × subflow × official source` coverage with `complete / partial / missing / unverified`.
3. Separate seven service capabilities instead of treating everything as “online”.

No front-end, route-engine, procedure, document, condition, or municipality production data is changed in this task.

## Subflow taxonomy

### Moving (`moving`)

| ID | Subflow |
|---|---|
| `moving_guidance` | Event-level guide or questionnaire |
| `move_out_notification` | Moving-out notification to the old municipality |
| `myna_move_out_online` | MyNa Portal online moving-out path |
| `move_in_notification` | Moving-in notification to the new ward |
| `intra_ward_move_notification` | Address change inside the same ward |
| `mynumber_address_continued_use` | My Number address/certificate update and continued use |
| `national_health_insurance_move` | National Health Insurance loss/enrollment/change |
| `child_allowance_move` | Child allowance loss/recognition after moving |
| `care_insurance_move` | Long-term care insurance and eligibility certificate handling |
| `seal_registration_move` | Seal registration cancellation/re-registration |
| `mandatory_visit_summary` | Explicit statement of what still requires a visit; derived from official sources |

### Pregnancy, birth, and child-rearing (`childbirth`)

| ID | Subflow |
|---|---|
| `pregnancy_notification_handbook` | Pregnancy notification and Maternal and Child Health Handbook |
| `pregnancy_interview_support` | Pregnancy interview and pregnancy support benefit |
| `birth_notification` | Birth notification |
| `child_health_insurance` | Enrollment of the child in health insurance |
| `child_allowance_birth` | Child allowance application after birth |
| `child_medical_subsidy` | Infant/child medical expense subsidy |
| `childbirth_lump_sum` | Childbirth lump-sum benefit |
| `newborn_visit_health_guidance` | Newborn visit, health consultation, and infant guidance |
| `foreign_child_residence_status` | Residence-status application for a foreign-national child born in Japan |
| `childcare_support_navigation` | Post-birth child-rearing services and support navigation |

### Death (`death`)

| ID | Subflow |
|---|---|
| `death_guidance` | Bereavement handbook or personalized procedure guide |
| `death_notification_cremation` | Death notification and cremation permit |
| `household_register_change` | Resident-register and head-of-household changes |
| `mynumber_seal_return` | My Number card and seal-registration-card handling |
| `health_insurance_return` | NHI or late-elderly insurance certificate handling |
| `funeral_benefit` | Funeral-expense benefit |
| `care_insurance_return` | Long-term care insurance certificate handling |
| `pension_survivor_procedures` | Pension death report, unpaid pension, survivor benefits |
| `resident_tax_heir_representative` | Resident-tax heir representative and related ward tax guidance |
| `foreign_resident_card_return` | Residence card or special permanent resident certificate return |
| `bereavement_counter_reservation` | Reservation and assisted bereavement counter |
| `inheritance_referral` | Inheritance, renunciation, registration, tax, bank, and utilities referrals |

There are 33 subflows. A full cross-product contains `23 × 33 = 759` coverage records.

## Coverage status

- `complete`: official source content was opened and it explicitly covers the entire subflow at the level needed for navigation, including channel and visit requirement where relevant.
- `partial`: an official source covers only part of the subflow, omits a major branch, or links onward without enough detail.
- `missing`: the official ward site and its officially linked service were searched for this subflow and no usable source was found. This does not mean the procedure does not exist.
- `unverified`: an entry was discovered but its content, currency, or exact scope was not fully checked.

`missing` is never inferred merely because a prior inventory omitted a link. Search evidence is required.

## Capability values

Each source records seven values using `yes / no / unknown / not_applicable`:

- `information`
- `questionnaire`
- `reservation`
- `prefill`
- `online_submission`
- `mandatory_visit`
- `assisted_counter`

Absence of evidence is `unknown`, not `no`. `prefill=yes` does not imply `online_submission=yes`. `assisted_counter=yes` does not imply one-stop completion.

## Data model

The normalized JSON contains:

- `definitions`: status and capability semantics.
- `events[].subflows`: the 33 canonical subflow definitions, grouped by event, with links to existing procedure IDs where possible.
- `wards`: 23 ward records.
- `wards[].sources`: deduplicated official pages or officially linked vendor services.
- `wards[].coverage`: exactly 33 records, one for each subflow, referencing `source_ids`.

Every source stores:

- `source_id`, `title`, `url`
- `authority_level`: `national / tokyo / ward`
- `host_type`: `official_domain / vendor_hosted`
- `official_wrapper_url` when a ward page delegates to a vendor
- `operator` when known
- seven capability values
- `official_updated_at` and `verified_on` separately
- languages and a concise evidence note

Every coverage record stores:

- `event_id`, `subflow_id`, `coverage_status`
- `source_ids`
- `status_reason`
- `gap_note`

## Outputs

1. `CORE_SUBFLOWS_2026-08-10.md`: human-readable taxonomy and definitions.
2. `data/ward_event_source_matrix.json`: normalized 23-ward dataset.
3. `WARD_EVENT_SOURCE_MATRIX_2026-08-10.md`: human-readable status grids, capability rollups, findings, and unresolved gaps.

## Quality gates

- 23 unique ward codes, exactly `13101–13123`.
- 33 unique subflow IDs.
- 759 unique ward/subflow coverage keys.
- Every coverage record has a valid status and at least one reason.
- `complete` and `partial` must reference at least one source.
- Every URL is HTTPS and every vendor-hosted service has an official ward wrapper when available.
- Capability values use only the four allowed values.
- `prefill=yes` with `online_submission=yes` is allowed only when the source explicitly proves formal submission; otherwise submission stays `no` or `unknown`.
- `verified_on` is `2026-08-10`; unknown page update dates remain null.

## Self-review

- No placeholder requirements remain.
- The matrix grain, status meanings, source authority, vendor hosting, freshness, and capability semantics are unambiguous.
- The scope is limited to evidence mapping; it does not silently expand the production engine or UI.
