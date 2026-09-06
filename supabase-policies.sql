alter table public.articles enable row level security;

create policy "Anyone can read articles"
on public.articles
for select
to anon, authenticated
using (true);

create policy "Authenticated users can create articles"
on public.articles
for insert
to authenticated
with check (
  auth.uid() = submitted_by
);

create policy "Users can delete their own articles"
on public.articles
for delete
to authenticated
using (
  (select auth.uid()) = submitted_by
);

grant usage on schema public to anon, authenticated;

grant select on table public.articles to anon, authenticated;

grant insert on table public.articles to authenticated;

grant delete on table public.articles to authenticated;