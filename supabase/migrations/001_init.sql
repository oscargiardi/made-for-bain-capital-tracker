-- Made For staff trackers. Client role exists for later; this app only admits staff.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'staff' check (role in ('staff', 'client')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_name text not null,
  address text not null default '',
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  role text not null default '',
  phone text not null default '',
  email text not null default '',
  responsibilities text not null default '',
  sort_order int not null default 0
);

create table if not exists public.weeks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  date_label text not null,
  this_week text not null default '',
  next_week text not null default '',
  programme_note text not null default '',
  sort_order int not null default 0
);

create table if not exists public.outstanding_items (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.weeks (id) on delete cascade,
  text text not null,
  done boolean not null default false,
  sort_order int not null default 0
);

create table if not exists public.programme_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  label text not null,
  start_date date,
  end_date date,
  color text not null default '#3F65D6',
  sort_order int not null default 0
);

create table if not exists public.programme_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  label text not null,
  date date,
  sort_order int not null default 0
);

create table if not exists public.budget_lines (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  category text not null check (category in ('construction', 'consultants', 'fees')),
  label text not null,
  amount numeric not null default 0,
  sort_order int not null default 0
);

create table if not exists public.variations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  kind text not null check (kind in ('c', 'd')),
  description text not null,
  amount numeric not null default 0,
  status text not null default 'pending' check (status in ('pending', 'approved')),
  approved_date text not null default ''
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  stage text not null check (stage in ('strategy', 'concept', 'dd', 'documentation')),
  name text not null,
  date text not null default '',
  status text not null default '',
  url text not null default '',
  notes text not null default ''
);

create table if not exists public.tender_parties (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  list text not null check (list in ('longlist', 'shortlist', 'responses')),
  name text not null,
  notes text not null default '',
  amount numeric,
  date text not null default '',
  url text not null default ''
);

create table if not exists public.tender_recommendations (
  project_id uuid primary key references public.projects (id) on delete cascade,
  name text not null,
  amount numeric,
  notes text not null default ''
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'staff'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, display_name)
  values (new.id, 'staff', coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.team_members enable row level security;
alter table public.weeks enable row level security;
alter table public.outstanding_items enable row level security;
alter table public.programme_phases enable row level security;
alter table public.programme_milestones enable row level security;
alter table public.budget_lines enable row level security;
alter table public.variations enable row level security;
alter table public.documents enable row level security;
alter table public.tender_parties enable row level security;
alter table public.tender_recommendations enable row level security;

-- Staff: full access. Client: no project rows (future policies can grant one project).
create policy "staff read profiles" on public.profiles for select using (id = auth.uid() or public.is_staff());
create policy "staff update own profile" on public.profiles for update using (id = auth.uid());

create policy "staff all projects" on public.projects for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all team" on public.team_members for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all weeks" on public.weeks for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all outstanding" on public.outstanding_items for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all phases" on public.programme_phases for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all milestones" on public.programme_milestones for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all budget" on public.budget_lines for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all variations" on public.variations for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all documents" on public.documents for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all tender" on public.tender_parties for all using (public.is_staff()) with check (public.is_staff());
create policy "staff all recs" on public.tender_recommendations for all using (public.is_staff()) with check (public.is_staff());

do $$
declare t text;
begin
  foreach t in array array[
    'projects','team_members','weeks','outstanding_items','programme_phases',
    'programme_milestones','budget_lines','variations','documents',
    'tender_parties','tender_recommendations'
  ]
  loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when others then
      null;
    end;
  end loop;
end $$;
