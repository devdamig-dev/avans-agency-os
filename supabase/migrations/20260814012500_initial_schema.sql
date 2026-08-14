-- Avans Agency OS initial schema
-- MVP schema for multi-tenant agency operations with human-approved AI outputs.

create extension if not exists "pgcrypto";

-- Enums
create type public.member_role as enum (
  'admin',
  'comercial',
  'project_manager',
  'content_manager',
  'designer',
  'trafficker',
  'finance',
  'viewer'
);

create type public.lead_status as enum (
  'nuevo',
  'calificado',
  'discovery_agendado',
  'propuesta_en_preparacion',
  'propuesta_enviada',
  'seguimiento',
  'ganado',
  'perdido'
);

create type public.priority_level as enum ('baja', 'media', 'alta', 'urgente');

create type public.approval_status as enum (
  'borrador_ia',
  'revision_interna',
  'requiere_ajustes',
  'aprobado',
  'rechazado',
  'enviado'
);

create type public.task_status as enum (
  'pendiente',
  'en_progreso',
  'bloqueada',
  'completada',
  'cancelada'
);

create type public.content_status as enum (
  'idea',
  'borrador_ia',
  'revision_content',
  'requiere_ajustes',
  'aprobado_interno',
  'enviado_cliente',
  'aprobado_cliente',
  'publicado'
);

create type public.agent_run_status as enum ('queued', 'running', 'succeeded', 'failed');

-- Utility
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_members om
    where om.organization_id = target_organization_id
      and om.user_id = auth.uid()
  );
$$;

