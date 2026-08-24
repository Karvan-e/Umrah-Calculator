V15 Sales — Thorough Audit Notes

Checked before release:
- All inline JavaScript blocks syntax-checked with Node.js.
- all.js syntax-checked with Node.js.
- Removed stale emoji icons from the secondary all.js copy so it cannot reintroduce emoji navigation if used later.
- Confirmed professional SVG icon helper is present in index.html.
- Confirmed hotelObj() is present; hotel rendering no longer depends on a missing function.
- Confirmed Umrah durations are 15, 21, 30 and 90 days with group-based pricing.
- Confirmed Only Visa keeps duration-specific PKR pricing.
- Confirmed laptop passenger grid switches to two columns between 651px and 1100px.
- Confirmed Package Cost Q uses the same passenger grid component.
- Removed duplicate style-element IDs introduced by successive theme patches.
- Confirmed no emoji characters remain in index.html or all.js.
- Preserved Supabase configuration, booking, hotel, visa, sales and calculation logic.

Deployment: upload the contents of this folder to the GitHub Pages repository root.
No SQL is required for this audit-only release.
