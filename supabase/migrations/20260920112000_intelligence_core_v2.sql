-- Avans Intelligence Core V2
-- Additive schema: preserves the existing Agency OS tables and adds the operational
-- primitives required by Command Center, Client Intelligence, workflows, decisions,
-- execution guardrails, learning and Meeting Intelligence.

create table public.client_context_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  category text not null,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  source_type text not null default 'manual',
  source_ref_type text,
  source_ref_id uuid,
  validation_status text not null default 'pending'
    check (validation_status in ('confirmed','imported','inferred','pending','rejected')),
  confidence numeric(5,2),
  valid_from timestamptz not null default now(),
  valid_until timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.attention_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  type text not null,
  title text not null,
  summary text,
  priority text not null default 'normal'
    check (priority in ('normal','medium','high','critical')),
  status text not null default 'open'
    check (status in ('open','in_review','waiting','resolved','dismissed')),
  source_type text,
  source_id uuid,
  recommended_action text,
  assigned_to uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  resolved_at timestamptz,
  resolution_note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.process_definitions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  trigger_type text not null,
  trigger_config jsonb not null default '{}'::jsonb,
  preconditions jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  escalation_rules jsonb not null default '[]'::jsonb,
  default_owner_id uuid references public.profiles(id) on delete set null,
  autonomy_level text not null default 'assisted'
    check (autonomy_level in ('assisted','supervised','semi_autonomous','autonomous_within_rules')),
  version integer not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug, version)
);

