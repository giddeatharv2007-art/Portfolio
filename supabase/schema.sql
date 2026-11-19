-- ============================================================================
--  Atharv Gidde — Portfolio · Supabase / PostgreSQL schema
--  Run this in Supabase Studio → SQL Editor → Run.
--  Safe to re-run (idempotent).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
--  Table: profile_settings (one public, read-only profile row)
-- ----------------------------------------------------------------------------
create table if not exists public.profile_settings (
  id             integer primary key default 1,
  full_name      text        not null,
  headline       text        not null,
  email          text        not null,
  linkedin_url   text        not null,
  github_url     text        not null,
  hero_image_url text,
  about_image_url text,
  location       text,
  status_text    text,
  updated_at     timestamptz default now()
);

alter table public.profile_settings enable row level security;

do $$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profile_settings'
  loop
    execute format('drop policy if exists %I on public.profile_settings', policy_row.policyname);
  end loop;
end
$$;

revoke all on public.profile_settings from public, anon, authenticated;
grant select on public.profile_settings to anon, authenticated;

create policy "profile_settings_public_select"
  on public.profile_settings
  for select
  to anon, authenticated
  using (true);

insert into public.profile_settings (
  id, full_name, headline, email, linkedin_url, github_url, location, status_text
)
values (
  1,
  'Atharv Gidde',
  'Developing with Purpose | CS Student @ SKN Sinhgad College of Engineering',
  'giddeatharv2007@gmail.com',
  'https://www.linkedin.com/in/atharv-gidde-460329381',
  'https://github.com/giddeatharv2007-art',
  'Pandharpur, Maharashtra, India',
  'Available for internships & collaborations'
)
on conflict (id) do update
  set full_name    = excluded.full_name,
      headline     = excluded.headline,
      email        = excluded.email,
      linkedin_url = excluded.linkedin_url,
      github_url   = excluded.github_url,
      location     = excluded.location,
      status_text  = excluded.status_text,
      updated_at   = now();

-- ----------------------------------------------------------------------------
--  Table: projects
-- ----------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  slug        text        not null unique,
  category    text        not null default 'Web',
  description text        not null,
  stack       text[]      not null default '{}',
  github_url  text,
  live_url    text,
  featured    boolean     not null default false,
  created_at  timestamptz not null default now()
);

alter table public.projects add column if not exists image_url text;

create index if not exists projects_category_idx   on public.projects (category);
create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists projects_featured_idx   on public.projects (featured);

alter table public.projects enable row level security;

do $$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'projects'
  loop
    execute format('drop policy if exists %I on public.projects', policy_row.policyname);
  end loop;
end
$$;

revoke all on public.projects from public, anon, authenticated;
grant select on public.projects to anon, authenticated;

create policy "projects_public_select"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- ----------------------------------------------------------------------------
--  Table: messages  (contact form)
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  topic      text,
  message    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

-- ----------------------------------------------------------------------------
--  Row Level Security
-- ----------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- messages: private to the owner/dashboard, public insert-only
do $$
declare
  policy_row record;
begin
  for policy_row in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'messages'
  loop
    execute format('drop policy if exists %I on public.messages', policy_row.policyname);
  end loop;
end
$$;

revoke all on public.messages from public, anon, authenticated;
grant insert on public.messages to anon, authenticated;

create policy "messages_public_insert"
  on public.messages
  for insert
  to anon, authenticated
  with check (
    char_length(name)    between 1 and 120
    and char_length(email)   between 3 and 200
    and position('@' in email) > 1
    and char_length(coalesce(topic, '')) <= 120
    and char_length(message) between 1 and 4000
  );

-- ----------------------------------------------------------------------------
--  Seed: the three shipped projects
-- ----------------------------------------------------------------------------
insert into public.projects (title, slug, category, description, stack, github_url, live_url, featured)
values
  (
    'EduNexus',
    'academia-portal',
    'Full-Stack',
    'Smart India Hackathon prototype bringing AI-driven skill mapping, personalized learning, internships & job opportunities, verified profiles and industry–academia collaboration together on one platform.',
    array['React', 'Vite', 'Django', 'PostgreSQL'],
    'https://github.com/giddeatharv2007-art/academia-portal',
    null,
    true
  ),
  (
    'NextGen Attendance System',
    'nextgen-attendance-system',
    'IoT / Hardware',
    'Automated RFID attendance management system built with Arduino microcontrollers, MFRC522 RFID modules, LEDs and active buzzers for Ideathon 2k26.',
    array['Arduino', 'C/C++', 'MFRC522 RFID', 'Hardware'],
    null,
    null,
    false
  ),
  (
    'Editorial Developer Portfolio',
    'editorial-developer-portfolio',
    'Web',
    'Dark editorial portfolio featuring GSAP scroll choreography, Lenis smooth scroll, sleep-proof Supabase PostgreSQL integration and Vercel Analytics.',
    array['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Vercel'],
    'https://github.com/giddeatharv2007-art',
    null,
    false
  )
on conflict (slug) do update
  set title       = excluded.title,
      category    = excluded.category,
      description = excluded.description,
      stack       = excluded.stack,
      github_url  = excluded.github_url,
      live_url    = excluded.live_url,
      featured    = excluded.featured;

-- ----------------------------------------------------------------------------
--  Storage: public reads from portfolio-media, no public upload or delete
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_media_public_select" on storage.objects;
create policy "portfolio_media_public_select"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');
