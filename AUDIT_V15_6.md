# V15.7 Hotel Catalog Audit

- Canonical catalog: 52 records (12 Gulf + 40 Meezab).
- Old local catalogs with fewer than 52 records are migrated to the canonical catalog.
- Old/incomplete Supabase app_config hotel catalogs are replaced by the canonical catalog for Super Admin.
- Gulf and Meezab duplicate names remain separate records.
- Meezab date-bound periods remain attached to each Meezab hotel.
- Meezab room derivation: Double=room/2, Triple=room/3, Quad=room/4, Quint=room/5.
