# Avans Intelligence Core V2 — Blueprint

## 1. Decisión de arquitectura

Avans V2 no parte de cero. Se conserva el proyecto actual como base técnica y se realiza un reset conceptual sobre una rama nueva.

La V1 queda como referencia funcional del vertical agencia. La V2 reorganiza el producto para que `Avans Core` sea reutilizable en cualquier PyME y `Agency OS` sea el primer vertical construido sobre ese core.

### Principio central

> Avans no reemplaza las herramientas que ya funcionan. Conecta la operación existente, centraliza contexto y decisiones, automatiza tareas, detecta excepciones, recomienda acciones, ejecuta dentro de límites y aprende del resultado.

### Intelligence Loop

```txt
Observar → Detectar → Entender → Recomendar → Aprobar → Ejecutar → Medir → Aprender
```

Todo proceso crítico de V2 debe poder mapearse a este loop.

---

## 2. Auditoría técnica de la V1

### Estado del frontend

La aplicación actual está correctamente preparada como demo navegable, pero todavía no como producto operativo conectado a datos reales.

Hallazgos:

- Next.js 16.3.1 + React 19 + TypeScript.
- Navegación multi-ruta basada en `app/[section]/page.tsx`.
- El grueso de la experiencia vive en un único componente cliente: `app/components/agency-os.tsx`.
- La mayor parte del estado demo vive en `app/data.ts`.
- La UI actual ya contiene buenos patrones: Centro Operativo, prioridades, bloqueos, siguiente mejor acción, aprobación humana, contratos de engine, agentes y workflows.
- El código frontend está demasiado concentrado para evolucionar de forma segura: UI, interacción demo, navegación, lógica de módulos y representación de datos conviven en pocos archivos grandes.
- No hay una capa de dominio explícita entre UI y datos.
- No se observan en el árbol actual rutas API, server actions ni clientes Supabase usados por la aplicación. La base está diseñada, pero la demo visible funciona principalmente con datos estáticos.

### Estado de Supabase

Existe una migración inicial sólida para un MVP multi-tenant, con:

- organizations / organization_members / profiles;
- clients / leads / lead_messages;
- discoveries / proposals / projects;
- onboarding;
- brand_profiles;
- content_items;
- reports / report_metrics;
- approvals / tasks;
- agents / agent_runs;
- documents / automation_logs / integrations;
- RLS por `organization_id`;
- índices básicos y triggers de `updated_at`.

El proyecto Supabase `avans-agency-os` existe, pero actualmente figura inactivo. No se modifica ni restaura en esta etapa. La evolución V2 se diseña primero como migraciones aditivas y se aplicará sobre un entorno de desarrollo antes de tocar producción.

### Riesgos de continuar parcheando V1

1. La navegación actual refleja una agencia, no un sistema operativo inteligente transversal.
2. `Cerebro de Marca` y `Aprendizajes` representan dos caras de una misma memoria, pero viven como módulos separados.
3. `Contenido` y `Producción Creativa` se superponen parcialmente.
4. `Aprobaciones` sólo resuelve outputs a revisar; V2 necesita una bandeja general de atención humana.
5. `Agentes` aparecen como protagonistas del producto cuando deberían ser infraestructura observable.
6. No existe una entidad de proceso/workflow suficientemente genérica para modelar eventos, instancias, pasos, decisiones y ejecuciones.
7. `automation_logs` registra eventos, pero no alcanza para trazabilidad completa de autorización, ejecución, before/after y resultado.
8. El modelo de contexto del cliente está demasiado centrado en marca/contenido.

---

## 3. Qué se conserva, qué cambia y qué se absorbe

| V1 | Decisión V2 | Destino |
|---|---|---|
| Centro Operativo | Refactorizar | Avans Command Center |
| Leads | Conservar | Agency Pack / Comercial |
| Discovery | Conservar + ampliar | Discovery & Diagnosis Engine |
| Propuestas | Conservar + ampliar | Scope / Proposal Engine |
| Clientes | Ampliar | Client Intelligence Hub |
| Proyectos | Refactorizar | Projects + Process Instances |
| Onboarding | Refactorizar | Smart Activation |
| Cerebro de Marca | Absorber | Client Intelligence / Knowledge |
| Aprendizajes | Absorber | Learning Engine transversal |
| Contenido | Conservar | Agency Pack |
| Producción Creativa | Fusionar | Workflow de Content Production |
| Campañas | Refactorizar | Campaign Intelligence |
| Reportes | Refactorizar | Data & Insights |
| Aprobaciones | Reemplazar concepto | Intelligent Inbox / Decision Center |
| Agentes IA | Conservar, bajar protagonismo | Admin / Observability |
| Automatizaciones | Refactorizar | Process & Workflow Engine |
| Configuración | Ampliar | Integrations, policies, guardrails |

