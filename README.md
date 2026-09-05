# Karvan-e-Asal — A1.0.41

Production audit checkpoint.

This checkpoint hardens synchronization failure recovery and partial-sync integrity. Sync-queue flushing is serialized so overlapping flushes cannot race, and queue writes merge against work queued while an earlier network operation is still in flight. Successfully synchronized items are removed while failed items remain queued; newly queued work is never lost.

No Supabase schema, RLS, policy, or database function changes are required for this checkpoint.

A1.0.40: Final full-system regression, integrity, packaging and deployment-readiness audit. Consolidates synchronization, authentication, permissions, financial integrity, catalogue safeguards, deletion/recovery protection and PWA cache hardening. No Supabase schema/RLS changes.


A1.0.41: Connected the production frontend to the supplied Supabase project using the public publishable client key. The REST endpoint suffix is intentionally not used; the app uses the project root URL. No schema/RLS changes.
