Karvan e Asal Umrah Manager V16.6

Release: V16.6
Baseline: V16.6

Deep audit corrections:
- Fixed Only Visa duration/category handling to 15, 21, 28 and 75 days.
- Preserved Umrah Visa categories 15, 21, 30 days and 3 Months with passenger-group pricing only.
- Hotels are available only with Umrah Visa; other visa types cannot add accommodation charges.
- Fixed Summary rendering and voucher flight-table column alignment.
- Fixed Sales privacy so ordinary users only request their own sales.
- Added online Super Admin Recycle Bin handling for Admin record deletion.
- Added V16.6 Supabase RLS hardening SQL.
- Fixed backup version metadata and included Package Cost Q records.
- Kept the approved 52-hotel catalog: 12 Gulf + 40 Meezab.
- Kept Meezab date-bound pricing and room division rules.

Database: run V16_4_DATABASE_SETUP.sql once after the existing Supabase schema is present.
