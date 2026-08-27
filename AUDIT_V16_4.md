# V16.6 Audit / Fix Record

- Build version: 16.6
- Hotel catalog: 52 records (12 Gulf, 40 Meezab) retained.
- Service-worker cache: kea-v16.6-login-fix.
- Manifest and VERSION updated to 16.6.
- Online registration no longer transmits raw security answers; it transmits a SHA-256 hash.
- Password recovery verifies the security question/answer server-side, then uses Supabase Auth email recovery.
- Supabase migration included for profile recovery fields, trigger synchronization, and verify_password_reset RPC.
- Default visa adult group rates updated to 605/690/715/740/790 SAR; infant 500 SAR.
- Existing hotel provider/date structures preserved.
