# V15.4 Audit — Gulf + Meezab Hotels

- 52 built-in hotel records: 12 Gulf + 40 Meezab.
- Gulf and Meezab are separate provider categories.
- Saif Al Majd exists once under Gulf and once under Meezab; Badar Masa / Badar Al Masa are kept as separate source records.
- Meezab rates are date-bound to three periods: through 30 Aug 2026, 31 Aug–14 Nov 2026, and 15 Nov 2026–15 Jan 2027.
- New Booking uses hotel check-in date to select the Meezab rate period.
- Package Cost Q has a hotel check-in date for each city and uses that date for Meezab pricing.
- Meezab source provides Sharing (per person) and one combined DBL/TPL/QD room rate (per room). Quint remains N/A because no separate Quint rate was supplied.
- Existing 12 Gulf hotels are retained and use the latest rates supplied in the previous Gulf sheet.
- Hamouda Nebras Silver remains excluded from the Gulf list as previously requested.
- Online configuration loading merges the Meezab built-in list with the remote hotel configuration and, for Super Admin, persists the merged list to Supabase app_config.
- Hotel CRUD preserves provider metadata and supports adding/editing Gulf or Meezab records.
- JavaScript syntax check: 11 inline script blocks passed.
