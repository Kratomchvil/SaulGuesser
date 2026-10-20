create table if not exists public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 40),
  score integer not null check (score between 0 and 10),
  avg_seconds numeric(4, 2) not null check (avg_seconds between 0 and 10),
  created_at timestamptz not null default now()
);

alter table public.leaderboard_entries enable row level security;

revoke all on public.leaderboard_entries from anon, authenticated;
grant select, insert on public.leaderboard_entries to anon, authenticated;

drop policy if exists "Anyone can read leaderboard entries" on public.leaderboard_entries;
create policy "Anyone can read leaderboard entries"
  on public.leaderboard_entries
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit leaderboard entries" on public.leaderboard_entries;
create policy "Anyone can submit leaderboard entries"
  on public.leaderboard_entries
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 40
    and score between 0 and 10
    and avg_seconds between 0 and 10
    and created_at <= now()
    and created_at >= now() - interval '5 minutes'
  );

create index if not exists leaderboard_entries_created_at_score_idx
  on public.leaderboard_entries (created_at desc, score desc, avg_seconds asc);
