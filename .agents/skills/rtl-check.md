# Skill: rtl-check

Audits a component or file for RTL compliance.

## Trigger

User asks to check RTL, review a component for direction issues, or before marking any layout component as complete.

## Checklist

Run through each check and report findings by line number:

### Spacing (logical properties)
- [ ] `ml-*` / `mr-*` → should be `ms-*` / `me-*`
- [ ] `pl-*` / `pr-*` → should be `ps-*` / `pe-*`
- [ ] `left-*` / `right-*` for positioning → should be `start-*` / `end-*`
- [ ] `text-left` / `text-right` without `rtl:` counterpart → use `text-start` / `text-end`

### Flexbox
- [ ] `flex-row` or `flex-row-reverse` in navigation/card contexts — verify intended direction
- [ ] `space-x-*` without `rtl:space-x-reverse` — gaps reverse in RTL

### Icons & Arrows
- [ ] Chevron icons without `rtl:rotate-180` — arrows must flip in RTL
- [ ] Back/forward navigation icons — verify direction

### Typography
- [ ] Body text `leading-*` below `[1.8]` — Urdu needs tall line height
- [ ] Urdu text blocks without `font-urdu` class applied
- [ ] Missing `font-feature-settings` for ligatures on Urdu headings

### Content
- [ ] Any hardcoded Arabic/Urdu strings — should be from Sanity
- [ ] Placeholder text that's Latin (not Urdu) — masks RTL rendering issues

## Output Format

List each issue:
```
Line 42: ml-4 → use ms-4 (logical inline-start)
Line 67: text-left → use text-start (or add rtl:text-right)
Line 89: ChevronRight icon missing rtl:rotate-180
```

Output "RTL-clean" if no issues found.
