# Prompt maestro para Codex — Avans Agency OS

Necesito que construyas el MVP inicial de **Avans Agency OS**.

Es una plataforma modular para automatizar la operación interna de una agencia de marketing usando agentes de IA con supervisión humana.

No es un chatbot ni un CRM simple. Es un sistema operativo interno para una agencia, pensado para automatizar procesos comerciales, administrativos, creativos, de reporting y project management.

## Identidad visual obligatoria

Antes de implementar UI, revisá el sitio oficial de Avans:

- https://avans.agency/

Tomá como referencia:

- logotipo de Avans,
- identidad visual,
- tipografías si están disponibles,
- colores,
- gradientes,
- composición visual,
- tono de marca,
- claim “Marketing que funciona”.

También leé y aplicá:

- `docs/VISUAL_IDENTITY.md`

El sistema debe sentirse como una extensión interna de Avans Agency, no como una plantilla SaaS genérica.

Usá una estética moderna, clara, con acentos naranja/lila/magenta, gradientes Avans, cards limpias, sidebar profesional, buen contraste y una pantalla de login cuidada.

## Contexto del producto

El objetivo del MVP es demostrar el recorrido completo de una agencia:

```txt
Lead → Discovery → Propuesta → Alta de cliente → Proyecto → Contenido → Reporte → Aprobaciones → Tareas
```

La IA debe ayudar a clasificar, resumir, generar borradores, detectar datos faltantes, crear tareas y sugerir próximos pasos, pero las acciones importantes deben pasar por aprobación humana.

## Stack requerido

Usar:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- OpenAI API
- Vercel-ready deployment

No implementar n8n todavía dentro del código. Preparar arquitectura para webhooks y automatizaciones futuras.

## Supabase

Proyecto ya creado:

- Project name: `avans-agency-os`
- Project ref: `rwjrqrwspddckvxeansc`
- Supabase URL: `https://rwjrqrwspddckvxeansc.supabase.co`
- Region: `sa-east-1`

## Variables de entorno esperadas

