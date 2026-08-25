# Made For — Site Progress Tracker

Staff demo: login, a homepage of every project, blank new trackers, and the Bain Capital job as the first record. Everything is saved in this browser (`localStorage`). No Supabase.

## Run

```bash
cd ~/Projects/made-for-bain-capital-tracker
python3 -m http.server 8766
```

Open http://127.0.0.1:8766/

**Login:** `mitch@made-for.com.au` / `123456`

## What to click through

1. Sign in → homepage lists **Bain Capital, Sydney**
2. Open it — same six tabs as the prototype, with the seeded team, 27 weeks, programme, and budget
3. **Projects** in the header back to the list
4. **New Project** — name, client, address — empty tracker, add buttons on every tab
5. Refresh: ticks, new weeks, new members, new projects are still there
6. **Reset demo data** on the homepage footer restores Bain Capital only

Two tabs in the same browser stay in sync via `BroadcastChannel`.

SQL under `supabase/` is leftover for a later hosted version. This demo does not use it.
