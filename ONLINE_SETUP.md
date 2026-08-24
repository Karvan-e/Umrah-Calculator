# V15 Sales Auth / Forgot Password Update

## Supabase SQL required

Run this once in Supabase SQL Editor if it has not already been created:

```sql
create or replace function public.get_password_reset_question(p_email text)
returns text
language sql
security definer
set search_path = public, extensions
as $$
  select security_question
  from public.profiles
  where lower(email)=lower(trim(p_email))
    and active=true
  limit 1;
$$;

revoke all on function public.get_password_reset_question(text) from public;
grant execute on function public.get_password_reset_question(text) to anon, authenticated;
```

The existing V15 functions `verify_password_reset` and `get_login_email_by_username` must also exist.

## Forgot password flow

1. User opens Forgot Password.
2. Enters registered email.
3. The app loads the stored security question from Supabase.
4. User enters the answer.
5. Supabase RPC verifies the answer server-side.
6. Supabase sends the secure password-reset email.
7. The reset link returns to the app.
8. The app shows Set New Password and calls `auth.updateUser({password})`.

Security answers are stored as hashes in `profiles.security_answer_hash`; the raw answer is never stored.