Crear y mantener `.env.example` con:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
APP_URL=
CRON_SECRET=
N8N_WEBHOOK_BASE_URL=
N8N_WEBHOOK_SECRET=
```

Nunca commitear `.env.local` ni claves reales.

## Objetivo del primer entregable

Crear una primera versión funcional con:

1. Login
2. Dashboard
3. Leads
4. Clientes
5. Discovery
6. Propuestas
7. Onboarding
8. Contenido
9. Reportes
10. Aprobaciones
11. Tareas
12. Agentes
13. Configuración básica

El MVP debe poder usarse como demo comercial para mostrar cómo una agencia puede automatizar gran parte de su operación.

## Modelo multiempresa

Preparar el sistema desde el inicio con estructura multi-tenant.

Todas las tablas principales deben incluir:

- organization_id
- created_at
- updated_at

El sistema debe permitir que en el futuro cada empresa tenga su propio espacio, usuarios, clientes, agentes, módulos y datos separados.

## Roles iniciales

Crear estos roles lógicos:

- admin
- comercial
- project_manager
- content_manager
- designer
- trafficker
- finance
- viewer

No hace falta implementar permisos ultra complejos en la primera versión, pero sí dejar la estructura preparada.

## Módulos del MVP

### 1. Módulo Comercial

Debe permitir:

- Crear lead manualmente
- Ver listado de leads
- Ver detalle del lead
- Registrar origen: WhatsApp, Instagram, formulario, email, referido, otro
- Registrar servicio de interés
- Registrar estado comercial
- Crear resumen del lead
- Crear próximo paso
- Crear tarea asociada

Estados sugeridos:

- nuevo
- calificado
- discovery_agendado
- propuesta_en_preparacion
- propuesta_enviada
- seguimiento
- ganado
- perdido

Agregar acción IA:

**Analizar lead**

Esta acción debe tomar el mensaje del lead y devolver:

- tipo de necesidad
- servicio sugerido
- prioridad
- datos faltantes
- resumen comercial
- próximo paso recomendado
- respuesta sugerida

La respuesta de IA debe quedar como borrador y no enviarse automáticamente.

### 2. Módulo Discovery

Debe permitir:

- Crear discovery asociado a lead o cliente
- Cargar respuestas de discovery
- Guardar objetivo del cliente
- Guardar situación actual
- Guardar problemas detectados
- Guardar herramientas actuales
- Guardar oportunidades

Agregar acción IA:

**Generar brief interno**

La IA debe devolver:

- resumen del negocio
- necesidad principal
- oportunidades detectadas
- servicios recomendados
- preguntas pendientes
- brief para equipo interno

### 3. Módulo Propuestas

Debe permitir:

- Crear propuesta desde discovery
- Título
- Cliente
- Servicio
- Alcance
- Etapas
- Entregables
- Exclusiones
- Presupuesto estimado
- Estado de aprobación

Estados:

- borrador_ia
- revision_interna
- requiere_ajustes
- aprobada
- enviada_cliente
- aceptada
- rechazada

Agregar acción IA:

**Generar propuesta base**

Debe generar una estructura editable con:

- introducción
- diagnóstico
- solución propuesta
- alcance
- etapas
- entregables
- próximos pasos

No debe definir precio final sin aprobación humana.

### 4. Módulo Onboarding / Alta de cliente

Debe permitir convertir lead ganado en cliente.

Al convertir, crear:

- cliente
- proyecto
- checklist de onboarding
- tareas iniciales
- solicitud de accesos
- documentos pendientes

Checklist sugerido:

- datos fiscales
- contrato
- factura
- acceso a Meta Business
- acceso a Google Ads
- acceso a Analytics
- acceso a Search Console
- acceso a WordPress / hosting
- acceso a redes sociales
- carpeta Drive
- kickoff agendado

Agregar acción IA:

**Detectar datos faltantes de onboarding**

### 5. Módulo Contenido

Debe permitir:

- Crear ficha de marca por cliente
- Registrar tono de comunicación
- Público objetivo
- Servicios/productos
- Restricciones
- Ejemplos aprobados
- Crear ideas de contenido
- Crear copies
- Crear prompts visuales
- Crear prompts de video
- Pasar por aprobación

Tipos de contenido:

- post
- story
- reel
- carrusel
- anuncio
- email
- blog
- guion_video

Estados:

- idea
- borrador_ia
- revision_content
- requiere_ajustes
- aprobado_interno
- enviado_cliente
- aprobado_cliente
- publicado

Agregar acciones IA:

- Generar ideas
- Generar copy
- Generar prompt de imagen
- Generar guion de video
- Revisar tono de marca

### 6. Módulo Reportes

Debe permitir:

- Crear reporte por cliente
- Cargar métricas manualmente
- Pegar datos de Meta Ads / Google Ads / Analytics
- Subir captura o archivo como evidencia
- Generar resumen ejecutivo
- Generar insights
- Generar próximos pasos
- Enviar a aprobación

No conectar todavía APIs de Meta o Google. Para el MVP permitir carga manual, texto pegado o captura subida.

Agregar acción IA:

**Generar reporte para cliente**

Debe devolver:

- resumen del período
- resultados destacados
- puntos de atención
- interpretación simple
- recomendaciones
- próximos pasos
- versión en tono entendible para cliente

### 7. Módulo Aprobaciones

Debe ser transversal.

Cualquier elemento generado por IA debe poder entrar en aprobación.

Entidades aprobables:

- lead_response
- proposal
- content_item
- report
- onboarding_document
- client_message

Estados:

- borrador_ia
- revision_interna
- requiere_ajustes
- aprobado
- rechazado
- enviado

Debe mostrar una bandeja de aprobaciones pendientes.

### 8. Módulo Tareas

Debe permitir:

- Crear tarea
- Asignar usuario
- Asociar a cliente, lead, proyecto, contenido, reporte o propuesta
- Fecha límite
- Estado
- Prioridad

Estados:

- pendiente
- en_progreso
- bloqueada
- completada
- cancelada

Prioridades:

- baja
- media
- alta
- urgente

### 9. Módulo Agentes

Crear una pantalla de agentes disponibles.

Agentes iniciales:

- Lead Classifier Agent
- Discovery Brief Agent
- Proposal Draft Agent
- Onboarding Assistant Agent
- Content Strategist Agent
- Copywriter Agent
- Visual Prompt Agent
- Report Analyst Agent
- PM Assistant Agent

Cada agente debe mostrar:

- nombre
- descripción
- módulo asociado
- qué hace
- qué datos usa
- qué acciones puede sugerir
- estado activo/inactivo

No hace falta crear agentes autónomos complejos todavía. Implementar llamadas controladas a OpenAI desde server actions o API routes.

## Base de datos sugerida

Crear migración Supabase con estas tablas iniciales:

- organizations
- organization_members
- profiles
- clients
- leads
- lead_messages
- discoveries
- proposals
- projects
- onboarding_checklists
- onboarding_items
- brand_profiles
- content_items
- reports
- report_metrics
- approvals
- tasks
- agents
- agent_runs
- documents
- automation_logs
- integrations

Implementar RLS básico por organization_id.

## UI / Diseño

Crear una interfaz moderna, limpia, tipo SaaS, pero personalizada para Avans.

Estilo visual:

- identidad basada en avans.agency
- logo Avans visible en login/sidebar
- colores naranja, lila, magenta y dark Avans
- gradients de marca en CTAs y tarjetas destacadas
- fondo claro operativo
- cards blancas
- bordes suaves
- tipografía limpia
- sidebar lateral
- dashboard con métricas
- estados visuales con badges
- formularios simples
- tablas claras
- empty states bien escritos

La demo debe sentirse profesional, no como prototipo roto.

## Dashboard inicial

Mostrar cards:

- Leads nuevos
- Propuestas en revisión
- Clientes activos
- Contenidos pendientes de aprobación
- Reportes pendientes
- Tareas vencidas
- Agentes activos

También mostrar una sección “Actividad reciente”.

## Reglas importantes

- No enviar mensajes automáticamente al cliente.
- Todo output de IA debe quedar como borrador.
- Las propuestas, presupuestos, reportes y contenidos requieren aprobación humana.
- No inventar precios cerrados.
- Registrar cada ejecución de IA en agent_runs.
- Registrar errores en automation_logs.
- Preparar variables de entorno para Supabase y OpenAI.

## Entregables esperados

1. Proyecto Next.js funcionando.
2. Migraciones Supabase.
3. Seed inicial con organización Avans y agentes iniciales.
4. Login funcional.
5. Dashboard funcional.
6. CRUD básico de leads, clientes, tareas, contenido y reportes.
7. Acciones IA iniciales en modo borrador.
8. Bandeja de aprobaciones.
9. README con instrucciones de instalación.
10. Checklist de próximos pasos.

## Primera prioridad

Primero construir la base navegable y funcional:

- Auth
- Layout
- Sidebar
- Dashboard
- Tablas principales
- Formularios básicos
- Migración Supabase
- Seed de agentes
- UI personalizada con identidad de Avans

Después implementar las acciones IA.

Trabajar en ramas pequeñas y crear PRs revisables. No hacer un cambio gigante imposible de revisar.
