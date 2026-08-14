-- Avans Agency OS seed data
-- Run after migrations. Membership seed must be completed after creating the first auth user.

with avans_org as (
  select id from public.organizations where slug = 'avans' limit 1
)
insert into public.agents (organization_id, name, slug, module, description, instructions, tools)
select id, name, slug, module, description, instructions, tools::jsonb
from avans_org,
(values
  (
    'Lead Classifier Agent',
    'lead-classifier-agent',
    'comercial',
    'Clasifica leads, detecta intención, prioridad, servicio sugerido y datos faltantes.',
    'Analizá el mensaje del lead. Devolvé tipo de necesidad, servicio sugerido, prioridad, datos faltantes, resumen comercial, próximo paso y respuesta sugerida. No envíes mensajes automáticamente.',
    '["classify_lead", "suggest_next_step", "draft_response"]'
  ),
  (
    'Discovery Brief Agent',
    'discovery-brief-agent',
    'discovery',
    'Convierte respuestas de discovery en brief interno para el equipo.',
    'Tomá respuestas de discovery y generá resumen del negocio, necesidad principal, oportunidades, servicios recomendados, preguntas pendientes y brief interno.',
    '["generate_internal_brief", "detect_opportunities"]'
  ),
  (
    'Proposal Draft Agent',
    'proposal-draft-agent',
    'propuestas',
    'Genera estructura de propuesta base a partir del discovery.',
    'Creá una propuesta editable con diagnóstico, solución, alcance, etapas, entregables y próximos pasos. No definas precio final sin aprobación humana.',
    '["draft_proposal", "define_scope", "list_deliverables"]'
  ),
  (
    'Onboarding Assistant Agent',
    'onboarding-assistant-agent',
    'onboarding',
    'Detecta datos faltantes y prepara checklist de alta de cliente.',
    'Revisá la información del cliente ganado y detectá datos fiscales, contrato, factura, accesos, carpeta y kickoff pendientes.',
    '["detect_missing_data", "create_onboarding_checklist"]'
  ),
  (
    'Content Strategist Agent',
    'content-strategist-agent',
    'contenido',
    'Propone pilares, ideas y calendario de contenido según marca y objetivo.',
    'Usá la ficha de marca del cliente para generar ideas alineadas al tono, público, servicios y restricciones.',
    '["generate_content_ideas", "plan_calendar"]'
  ),
  (
    'Copywriter Agent',
    'copywriter-agent',
    'contenido',
    'Genera copies, captions, hooks, CTAs y variantes por canal.',
    'Escribí borradores de copy respetando tono de marca, objetivo y formato. Todo queda sujeto a revisión humana.',
    '["draft_copy", "create_variants", "review_tone"]'
  ),
  (
    'Visual Prompt Agent',
    'visual-prompt-agent',
    'contenido',
    'Genera prompts de imagen/video, conceptos visuales y guiones para piezas IA.',
    'Transformá ideas de contenido en prompts visuales, guiones de video, escenas y referencias para diseño.',
    '["generate_image_prompt", "generate_video_script", "storyboard"]'
  ),
  (
    'Report Analyst Agent',
    'report-analyst-agent',
    'reportes',
    'Interpreta métricas pegadas o capturas y genera reportes claros para cliente.',
    'Convertí datos de campañas, contenido o analítica en resumen ejecutivo, insights, puntos de atención y próximos pasos.',
    '["analyze_metrics", "draft_client_report", "suggest_next_steps"]'
  ),
  (
    'PM Assistant Agent',
    'pm-assistant-agent',
    'project-management',
    'Ayuda al PM a detectar bloqueos, tareas vencidas y próximos pasos.',
    'Revisá proyectos, tareas y aprobaciones para detectar bloqueos, pendientes y próximos pasos para el PM.',
    '["detect_blockers", "summarize_project_status", "create_tasks"]'
  )
) as agent_seed(name, slug, module, description, instructions, tools)
on conflict (organization_id, slug) do nothing;

-- TODO after first user signup:
-- 1. Find auth user id.
-- 2. Insert profile.
-- 3. Insert organization_members row with role admin.
