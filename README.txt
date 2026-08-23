KARVAN E ASAL — UMRAH MANAGER V14 SALES
Online multi-user version based on the V13 Sales build.

Supabase is configured in supabase-config.js. Never put a service_role or secret key in this file.


V14 SALES USERNAME LOGIN FIX
============================
Run the updated v13_online_schema.sql in Supabase SQL Editor once. It adds the get_login_email_by_username RPC required for username login under Row Level Security. After that, users can sign in with either their username or registered email.
