# V16.7 Audit — Login currentUser Scope Fix

- Replaced the fragile global lexical/reference pattern for `currentUser` with `window.currentUser`.
- All standalone runtime references now resolve through the window object.
- This avoids Safari's `Can't find variable: currentUser` / initialization-scope failure during online login.
- Build/version markers updated to V16.7.
- Hotel catalog data is unchanged from V16.6.
- No pricing changes were made.