---

## 4. Arquitectura objetivo

```txt
EXTERNAL SYSTEMS
CRM · WhatsApp · Gmail · Drive · Meta · Google Ads · ERP · Accounting · Custom APIs
        ↓
INTEGRATION LAYER
connectors · webhooks · scheduled sync · normalization
        ↓
DATA & CONTEXT LAYER
operational data · client intelligence · documents · history · metrics · meetings
        ↓
PROCESS ENGINE
triggers · workflows · steps · rules · assignments · deadlines · escalations
        ↓
INTELLIGENCE LAYER
agents · anomaly detection · recommendations · prioritization · reasoning context
        ↓
DECISION & EXECUTION
human approvals · policies · guardrails · execution · rollback/compensation
        ↓
AVANS COMMAND CENTER
attention inbox · next best actions · risks · opportunities · process health
        ↓
LEARNING ENGINE
feedback · decisions · outcomes · validated learnings · context updates
```

### Regla de producto

El usuario no debería entrar a Avans para revisar manualmente todo lo que ocurre. Debe entrar principalmente para resolver excepciones, aprobar decisiones sensibles y entender el estado operativo.

---

## 5. Navegación V2 propuesta

### GENERAL

- Command Center
- Inbox

### OPERACIÓN

- Clientes
- Procesos
- Proyectos
- Reuniones

### INTELIGENCIA

- Insights
- Oportunidades
- Aprendizajes

### NEGOCIO

- Capacidad
- Revenue & Cobros
- Account Economics

### AGENCY PACK

- Leads
- Discovery
- Propuestas
- Contenido
- Campañas
- Reportes

### SISTEMA

- Integraciones
- Agentes
- Workflows
- Permisos & Guardrails
- Auditoría
- Configuración

La navegación debe ser capability-driven: los módulos del vertical aparecen sólo cuando están habilitados para esa organización.

---

## 6. Command Center V2

El dashboard deja de ser un mapa lineal de módulos y pasa a responder cuatro preguntas:

1. ¿Qué requiere atención ahora?
2. ¿Qué está bloqueado o en riesgo?
3. ¿Qué recomienda Avans?
4. ¿Qué está resolviendo Avans automáticamente?

### Bloques principales

#### Atención requerida

- decisiones críticas;
- procesos bloqueados;
- aprobaciones;
- alertas/anomalías;
- compromisos próximos a vencer;
- escalaciones.

#### Next Best Actions

Cada acción debe incluir:

- prioridad;
- contexto;
- razón de la recomendación;
- impacto esperado;
- responsable;
- deadline;
- acciones disponibles.

#### Operación automática

- acciones ejecutadas hoy;
- workflows activos;
- errores/reintentos;
- acciones que requirieron intervención.

#### Aprendizaje

- nuevos patrones detectados;
- aprendizajes validados;
- propuestas de actualización de contexto;
- evolución del grado de autonomía.

---

## 7. Intelligent Inbox / Decision Center

`Aprobaciones` evoluciona a una bandeja transversal.

Tipos iniciales:

```txt
approval
review
decision
exception
blocker
alert
escalation
missing_requirement
learning_validation
```

Cada item debe tener:

- organización;
- cliente/proceso/proyecto relacionado;
- severidad y prioridad;
- título y contexto;
- fuente/origen;
- recomendación IA opcional;
- acciones permitidas;
- responsable;
- vencimiento;
- estado;
- historial de decisiones.

Estados base:

```txt
open → acknowledged → in_progress → resolved
                    ↘ dismissed
                    ↘ escalated
```

Los items de aprobación mantienen un subestado específico, pero ya no requieren una pantalla aislada.

---

## 8. Client Intelligence Hub

`clients + brand_profiles + discoveries + documents + learnings` convergen conceptualmente en una única memoria operativa.

### Capas de contexto

