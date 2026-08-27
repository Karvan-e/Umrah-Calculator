# V16.1 Login Fix

- Fixed the `Cannot access 'users' before initialization` login failure by renaming the legacy global auth-state binding to `appUsers`, eliminating a global lexical-name collision/TDZ hazard.
- Preserved Supabase online login flow and local fallback.
- Bumped VERSION, manifest, and service-worker cache to 16.1 so deployed browsers cannot retain the V16.0 cached application.
- No hotel rates or hotel catalog data changed.
