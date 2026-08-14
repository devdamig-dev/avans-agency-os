# Arquitectura — Avans Agency OS

## Objetivo del MVP

Construir una demo funcional para mostrar cómo una agencia puede automatizar gran parte de su operación con IA y supervisión humana.

Recorrido principal:

```txt
Lead → Discovery → Propuesta → Alta de cliente → Proyecto → Contenido → Reporte → Aprobaciones → Tareas
```

## Principio operativo

```txt
La IA prepara, interpreta y sugiere.
El equipo humano revisa, aprueba y decide.
```

Ninguna acción sensible debe ejecutarse automáticamente en el MVP.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Supabase RLS
- OpenAI API
- Vercel

## Preparado para futuro

- n8n como motor de automatizaciones.
- Webhooks por módulo.
- Integraciones con Gmail, Google Drive, Meta Ads, Google Ads, WhatsApp, Kommo, HubSpot o herramientas existentes del cliente.
- Múltiples motores de IA según tarea.

## Multi-tenant

Todas las tablas principales deben tener `organization_id`.

Aunque el primer cliente sea Avans, el sistema debe poder escalar a múltiples organizaciones en el futuro.

Modelo conceptual:

```txt
organizations
  └── organization_members
        └── profiles
  └── clients
  └── leads
  └── projects
  └── agents
  └── tasks
```

## Roles iniciales

- admin
- comercial
- project_manager
- content_manager
- designer
- trafficker
- finance
- viewer

Los permisos pueden empezar simples, pero la estructura debe quedar preparada.

## Módulos

### Comercial

Entrada, clasificación, scoring y seguimiento de leads.

### Discovery

Relevamiento, diagnóstico, brief interno y oportunidades.

### Propuestas

Generación de estructura, alcance, etapas, entregables y aprobación.

### Onboarding

Alta de cliente, datos fiscales, contrato, accesos, carpeta y kickoff.

### Project Management

Tareas, responsables, bloqueos, pendientes y estado del proyecto.

### Contenido

Ficha de marca, ideas, copies, prompts visuales, guiones, calendario y aprobaciones.

### Reportes

Carga manual de métricas, interpretación, insights, próximos pasos y revisión.

### Aprobaciones

Bandeja transversal para todo lo generado por IA.

### Agentes

Pantalla de agentes disponibles, sus objetivos, módulos y estado.

## Estados de aprobación

```txt
borrador_ia → revision_interna → requiere_ajustes → aprobado → enviado
```

## Agentes iniciales

- Lead Classifier Agent
- Discovery Brief Agent
- Proposal Draft Agent
- Onboarding Assistant Agent
- Content Strategist Agent
- Copywriter Agent
- Visual Prompt Agent
- Report Analyst Agent
- PM Assistant Agent

## Registro de IA

Cada ejecución debe registrarse en `agent_runs` con:

- organization_id
- agent_id
- input
- output
- status
- tokens estimados si están disponibles
- error_message si falla

## Logs de automatización

Cada evento relevante debe registrarse en `automation_logs`:

- creación de lead
- generación IA
- aprobación
- error
- cambio de estado
- creación de tarea
- conversión de lead a cliente

## Storage

Supabase Storage se usará para:

- capturas de reportes
- documentos de cliente
- contratos preliminares
- assets de contenido
- referencias visuales

## Reglas de seguridad

- Activar RLS en tablas con datos de negocio.
- Filtrar por `organization_id`.
- No exponer service role en frontend.
- Usar server actions/API routes para llamadas sensibles.
- Mantener todo output IA como borrador.

## Primera versión navegable

Prioridad antes de IA avanzada:

1. Auth.
2. Layout.
3. Sidebar.
4. Dashboard.
5. CRUD básico.
6. Aprobaciones.
7. Agentes.
8. Migración inicial.
9. Seed.
10. Luego acciones IA.