- identidad y datos administrativos;
- negocio y propuesta de valor;
- objetivos;
- servicios/productos;
- responsables;
- herramientas conectadas;
- contexto estratégico;
- audiencias;
- preferencias de comunicación;
- restricciones;
- fuentes de verdad;
- documentos;
- reuniones;
- decisiones;
- aprobaciones;
- ejemplos aprobados/rechazados;
- histórico de performance;
- aprendizajes validados.

### Calidad de conocimiento

Todo hecho relevante debe poder clasificarse como:

```txt
confirmed
imported
inferred
pending_validation
superseded
```

Y registrar origen:

```txt
discovery
crm
meeting
document
user
integration
ai_inference
approval
```

Una inferencia de IA nunca debe sobrescribir silenciosamente un dato confirmado.

---

## 9. Process & Workflow Engine

V2 necesita separar `proyecto`, `tarea`, `workflow` e `instancia de proceso`.

### Definiciones

- **Workflow definition:** plantilla reutilizable del proceso.
- **Workflow version:** versión inmutable de esa plantilla.
- **Process instance:** ejecución concreta para un cliente/evento.
- **Step instance:** cada paso real de esa ejecución.
- **Trigger:** evento que inicia o reactiva un workflow.
- **Rule:** condición determinística evaluable.
- **Action:** trabajo humano, sistema, integración o agente.

### Ejemplos de triggers

```txt
lead_won
client_created
proposal_accepted
invoice_overdue
meeting_processed
campaign_anomaly_detected
content_approved
employee_role_changed
```

### Precondiciones

Todo proceso crítico puede declarar requisitos. Si faltan:

```txt
trigger → validate requirements → create missing_requirement inbox item → wait
```

No se ejecutan pasos sensibles con precondiciones incompletas.

---

## 10. Agent Layer V2

Los agentes dejan de estar atados a una pantalla/módulo y pasan a estar asociados a capacidades y procesos.

Cada agente debe declarar:

- purpose;
- permitted data scopes;
- available tools;
- allowed actions;
- required approvals;
- budget/token limits;
- output schema;
- confidence/validation policy;
- fallback strategy;
- versioned instructions.

### Principio

> El agente no es el producto. El proceso y el resultado son el producto.

La UI de agentes se mantiene en Sistema para administración, debugging, observabilidad y costos.

---

## 11. Execution Engine & Guardrails

Toda acción que modifique sistemas externos debe ser auditable.

### Niveles de autonomía

```txt
L0 manual
L1 assisted       IA analiza / humano actúa
L2 supervised     IA prepara / humano aprueba / sistema ejecuta
L3 bounded-auto   sistema ejecuta dentro de límites predefinidos
L4 autonomous     proceso maduro, reversible y de bajo riesgo
```

### Guardrails por acción

- allow / deny;
- approval required;
- approver role;
- monetary limit;
- percentage limit;
- temporal window;
- allowed resources/accounts;
- simulation requirement;
- reversibility;
- escalation policy.

### Registro de ejecución

```txt
recommendation
authorization
execution_attempt
before_state
after_state
external_reference
status
error
rollback_or_compensation
outcome
```

---

## 12. Learning Engine

El aprendizaje no debe ser una colección de notas.

### Fuentes

- correcciones de usuarios;
- feedback del cliente;
- aprobaciones/rechazos;
- decisiones sobre recomendaciones;
- resultados post-ejecución;
- anomalías repetidas;
- performance histórica.

### Ciclo

```txt
signal → proposed learning → validation → active learning → measured effect
```

Las instrucciones críticas no se modifican automáticamente por una corrección aislada.

### Métrica futura

**Autonomy Score por proceso**: proporción de pasos/acciones que pueden resolverse sin intervención humana manteniendo calidad y guardrails.

---

## 13. Nuevas entidades de datos propuestas

No se eliminan inicialmente las tablas V1. Se agregan entidades y se migra progresivamente.

### Contexto y conocimiento

```txt
knowledge_items
knowledge_sources
learning_candidates
learnings
learning_applications
```

### Procesos

```txt
workflow_definitions
workflow_versions
workflow_steps
workflow_triggers
workflow_rules
process_instances
process_step_instances
```

### Atención y decisiones

```txt
attention_items
decisions
recommendations
approvals_v2
```

### Ejecución

```txt
execution_policies
execution_requests
execution_runs
execution_state_snapshots
```

### Datos e inteligencia

