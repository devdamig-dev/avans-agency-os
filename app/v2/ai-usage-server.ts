import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { makeDemoSnapshot, type AiUsageBudget, type AiUsageEvent, type AiUsageSnapshot } from "./ai-usage-data";

/**
 * All financial data stays on the server. Preview mode is synthetic and explicit;
 * a configured database never silently falls back to fictitious financial data.
 */
export async function getAiUsageSnapshot(): Promise<AiUsageSnapshot> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return makeDemoSnapshot();

  try {
    const store = await cookies();
    const db = createServerClient(url, key, {
      cookies: {
        getAll: () => store.getAll(),
        setAll: () => { /* This component reads sessions; refresh cookies in middleware. */ },
      },
    });

    const { data: { user }, error: authError } = await db.auth.getUser();
    if (authError || !user) return { mode: "forbidden", events: [], budgets: [], note: "Iniciá sesión con tu cuenta corporativa para consultar costos internos." };

    const { data: membership, error: membershipError } = await db
      .from("organization_members").select("organization_id,role")
      .eq("user_id", user.id).in("role", ["admin", "finance"]).limit(1).maybeSingle();
    if (membershipError) return { mode: "unavailable", events: [], budgets: [], note: "No se pudieron verificar los permisos de la organización." };
    if (!membership) return { mode: "forbidden", events: [], budgets: [], note: "Esta información está restringida a Gerencia/Administración autorizada." };

    const start = new Date(Date.now() - 90 * 86400000).toISOString();
    const monthStart = new Date().toISOString().slice(0, 7) + "-01";
    const [usage, budgets] = await Promise.all([
      db.from("ai_usage_events")
        .select("id,occurred_at,area,activity,provider,model,modality,input_tokens,output_tokens,units_generated,units_approved,attempts,cost_usd,minutes_saved,cost_source")
        .eq("organization_id", membership.organization_id)
        .gte("occurred_at", start).order("occurred_at", { ascending: false }).limit(2000),
      db.from("ai_usage_budgets")
        .select("area,monthly_limit_usd")
        .eq("organization_id", membership.organization_id).eq("month_start", monthStart),
    ]);
    if (usage.error || budgets.error) {
      return { mode: "unavailable", events: [], budgets: [], note: "La telemetría todavía no está disponible. Revisá la migración y la conexión Supabase." };
    }
    return {
      mode: "live",
      events: (usage.data ?? []) as AiUsageEvent[],
      budgets: (budgets.data ?? []) as AiUsageBudget[],
      note: (usage.data?.length ?? 0) === 2000
        ? "Cobertura parcial: se muestran los últimos 2.000 eventos. Requiere agregación paginada."
        : "Datos registrados en Avans OS. Los costos estimados se identifican separadamente de los facturados.",
    };
  } catch {
    return { mode: "unavailable", events: [], budgets: [], note: "No se pudo consultar la base de datos. No se muestran importes sin verificar." };
  }
}
