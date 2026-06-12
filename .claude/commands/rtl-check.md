# /rtl-check

Reviews a component or file for RTL (right-to-left) compliance.

## Usage

```
/rtl-check [file-path]
```

If no path given, checks the most recently edited component.

## What it checks

1. **Logical spacing** — flags `ml-*`, `mr-*`, `pl-*`, `pr-*` that should be `ms-*`/`me-*` or `ps-*`/`pe-*`
2. **Text alignment** — flags `text-left` / `text-right` without `rtl:` counterpart
3. **Flexbox direction** — flags `flex-row` / `flex-row-reverse` in nav/layout without RTL consideration
4. **Absolute positioning** — flags `left-*` / `right-*` that should use `start-*` / `end-*` (Tailwind logical)
5. **Arrow/chevron icons** — flags rotated icons that need `rtl:rotate-180`
6. **Line height** — flags body text with `leading-*` below 1.8 (Urdu needs tall leading)
7. **Font application** — checks that `font-urdu` is applied to Urdu text blocks

## Output

Lists issues by line number with suggested fix. Outputs "RTL-clean ✓" if no issues found.
