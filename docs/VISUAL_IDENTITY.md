# Guía visual inicial — Avans Agency OS

Esta guía orienta a Codex para que el MVP no quede con estética SaaS genérica. La interfaz debe tomar como referencia la identidad pública de Avans Agency.

## Referencia principal

- Sitio oficial: https://avans.agency/
- Claim público: “Marketing que funciona”.
- Enfoque del sitio: planes de marketing que generan resultados, marketing para empresas, comunicación para instituciones, equipo experto, metodología y resultados.

## Dirección visual

El sistema debe sentirse como una extensión interna de Avans, no como una plantilla de dashboard común.

### Personalidad

- Moderna.
- Estratégica.
- Digital.
- Directa.
- Enérgica sin perder claridad.
- Agencia de marketing, no software corporativo frío.

### Look & feel

- Fondo claro como base para la app operativa.
- Zonas oscuras o bloques con alto contraste para hero, login o pantallas estratégicas.
- Cards limpias y livianas.
- Bordes suaves.
- Mucho aire.
- Tipografía fuerte en títulos.
- Badges y estados con buen contraste.
- Acentos en naranja, lila y magenta.
- Gradientes sutiles para acciones principales, headers, empty states o tarjetas destacadas.

## Colores sugeridos

Codex debe inspeccionar visualmente avans.agency si tiene acceso desde el entorno y ajustar estos tokens si detecta los valores reales.

Fallback inicial:

```css
--avans-orange: #ff6a2a;
--avans-magenta: #d946ef;
--avans-purple: #7c3aed;
--avans-dark: #121018;
--avans-ink: #18151f;
--avans-muted: #716a7c;
--avans-border: #ebe7f0;
--avans-bg: #faf8fc;
--avans-card: #ffffff;
--avans-success: #16a34a;
--avans-warning: #f59e0b;
--avans-danger: #ef4444;
```

Gradientes sugeridos:

```css
--avans-gradient-main: linear-gradient(135deg, #ff6a2a 0%, #d946ef 50%, #7c3aed 100%);
--avans-gradient-soft: linear-gradient(135deg, rgba(255,106,42,.12), rgba(217,70,239,.12), rgba(124,58,237,.12));
--avans-gradient-dark: radial-gradient(circle at top left, rgba(255,106,42,.28), transparent 34%), radial-gradient(circle at bottom right, rgba(124,58,237,.32), transparent 36%), #121018;
```

## Tipografía

Codex debe inspeccionar el sitio de Avans y detectar tipografías si están disponibles. Si no puede obtenerlas, usar una combinación moderna y segura:

- Títulos: `Inter`, `Space Grotesk` o `Sora`.
- Texto/UI: `Inter`.
- Evitar fuentes demasiado corporativas o pesadas.

Títulos grandes, claros, con frases cortas y contundentes.

## Componentes UI

### Sidebar

- Fondo blanco o casi blanco.
- Logo Avans arriba.
- Íconos simples.
- Estado activo con gradiente suave o borde lateral naranja/magenta.
- Secciones: Operación, Producción, Gestión, Sistema.

### Dashboard

- Cards con métricas claras.
- Una card principal con gradiente Avans.
- Estados de alerta bien visibles.
- Actividad reciente con timeline.

### Botones

Primario:

- Gradiente naranja → magenta → lila.
- Texto blanco.
- Hover con leve elevación.

Secundario:

- Fondo blanco.
- Borde suave.
- Texto oscuro.

Acciones sensibles:

- Evitar gradiente.
- Usar estados claros y confirmaciones.

### Badges de estado

Usar lenguaje operativo:

- Nuevo
- Borrador IA
- En revisión
- Requiere ajustes
- Aprobado
- Enviado
- Bloqueado
- Vencido

### Aprobaciones

Las aprobaciones son una parte central del producto. Deben tener una UI muy clara:

```txt
Borrador IA → Revisión interna → Requiere ajustes → Aprobado → Enviado
```

Mostrar siempre:

- Qué generó la IA.
- Quién debe revisar.
- Qué acción se recomienda.
- Botones: Aprobar, Pedir ajustes, Rechazar.

## Login

El login debe ser una buena primera impresión:

- Lado izquierdo con fondo oscuro y gradiente Avans.
- Mensaje: “Avans Agency OS”.
- Bajada: “Automatización interna para agencias que quieren operar mejor”.
- Lado derecho con formulario simple.

## Copy del sistema

Usar tono Avans:

- Claro.
- Directo.
- Comercial.
- Sin exceso técnico.

Ejemplos:

- “Nada queda perdido.”
- “La IA prepara. El equipo aprueba.”
- “De lead a proyecto, con procesos visibles.”
- “Automatizá el trabajo repetitivo sin perder control.”
- “Marketing que funciona también necesita operaciones que funcionan.”

## Regla de oro

La UI debe reforzar visualmente que este sistema es para Avans y nace desde su operación real. No debe parecer un template administrativo genérico.
