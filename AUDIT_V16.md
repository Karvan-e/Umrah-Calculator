# V16.0 Deep Audit / Release Notes

- Version: 16.0
- Hotel catalog: 52 records (12 Gulf + 40 Meezab)
- Meezab pricing remains date-bound with source Sharing and Full Room rates; derived Double/Triple/Quad/Quint are calculated from full-room rates.
- Local hotel catalog is accepted only when `keaHotelCatalogVersion` matches 16.0 and provider counts are valid.
- Supabase hotel catalog version is 16.0.
- Removed the destructive localStorage purge hook from the previous build.
- Service worker cache is versioned to V16.0 and deletes previous caches on activation.
- Manifest and application version are V16.0.
- No obsolete v13 online schema file is included.
- This release does not intentionally alter approved Gulf/Meezab hotel rates.

## Important
The application still contains localStorage-backed caches for some user/record data for compatibility. This release prevents destructive cache purging and makes the hotel catalog version-aware, but full Supabase-only storage for every business record remains a separate architectural migration.
