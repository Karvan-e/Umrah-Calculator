# V16.6 Corrective Audit

- Build: V16.6
- 52 hotels retained: 12 Gulf, 40 Meezab.
- Meezab date-bound periods retained; Full Room derived categories remain Double /2, Triple /3, Quad /4, Quint /5.
- Umrah Visa duration categories: 15 Days, 21 Days, 30 Days, 3 Months (90 days); no separate duration price.
- Only Visa duration categories: 15, 21, 28, 75 days; duration pricing is per person and separate from Umrah group pricing.
- Only Visa group/child/infant pricing fields are normalized to zero to prevent accidental mixing.
- Shared hotel configuration is online-first when Supabase is available; invalid/missing remote hotel catalog is replaced with canonical catalog by Super Admin.
- Hotel catalog version: 16.6.
- Service-worker/manifest/application version references: 16.6.
- Password recovery uses server-side security-answer hash verification plus Supabase Auth reset flow.
- Online registration sends only the security-answer hash in auth metadata.
- Recycle bin remains online for voucher/package records.