-- Core tables
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  company_name text,
  email text,
  phone text,
  website text,
  industry text,
  status text not null default 'activo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  name text not null,
  company_name text,
  email text,
  phone text,
  origin text not null default 'otro',
  service_interest text,
  status public.lead_status not null default 'nuevo',
  priority public.priority_level not null default 'media',
  raw_message text,
  summary text,
  next_step text,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  direction text not null default 'inbound',
  channel text not null default 'manual',
  body text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.discoveries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  objective text,
  current_situation text,
  detected_problems text,
  current_tools text,
  opportunities text,
  internal_brief text,
  ai_summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  discovery_id uuid references public.discoveries(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  title text not null,
  service text,
  scope text,
  stages text,
  deliverables text,
  exclusions text,
  estimated_budget numeric(14,2),
  status public.approval_status not null default 'borrador_ia',
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  proposal_id uuid references public.proposals(id) on delete set null,
  name text not null,
  status text not null default 'activo',
  project_manager_id uuid references public.profiles(id) on delete set null,
  starts_at date,
  ends_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.onboarding_checklists (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null default 'Alta de cliente',
  status text not null default 'pendiente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.onboarding_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  checklist_id uuid not null references public.onboarding_checklists(id) on delete cascade,
  label text not null,
  description text,
  status text not null default 'pendiente',
  due_at date,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brand_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  tone text,
  target_audience text,
  products_services text,
  restrictions text,
  approved_examples text,
  visual_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, client_id)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  type text not null default 'post',
  status public.content_status not null default 'idea',
  idea text,
  copy text,
  visual_prompt text,
  video_prompt text,
  scheduled_for date,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  period_start date,
  period_end date,
  raw_input text,
  executive_summary text,
  insights text,
  next_steps text,
  status public.approval_status not null default 'borrador_ia',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.report_metrics (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  report_id uuid not null references public.reports(id) on delete cascade,
  source text not null,
  metric_key text not null,
  metric_value text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  title text not null,
  status public.approval_status not null default 'revision_interna',
  reviewer_id uuid references public.profiles(id) on delete set null,
  requested_by uuid references public.profiles(id) on delete set null,
  notes text,
  ai_output text,
  due_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text,
  status public.task_status not null default 'pendiente',
  priority public.priority_level not null default 'media',
  assigned_to uuid references public.profiles(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  related_type text,
  related_id uuid,
  due_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  module text not null,
  description text,
  instructions text,
  tools jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  entity_type text,
  entity_id uuid,
  status public.agent_run_status not null default 'queued',
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  model text,
  prompt_tokens integer,
  completion_tokens integer,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  type text,
  storage_path text,
  url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.automation_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  event_type text not null,
  entity_type text,
  entity_id uuid,
  message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  provider text not null,
  name text not null,
  status text not null default 'disconnected',
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, provider, name)
);

-- Updated-at triggers
create trigger set_organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger set_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_organization_members_updated_at before update on public.organization_members for each row execute function public.set_updated_at();
create trigger set_clients_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger set_discoveries_updated_at before update on public.discoveries for each row execute function public.set_updated_at();
create trigger set_proposals_updated_at before update on public.proposals for each row execute function public.set_updated_at();
create trigger set_projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger set_onboarding_checklists_updated_at before update on public.onboarding_checklists for each row execute function public.set_updated_at();
create trigger set_onboarding_items_updated_at before update on public.onboarding_items for each row execute function public.set_updated_at();
create trigger set_brand_profiles_updated_at before update on public.brand_profiles for each row execute function public.set_updated_at();
create trigger set_content_items_updated_at before update on public.content_items for each row execute function public.set_updated_at();
create trigger set_reports_updated_at before update on public.reports for each row execute function public.set_updated_at();
create trigger set_approvals_updated_at before update on public.approvals for each row execute function public.set_updated_at();
create trigger set_tasks_updated_at before update on public.tasks for each row execute function public.set_updated_at();
create trigger set_agents_updated_at before update on public.agents for each row execute function public.set_updated_at();
create trigger set_agent_runs_updated_at before update on public.agent_runs for each row execute function public.set_updated_at();
create trigger set_documents_updated_at before update on public.documents for each row execute function public.set_updated_at();
create trigger set_integrations_updated_at before update on public.integrations for each row execute function public.set_updated_at();

-- RLS
alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.organization_members enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.lead_messages enable row level security;
alter table public.discoveries enable row level security;
alter table public.proposals enable row level security;
alter table public.projects enable row level security;
alter table public.onboarding_checklists enable row level security;
alter table public.onboarding_items enable row level security;
alter table public.brand_profiles enable row level security;
alter table public.content_items enable row level security;
alter table public.reports enable row level security;
alter table public.report_metrics enable row level security;
alter table public.approvals enable row level security;
alter table public.tasks enable row level security;
alter table public.agents enable row level security;
alter table public.agent_runs enable row level security;
alter table public.documents enable row level security;
alter table public.automation_logs enable row level security;
alter table public.integrations enable row level security;

-- Profile policies
create policy "profiles_select_own" on public.profiles for select using (id = auth.uid());
create policy "profiles_update_own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Organization membership policies
create policy "members_select_own_orgs" on public.organization_members for select using (public.is_org_member(organization_id));

-- Organization policies
create policy "organizations_select_members" on public.organizations for select using (public.is_org_member(id));

-- Generic org policies
create policy "clients_org_access" on public.clients for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "leads_org_access" on public.leads for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "lead_messages_org_access" on public.lead_messages for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "discoveries_org_access" on public.discoveries for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "proposals_org_access" on public.proposals for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "projects_org_access" on public.projects for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "onboarding_checklists_org_access" on public.onboarding_checklists for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "onboarding_items_org_access" on public.onboarding_items for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "brand_profiles_org_access" on public.brand_profiles for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "content_items_org_access" on public.content_items for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "reports_org_access" on public.reports for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "report_metrics_org_access" on public.report_metrics for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "approvals_org_access" on public.approvals for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "tasks_org_access" on public.tasks for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "agents_org_access" on public.agents for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "agent_runs_org_access" on public.agent_runs for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "documents_org_access" on public.documents for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "automation_logs_org_access" on public.automation_logs for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "integrations_org_access" on public.integrations for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));

-- Helpful indexes
create index clients_organization_id_idx on public.clients (organization_id);
create index leads_organization_id_status_idx on public.leads (organization_id, status);
create index tasks_organization_id_status_idx on public.tasks (organization_id, status);
create index approvals_organization_id_status_idx on public.approvals (organization_id, status);
create index content_items_organization_id_status_idx on public.content_items (organization_id, status);
create index reports_organization_id_status_idx on public.reports (organization_id, status);
create index agent_runs_organization_id_created_at_idx on public.agent_runs (organization_id, created_at desc);
create index automation_logs_organization_id_created_at_idx on public.automation_logs (organization_id, created_at desc);

-- Seed organization. User membership must be inserted after first auth user exists.
insert into public.organizations (name, slug)
values ('Avans Agency', 'avans')
on conflict (slug) do nothing;
