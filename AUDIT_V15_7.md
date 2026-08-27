# V15.7 Hotel Catalog Audit
- Canonical shipped catalog: 52 hotels (12 Gulf, 40 Meezab).
- Gulf and Meezab duplicate names remain separate records.
- Remote Supabase hotel catalog is accepted only when it has >=52 records, >=12 Gulf, >=40 Meezab, and app_config key `hotel_catalog_version` equals `15.7`.
- Otherwise the canonical 52-record catalog is loaded and Super Admin publishes both `hotels` and `hotel_catalog_version` to `app_config`.
- Hotel edits publish both the hotel list and catalog version.
- Meezab date-bound editor remains enabled with Sharing plus full-room source rate; derived room categories are calculated by occupancy.
- JavaScript syntax validation passed for all inline scripts and all.js.
