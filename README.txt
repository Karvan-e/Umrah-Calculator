KARVAN E ASAL — UMRAH MANAGER V12

New in V11:
- First-page Login with email or username.
- Register New User flow.
- Registration fields: first name, last name, email, contact number, agency name, address, password and security question/answer.
- Five common security questions are provided for password recovery.
- Forgot Password flow using registered email + selected security question + answer.
- Super Admin account: username Umar / password admin126@.
- Super Admin role is protected from deletion and can manage users.
- Admin/Super Admin can add, edit, enable/disable and reset user passwords.
- Each user's quotations remain in that user's own local account namespace.
- Login accepts either username or registered email.

SECURITY NOTE:
This remains a GitHub Pages/static application. User separation is implemented in browser storage and is not server-enforced. For true multi-device privacy, secure authentication, and database-level row isolation, connect the app to a backend such as Supabase, Firebase, or a custom API with server-side authorization.


V12 changes:
- New Booking replaces New Quotation.
- New Booking opens two choices: New Booking or Calculate the Package.
- Package Cost Q is a separate tab for simple visa + hotel + ticket calculation.
- Package Cost Q follows the same child-with-bed / child-without-bed hotel rules as the full booking.
- Infant ticket is fixed at zero in Package Cost Q.
- Package Cost Q results are saved per user.
- Voucher is the saved-voucher tab; Voucher Preview is the generated voucher view.
- Super Admin can see all users' saved vouchers and Package Cost Q records with usernames.
