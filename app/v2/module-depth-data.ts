export type ModuleDepthConfig = {
  flowTitle: string;
  flow: string[];
  automate: string[];
  human: string[];
  signals: { title: string; detail: string; status: string }[];
};

export const moduleDepthData: Record<string, ModuleDepthConfig> = {
  inbox: {
    flowTitle: "De señal a resolución",
    flow: ["Detectar", "Priorizar", "Asignar", "Explicar", "Resolver", "Registrar resultado"],
    automate: ["Agrupar eventos similares", "Calcular prioridad por impacto y urgencia", "Sugerir responsable y próxima acción"],
    human: ["Decisiones sensibles", "Excepciones sin regla", "Cambios que afectan presupuesto o cliente"],
    signals: [
      { title: "Cola crítica", detail: "Items con deadline, bloqueo o impacto comercial alto.", status: "3 abiertos" },
      { title: "SLA de resolución", detail: "Tiempo desde detección hasta intervención humana.", status: "2h 18m" },
      { title: "Ruido evitado", detail: "Eventos absorbidos o resueltos sin crear una alerta humana.", status: "41 hoy" },
    ],
  },
  clientes: {
    flowTitle: "Ciclo de inteligencia por cuenta",
    flow: ["Alta", "Contexto", "Operación", "Decisiones", "Resultados", "Aprendizaje"],
    automate: ["Consolidar fuentes y documentos", "Detectar faltantes de contexto", "Relacionar decisiones, proyectos y resultados"],
    human: ["Validar contexto estratégico", "Confirmar cambios de posicionamiento", "Aprobar conocimiento crítico"],
    signals: [
      { title: "Completitud de contexto", detail: "Qué parte del conocimiento de cuenta está validado y disponible.", status: "84%" },
      { title: "Salud de cuenta", detail: "Combina bloqueos, cumplimiento, feedback, performance y actividad.", status: "4/5 sanas" },
      { title: "Memoria pendiente", detail: "Aprendizajes detectados que todavía no deben modificar el contexto.", status: "5 validar" },
    ],
  },
  procesos: {
    flowTitle: "Contrato de ejecución",
    flow: ["Evento", "Precondiciones", "Reglas", "Responsable", "Ejecución", "Escalamiento"],
    automate: ["Verificar condiciones de inicio", "Crear tareas y dependencias", "Escalar vencimientos y excepciones"],
    human: ["Definir reglas de negocio", "Resolver excepciones no previstas", "Aprobar cambios de proceso"],
    signals: [
      { title: "Procesos fuera de SLA", detail: "Ejecuciones que excedieron el tiempo esperado.", status: "2" },
      { title: "Pasos manuales repetidos", detail: "Acciones recurrentes candidatas a automatización.", status: "6 detectados" },
      { title: "Tasa de excepción", detail: "Cuánto del flujo necesita intervención fuera del camino esperado.", status: "12%" },
    ],
  },
  proyectos: {
    flowTitle: "Control operativo",
    flow: ["Plan", "Hitos", "Dependencias", "Ejecución", "Riesgo", "Cierre"],
    automate: ["Detectar tareas sin owner o fecha", "Anticipar riesgos por dependencias", "Resumir estado y próxima acción"],
    human: ["Cambiar alcance", "Repriorizar recursos", "Aceptar desvíos de fecha o presupuesto"],
    signals: [
      { title: "Hitos comprometidos", detail: "Próximos entregables con riesgo real de desplazamiento.", status: "2" },
      { title: "Dependencias externas", detail: "Bloqueos que requieren acción del cliente o proveedor.", status: "4" },
      { title: "Carga no planificada", detail: "Trabajo agregado fuera del alcance operativo esperado.", status: "+9%" },
    ],
  },
  reuniones: {
    flowTitle: "De conversación a operación",
    flow: ["Transcribir", "Estructurar", "Detectar compromisos", "Asignar", "Validar contexto", "Seguir"],
    automate: ["Extraer acuerdos y pendientes", "Crear tareas con origen trazable", "Relacionar señales con la cuenta"],
    human: ["Validar decisiones ambiguas", "Confirmar cambios estratégicos", "Corregir interpretación cuando haga falta"],
    signals: [
      { title: "Compromisos sin cierre", detail: "Promesas detectadas en reuniones que siguen abiertas.", status: "6" },
      { title: "Cambios de contexto", detail: "Información nueva que podría actualizar la memoria de cuenta.", status: "3 validar" },
      { title: "Señales de relación", detail: "Patrones de respuesta, demoras o fricción que merecen seguimiento.", status: "4" },
    ],
  },
  insights: {
    flowTitle: "De dato a recomendación",
    flow: ["Observar", "Comparar", "Detectar", "Explicar", "Recomendar", "Medir"],
    automate: ["Cruzar histórico y estado actual", "Detectar variaciones relevantes", "Generar explicación con evidencia"],
    human: ["Validar causalidad", "Decidir acciones estratégicas", "Confirmar si el insight pasa a regla"],
    signals: [
      { title: "Insights accionables", detail: "Hallazgos con suficiente evidencia para sugerir una acción.", status: "7" },
      { title: "En medición", detail: "Recomendaciones aplicadas cuyo resultado aún se evalúa.", status: "3" },
      { title: "Confianza baja", detail: "Hallazgos que deben mostrarse como hipótesis, no como certeza.", status: "2" },
    ],
  },
  oportunidades: {
    flowTitle: "Motor de oportunidad",
    flow: ["Señal", "Cruce con contexto", "Relevancia", "Priorización", "Acción", "Seguimiento"],
    automate: ["Cruzar señales externas con datos propios", "Estimar relevancia por cuenta", "Preparar hipótesis y próximo paso"],
    human: ["Validar oportunidad comercial", "Definir inversión o foco", "Decidir activación"],
    signals: [
      { title: "Alta prioridad", detail: "Oportunidades con fit alto y ventana temporal activa.", status: "3" },
      { title: "Sin evidencia suficiente", detail: "Señales detectadas que todavía no justifican una acción.", status: "5" },
      { title: "Oportunidades convertidas", detail: "Hipótesis que terminaron en acción o propuesta concreta.", status: "2 este mes" },
    ],
  },
  aprendizajes: {
    flowTitle: "Learning Loop",
    flow: ["Feedback", "Patrón", "Propuesta", "Validación", "Aplicación", "Resultado"],
    automate: ["Detectar correcciones recurrentes", "Relacionar decisión con resultado", "Proponer actualización de criterio"],
    human: ["Validar conocimiento crítico", "Descartar falsos patrones", "Autorizar cambios en instrucciones"],
    signals: [
      { title: "Candidatos a memoria", detail: "Patrones repetidos listos para revisión humana.", status: "8" },
      { title: "Aprendizajes aplicados", detail: "Conocimiento activo que ya condiciona futuras ejecuciones.", status: "24" },
      { title: "Resultado posterior", detail: "Aprendizajes cuya utilidad está siendo medida.", status: "6" },
    ],
  },
  leads: {
    flowTitle: "Captación a oportunidad",
    flow: ["Ingreso", "Enriquecimiento", "Fit", "Prioridad", "Seguimiento", "Discovery"],
    automate: ["Normalizar datos de entrada", "Enriquecer empresa y origen", "Sugerir prioridad y siguiente contacto"],
    human: ["Validar fit estratégico", "Definir propuesta de valor", "Decidir descarte o avance"],
    signals: [
      { title: "Leads calientes", detail: "Oportunidades con fit alto, intención y timing detectados.", status: "4" },
      { title: "Sin próxima acción", detail: "Leads activos que podrían perderse por falta de seguimiento.", status: "2" },
      { title: "Discovery sugerido", detail: "Leads con información suficiente para iniciar relevamiento.", status: "3" },
    ],
  },
  discovery: {
    flowTitle: "Diagnóstico asistido",
    flow: ["Relevar", "Ordenar", "Diagnosticar", "Preguntar", "Priorizar", "Validar"],
    automate: ["Consolidar formularios, reuniones y documentos", "Separar hechos de inferencias", "Detectar problemas y oportunidades"],
    human: ["Validar diagnóstico", "Profundizar preguntas críticas", "Definir prioridades de intervención"],
    signals: [
      { title: "Información faltante", detail: "Datos necesarios para que el diagnóstico sea accionable.", status: "5 campos" },
      { title: "Oportunidades detectadas", detail: "Procesos o áreas con potencial de mejora relevante.", status: "9" },
      { title: "Hipótesis IA", detail: "Conclusiones aún no confirmadas por el equipo o cliente.", status: "4 validar" },
    ],
  },
  propuestas: {
    flowTitle: "Diagnóstico a alcance",
    flow: ["Problema", "Solución", "Alcance", "Etapas", "Inversión", "Aprobación"],
    automate: ["Traducir diagnóstico a solución", "Proponer entregables y fases", "Controlar consistencia entre alcance y discovery"],
    human: ["Precio e inversión", "Exclusiones y compromisos", "Versión final al cliente"],
    signals: [
      { title: "Alcance incompleto", detail: "Propuestas con dependencias o exclusiones todavía ambiguas.", status: "1" },
      { title: "Pendientes de dirección", detail: "Decisiones comerciales sensibles antes de enviar.", status: "2" },
      { title: "Reutilización segura", detail: "Bloques metodológicos reutilizados sin copiar contexto de otro cliente.", status: "Activo" },
    ],
  },
  integraciones: {
    flowTitle: "Capa de conectividad",
    flow: ["Conectar", "Autorizar", "Mapear", "Sincronizar", "Monitorear", "Recuperar"],
    automate: ["Sincronizar datos relevantes", "Reintentar errores idempotentes", "Alertar por credenciales o permisos vencidos"],
    human: ["Autorizar accesos", "Definir alcance de datos", "Resolver cambios de proveedor"],
    signals: [
      { title: "Conectores saludables", detail: "Integraciones que sincronizan dentro del SLA esperado.", status: "8/9" },
      { title: "Credencial a renovar", detail: "Acceso próximo a vencer o requerir reautorización.", status: "1" },
      { title: "Última sincronización", detail: "Visibilidad del origen y frescura de cada dato.", status: "< 15 min" },
    ],
  },
  agentes: {
    flowTitle: "Contrato de agente",
    flow: ["Objetivo", "Contexto", "Herramientas", "Límites", "Ejecución", "Evaluación"],
    automate: ["Ejecutar tareas acotadas", "Registrar inputs y outputs", "Escalar cuando falta contexto o permiso"],
    human: ["Definir objetivo y política", "Autorizar herramientas sensibles", "Revisar calidad y autonomía"],
    signals: [
      { title: "Tasa de aprobación", detail: "Outputs aceptados sin modificación o con ajustes menores.", status: "78%" },
      { title: "Escalaciones", detail: "Ejecuciones donde el agente decidió no continuar solo.", status: "6" },
      { title: "Costo por ejecución", detail: "Consumo medido por agente y tipo de tarea.", status: "Visible" },
    ],
  },
  workflows: {
    flowTitle: "Orquestación",
    flow: ["Trigger", "Datos", "Reglas", "Agente", "Aprobación", "Acción"],
    automate: ["Encadenar pasos y sistemas", "Controlar reintentos y estados", "Abrir atención humana cuando corresponde"],
    human: ["Diseñar reglas críticas", "Aprobar pasos sensibles", "Cambiar versiones productivas"],
    signals: [
      { title: "Ejecuciones exitosas", detail: "Workflows completados sin intervención ni error.", status: "94%" },
      { title: "Reintentos", detail: "Fallos transitorios absorbidos automáticamente.", status: "7 hoy" },
      { title: "Versiones activas", detail: "Cambios publicados con historial y posibilidad de rollback.", status: "12" },
    ],
  },
  guardrails: {
    flowTitle: "Política de autonomía",
    flow: ["Acción", "Riesgo", "Umbral", "Aprobación", "Ejecución", "Rollback"],
    automate: ["Bloquear acciones fuera de política", "Solicitar aprobación cuando supera umbral", "Registrar valores antes y después"],
    human: ["Definir límites económicos", "Autorizar acciones irreversibles", "Cambiar nivel de autonomía"],
    signals: [
      { title: "Acciones bloqueadas", detail: "Intentos que excedieron las reglas permitidas.", status: "3 este mes" },
      { title: "Aprobación obligatoria", detail: "Acciones sensibles esperando decisión humana.", status: "2" },
      { title: "Rollback disponible", detail: "Acciones recientes que pueden revertirse automáticamente.", status: "11" },
    ],
  },
  auditoria: {
    flowTitle: "Trazabilidad completa",
    flow: ["Evento", "Origen", "Actor", "Decisión", "Cambio", "Resultado"],
    automate: ["Registrar cada acción sensible", "Relacionar autorización y ejecución", "Conservar valores previos y posteriores"],
    human: ["Revisar incidentes", "Aprobar políticas de retención", "Resolver discrepancias"],
    signals: [
      { title: "Eventos trazados", detail: "Acciones, decisiones y cambios con actor y timestamp.", status: "100% sensibles" },
      { title: "Incidentes abiertos", detail: "Ejecuciones o datos que requieren investigación.", status: "0 críticos" },
      { title: "Historial de cambios", detail: "Versionado de reglas, contexto y automatizaciones.", status: "Activo" },
    ],
  },
};
