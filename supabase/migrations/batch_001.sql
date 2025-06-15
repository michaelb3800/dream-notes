-- Users table
create table if not exists users (
  id uuid primary key,
  email text not null unique,
  name text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Notebooks table
create table if not exists notebooks (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  title text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Pages table
create table if not exists pages (
  id uuid primary key,
  notebook_id uuid references notebooks(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  content text,
  strokes jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Flashcards table
create table if not exists flashcards (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  note_id uuid references pages(id) on delete cascade,
  front text,
  back text,
  repetitions int default 0,
  ease_factor real default 2.5,
  interval int default 1,
  next_review timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- XP log
create table if not exists xp_log (
  id uuid primary key,
  user_id uuid references users(id) on delete cascade,
  amount int,
  created_at timestamp with time zone default now()
);

alter table users enable row level security;
create policy "users_is_self" on users for all using ( auth.uid() = id );

alter table notebooks enable row level security;
create policy "notebooks_is_owner" on notebooks for all using ( auth.uid() = user_id );

alter table pages enable row level security;
create policy "pages_is_owner" on pages for all using ( auth.uid() = user_id );

alter table flashcards enable row level security;
create policy "flashcards_is_owner" on flashcards for all using ( auth.uid() = user_id );

alter table xp_log enable row level security;
create policy "xp_log_is_owner" on xp_log for all using ( auth.uid() = user_id );
