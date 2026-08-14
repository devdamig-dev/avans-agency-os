"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type Entity = "leads" | "clients" | "tasks";
const paths: Record<Entity,string> = { leads:"/leads", clients:"/clientes", tasks:"/tareas" };

async function organizationId() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Sesión requerida");
  const { data } = await supabase.from("organization_members").select("organization_id").eq("user_id", user.id).single();
  if (!data) throw new Error("El usuario no pertenece a una organización");
  return { supabase, organization_id: data.organization_id };
}

/** Server-only mutation boundary. RLS remains the final authorization layer. */
export async function createRecord(entity: Entity, values: Record<string, unknown>) {
  if (!isSupabaseConfigured()) return { demo: true };
  const { supabase, organization_id } = await organizationId();
  const { error } = await supabase.from(entity).insert({ ...values, organization_id });
  if (error) throw error; revalidatePath(paths[entity]); return { demo: false };
}
export async function updateRecord(entity: Entity, id: string, values: Record<string, unknown>) {
  if (!isSupabaseConfigured()) return { demo: true };
  const { supabase, organization_id } = await organizationId();
  const { error } = await supabase.from(entity).update(values).eq("id", id).eq("organization_id", organization_id);
  if (error) throw error; revalidatePath(paths[entity]); return { demo: false };
}
export async function deleteRecord(entity: Entity, id: string) {
  if (!isSupabaseConfigured()) return { demo: true };
  const { supabase, organization_id } = await organizationId();
  const { error } = await supabase.from(entity).delete().eq("id", id).eq("organization_id", organization_id);
  if (error) throw error; revalidatePath(paths[entity]); return { demo: false };
}
