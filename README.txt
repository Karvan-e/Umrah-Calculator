KARVAN E ASAL — UMRAH MANAGER V10

New in V10:
- First-page login screen.
- Admin tab for user management.
- User accounts with roles: User / Admin.
- Each normal user's quotations are stored in a separate account namespace.
- Saved Quotations, invoices and vouchers shown to a normal user are only that user's saved records.
- Add, edit, disable, reset password and delete users from Admin.
- Default admin account: username admin / password admin123. Change it immediately in Admin.
- Shared operational data (hotels, visa types, airlines, transport, extras, exchange rate) remains system-wide.
- Existing V9/V7 shared data is migrated/falls back where available.

SECURITY NOTE:
This version is suitable for a GitHub Pages/static deployment and provides account separation in the browser. It is NOT server-enforced authentication. A user with technical access to the device/browser storage or source code could bypass client-side controls. For real multi-device privacy and secure user isolation, connect the app to a backend authentication/database service (for example Supabase/Firebase/custom API) with server-side authorization rules.