create table public.process_instances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  process_definition_id uuid not null references public.process_definitions(id) on delete restrict,
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  status text not null default 'queued'
    check (status in ('queued','running','waiting_human','blocked','completed','failed','cancelled')),
  current_step text,
  owner_id uuid references public.profiles(id) on delete set null,
  trigger_payload jsonb not null default '{}'::jsonb,
  context_snapshot jsonb not null default '{}'::jsonb,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.intelligence_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  kind text not null
    check (kind in ('insight','opportunity','risk','recommendation','anomaly')),
  title text not null,
  summary text,
  evidence jsonb not null default '[]'::jsonb,
  hypothesis text,
  recommendation text,
  confidence numeric(5,2),
  impact_score numeric(5,2),
  effort_score numeric(5,2),
  timing_score numeric(5,2),
  status text not null default 'proposed'
    check (status in ('proposed','validated','rejected','in_measurement','closed')),
  measurement_plan jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  created_by_agent_id uuid references public.agents(id) on delete set null,
  validated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  attention_item_id uuid references public.attention_items(id) on delete set null,
  intelligence_item_id uuid references public.intelligence_items(id) on delete set null,
  process_instance_id uuid references public.process_instances(id) on delete set null,
  decision_type text not null,
  title text not null,
  proposed_action jsonb not null default '{}'::jsonb,
  rationale text,
  status text not null default 'pending'
    check (status in ('pending','approved','modified','rejected','executed','closed')),
  decided_by uuid references public.profiles(id) on delete set null,
  decided_at timestamptz,
  decision_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.guardrail_policies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  scope text not null,
  action_type text not null,
  risk_level text not null default 'medium'
    check (risk_level in ('low','medium','high','critical')),
  conditions jsonb not null default '{}'::jsonb,
  limits jsonb not null default '{}'::jsonb,
  approval_mode text not null default 'human'
    check (approval_mode in ('none','human','double_human')),
  rollback_strategy text,
  is_active boolean not null default true,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.execution_actions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  decision_id uuid references public.decisions(id) on delete set null,
  process_instance_id uuid references public.process_instances(id) on delete set null,
  guardrail_policy_id uuid references public.guardrail_policies(id) on delete set null,
  action_type text not null,
  target_system text,
  target_ref text,
  requested_payload jsonb not null default '{}'::jsonb,
  before_snapshot jsonb not null default '{}'::jsonb,
  after_snapshot jsonb not null default '{}'::jsonb,
  status text not null default 'requested'
    check (status in ('requested','approved','running','succeeded','failed','rolled_back','compensated')),
  executed_by_agent_id uuid references public.agents(id) on delete set null,
  approved_by uuid references public.profiles(id) on delete set null,
  executed_at timestamptz,
  rollback_available boolean not null default false,
  rollback_payload jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  provider text,
  provider_ref text,
  occurred_at timestamptz not null,
  participants jsonb not null default '[]'::jsonb,
  transcript_ref text,
  summary text,
  decisions_summary jsonb not null default '[]'::jsonb,
  context_changes jsonb not null default '[]'::jsonb,
  status text not null default 'processed'
    check (status in ('pending','processing','processed','reviewed','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meeting_commitments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  title text not null,
  owner_type text not null default 'internal'
    check (owner_type in ('internal','client','external')),
  owner_id uuid references public.profiles(id) on delete set null,
  owner_label text,
  due_at timestamptz,
  status text not null default 'open'
    check (status in ('open','in_progress','done','blocked','cancelled')),
  task_id uuid references public.tasks(id) on delete set null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learning_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  category text not null,
  title text not null,
  learning text not null,
  source_type text,
  source_id uuid,
  evidence jsonb not null default '[]'::jsonb,
  status text not null default 'candidate'
    check (status in ('candidate','validated','active','rejected','deprecated')),
  applies_to jsonb not null default '[]'::jsonb,
  validated_by uuid references public.profiles(id) on delete set null,
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  actor_type text not null,
  actor_id uuid,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  authorization_ref uuid,
  before_snapshot jsonb not null default '{}'::jsonb,
  after_snapshot jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Updated-at triggers
create trigger client_context_entries_set_updated_at before update on public.client_context_entries
for each row execute function public.set_updated_at();
create trigger attention_items_set_updated_at before update on public.attention_items
for each row execute function public.set_updated_at();
create trigger process_definitions_set_updated_at before update on public.process_definitions
for each row execute function public.set_updated_at();
create trigger process_instances_set_updated_at before update on public.process_instances
for each row execute function public.set_updated_at();
create trigger intelligence_items_set_updated_at before update on public.intelligence_items
for each row execute function public.set_updated_at();
create trigger decisions_set_updated_at before update on public.decisions
for each row execute function public.set_updated_at();
create trigger guardrail_policies_set_updated_at before update on public.guardrail_policies
for each row execute function public.set_updated_at();
create trigger execution_actions_set_updated_at before update on public.execution_actions
for each row execute function public.set_updated_at();
create trigger meetings_set_updated_at before update on public.meetings
for each row execute function public.set_updated_at();
create trigger meeting_commitments_set_updated_at before update on public.meeting_commitments
for each row execute function public.set_updated_at();
create trigger learning_entries_set_updated_at before update on public.learning_entries
for each row execute function public.set_updated_at();

-- RLS
alter table public.client_context_entries enable row level security;
alter table public.attention_items enable row level security;
alter table public.process_definitions enable row level security;
alter table public.process_instances enable row level security;
alter table public.intelligence_items enable row level security;
alter table public.decisions enable row level security;
alter table public.guardrail_policies enable row level security;
alter table public.execution_actions enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_commitments enable row level security;
alter table public.learning_entries enable row level security;
alter table public.audit_events enable row level security;

create policy "client_context_entries_org_access" on public.client_context_entries for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "attention_items_org_access" on public.attention_items for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "process_definitions_org_access" on public.process_definitions for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "process_instances_org_access" on public.process_instances for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "intelligence_items_org_access" on public.intelligence_items for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "decisions_org_access" on public.decisions for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "guardrail_policies_org_access" on public.guardrail_policies for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "execution_actions_org_access" on public.execution_actions for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "meetings_org_access" on public.meetings for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "meeting_commitments_org_access" on public.meeting_commitments for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "learning_entries_org_access" on public.learning_entries for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));
create policy "audit_events_org_access" on public.audit_events for all using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));

-- Indexes for Command Center and account-scoped views.
create index client_context_entries_client_category_idx on public.client_context_entries (client_id, category, updated_at desc);
create index attention_items_org_status_priority_idx on public.attention_items (organization_id, status, priority, created_at desc);
create index attention_items_client_status_idx on public.attention_items (client_id, status, created_at desc);
create index process_instances_client_status_idx on public.process_instances (client_id, status, updated_at desc);
create index intelligence_items_client_kind_status_idx on public.intelligence_items (client_id, kind, status, created_at desc);
create index decisions_client_status_idx on public.decisions (client_id, status, created_at desc);
create index execution_actions_client_status_idx on public.execution_actions (client_id, status, created_at desc);
create index meetings_client_occurred_idx on public.meetings (client_id, occurred_at desc);
create index meeting_commitments_client_status_due_idx on public.meeting_commitments (client_id, status, due_at);
create index learning_entries_client_status_idx on public.learning_entries (client_id, status, updated_at desc);
create index audit_events_org_created_idx on public.audit_events (organization_id, created_at desc);
create index audit_events_client_created_idx on public.audit_events (client_id, created_at desc);
