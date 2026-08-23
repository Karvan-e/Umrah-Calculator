# Karvan e Asal — V13 Sales Online Multi-User

This package starts from **V13 Sales** and keeps its Sales, Voucher, Quotes, Package Cost Q, admin and booking functionality. The online layer adds Supabase authentication and server-side storage/RLS for vouchers and Package Cost Q.

## Setup
1. Create a Supabase project.
2. Open **SQL Editor** and run `v13_online_schema.sql`.
3. Open `supabase-config.js` and set:
   - `url`: your Supabase project URL
   - `publishableKey`: your Supabase publishable/anon key
4. Publish the folder on an HTTPS host (GitHub Pages is fine).
5. Register the first account, then in Supabase SQL Editor run:
   `update public.profiles set role='superadmin' where lower(username)='umar';`
   If the generated username differs, use the account's actual username.
6. For production, enable email confirmation and configure your Supabase Auth email settings.

## Security
The database uses Row Level Security. Normal users can read/write only their own vouchers and Package Cost Q. Super Admin can read/write all records. Never put a Supabase service-role key in this website.

## Note
This online adapter keeps the V13 Sales UI and calculation code while synchronizing its voucher/quote storage to Supabase. Hotel/visa/airline/settings master data remains client-side in this build and can be migrated to shared online tables in the next stage.