```txt
data_sources
metric_definitions
metric_observations
anomalies
insights
opportunities
```

### Reuniones

```txt
meetings
meeting_participants
meeting_commitments
```

### Negocio (fase posterior)

```txt
service_contracts
revenue_forecasts
invoices_sync
collections_sync
capacity_snapshots
account_effort_signals
account_economics_snapshots
```

---

## 14. Qué NO hacer en V2

- No construir un CRM genérico.
- No construir otro Monday/ClickUp.
- No construir contabilidad propia si el cliente ya utiliza un sistema adecuado.
- No crear módulos por cada herramienta integrada.
- No dejar que un LLM reemplace reglas determinísticas donde una condición objetiva sea suficiente.
- No permitir que inferencias IA se conviertan automáticamente en hechos confirmados.
- No mezclar lógica de vertical agencia dentro del Core.
- No hacer migraciones destructivas sobre la base actual en las primeras etapas.
- No hacer que la cantidad de agentes sea una métrica principal del producto.

---

## 15. Plan de implementación

### Etapa 0 — Congelamiento y baseline

- mantener `main` como V1 estable;
- desarrollar V2 en `feature/avans-intelligence-core-v2`;
- no tocar todavía Supabase productivo;
- documentar decisiones de arquitectura.

### Etapa 1 — Foundation

- descomponer `agency-os.tsx`;
- crear layouts y navegación V2;
- separar `core` de `agency-pack`;
- crear tipos de dominio;
- introducir capa repository/service para abandonar acceso directo a fixtures;
- mantener adaptadores de datos demo para no romper la navegación mientras se migra.

### Etapa 2 — Command Center + Inbox

- nuevo dashboard basado en atención;
- `attention_items` demo primero y persistente después;
- unificar aprobaciones, alertas, bloqueos y decisiones;
- Next Best Action con explicación y acciones disponibles.

### Etapa 3 — Client Intelligence

- vista 360 del cliente;
- knowledge items y fuentes;
- absorber Cerebro de Marca + Aprendizajes;
- historial y calidad del dato;
- propuesta/validación de actualizaciones de contexto.

### Etapa 4 — Process Engine

- definiciones de workflow;
- process instances;
- pasos y responsables;
- precondiciones;
- escalamiento;
- automatizaciones del Agency Pack montadas sobre el motor.

### Etapa 5 — Decision / Execution / Learning

- recommendations;
- policies y guardrails;
- aprobación humana;
- execution runs;
- before/after;
- learning loop.

### Etapa 6 — Intelligence packs

Por prioridad de negocio:

1. Meeting Intelligence.
2. Campaign Intelligence.
3. Operations & Capacity.
4. Revenue & Collections.
5. Account Economics.
6. Market & Opportunity Intelligence.

---

## 16. Primera definición de éxito de V2

V2 está conceptualmente validada cuando un usuario puede entrar al sistema y completar este recorrido sin pensar en módulos aislados:

```txt
1. Avans detecta una situación.
2. La situación aparece priorizada en Command Center / Inbox.
3. El usuario entiende por qué importa.
4. Avans recomienda una acción.
5. El sistema sabe si necesita aprobación.
6. La acción se ejecuta o deriva al responsable.
7. Queda trazabilidad completa.
8. El resultado se mide.
9. Un aprendizaje puede incorporarse al contexto.
```

El primer vertical para probar este loop es Agency OS.

---

## 17. Orden inmediato de trabajo

1. Refactor estructural del frontend sin cambiar todavía el look & feel aprobado.
2. Crear navegación V2 y capability flags.
3. Construir `Command Center` e `Intelligent Inbox` sobre fixtures compatibles.
4. Crear modelo de dominio y migración aditiva V2.
5. Activar un Supabase de desarrollo y conectar sólo los nuevos módulos.
6. Migrar Client Intelligence.
7. Migrar workflows y Agency Pack progresivamente.
8. Ejecutar QA funcional y de permisos antes de eliminar cualquier estructura V1.

---

## 18. Posicionamiento resultante

> **Avans es un sistema operativo inteligente para empresas.**
>
> Conecta la operación existente, transforma información dispersa en contexto, detecta lo que requiere atención, recomienda la próxima mejor acción, ejecuta dentro de límites definidos y aprende de cada resultado.

Agency OS deja de ser el producto completo y pasa a ser la primera demostración vertical de Avans Intelligence Core.
