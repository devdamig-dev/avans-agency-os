-- Avans OS: telemetria de IA, resultados aprobados y presupuestos.
-- Migracion aditiva. Requiere esquema inicial (organizations, organization_members, agent_runs).
-- No guarda prompts, respuestas, imagenes, documentos ni secretos.

create table if not exists public.ai_usage_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  source_event_id text not null,
  provider text not null,
  model text not null,
  modality text not null check (modality in ('text','image','video')),
  area text not null,
  activity text not null,
  user_id uuid references auth.users(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  agent_run_id uuid references public.agent_runs(id) on delete set null,
  input_tokens bigint not null default 0 check (input_tokens >= 0),
  output_tokens bigint not null default 0 check (output_tokens >= 0),
  provider_units numeric(18,4) check (provider_units >= 0),
  provider_unit_name text,
  attempts integer not null default 1 check (attempts >= 0),
  units_generated integer not null default 0 check (units_generated >= 0),
  units_approved integer not null default 0 check (units_approved >= 0 and units_approved <= units_generated),
  minutes_saved numeric(14,2) check (minutes_saved >= 0),
  cost_usd numeric(18,6) check (cost_usd >= 0), -- NULL significa no informado; nunca asumir costo cero.
  cost_source text not null default 'estimated' check (cost_source in ('provider','estimated')),
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_usage_events_event_key unique (organization_id, provider, source_event_id),
  constraint ai_usage_events_identifiers check (char_length(source_event_id) between 1 and 250),
  constraint ai_usage_events_names check (char_length(area) between 1 and 100 and char_length(activity) between 1 and 150)
);

create table if not exists public.ai_usage_budgets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  area text not null,
  month_start date not null check (extract(day from month_start) = 1),
  monthly_limit_usd numeric(18,2) not null check (monthly_limit_usd >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint ai_usage_budgets_area_month unique (organization_id, area, month_start)
);

create index if not exists ai_usage_events_org_occurred_idx on public.ai_usage_events (organization_id, occurred_at desc);
create index if not exists ai_usage_events_org_area_idx on public.ai_usage_events (organization_id, area, occurred_at desc);
create index if not exists ai_usage_events_org_provider_idx on public.ai_usage_events (organization_id, provider, occurred_at desc);
create index if not exists ai_usage_budgets_org_month_idx on public.ai_usage_budgets (organization_id, month_start);

create trigger set_ai_usage_events_updated_at
before update on public.ai_usage_events for each row execute function public.set_updated_at();
create trigger set_ai_usage_budgets_updated_at
before update on public.ai_usage_budgets for each row execute function public.set_updated_at();

alter table public.ai_usage_events enable row level security;
alter table public.ai_usage_budgets enable row level security;

-- Finance/admin roles: no public or general staff access to cost detail.
-- Real integrations write using secret server-only credentials with audit context.
create policy "ai_usage_events_read_finance_and_admin" on public.ai_usage_events
for select to authenticated using (
  exists (
    select 1 from public.organization_members m
    where m.organization_id = ai_usage_events.organization_id
      and m.user_id = (select auth.uid())
      and m.role in ('admin','finance')
  )
);
create policy "ai_usage_budgets_read_finance_and_admin" on public.ai_usage_budgets
for select to authenticated using (
  exists (
    select 1 from public.organization_members m
    where m.organization_id = ai_usage_budgets.organization_id
      and m.user_id = (select auth.uid())
      and m.role in ('admin','finance')
  )
);

revoke all on public.ai_usage_events from anon, authenticated;
revoke all on public.ai_usage_budgets from anon, authenticated;
grant select on public.ai_usage_events to authenticated;
grant select on public.ai_usage_budgets to authenticated;
-- Explicitly allow backend role; RLS remains enforced for authenticated clients.
grant select, insert, update on public.ai_usage_events to service_role;
grant select, insert, update, delete on public.ai_usage_budgets to service_role;
