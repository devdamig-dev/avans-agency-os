"use server";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
export async function login(formData:FormData){
  if(!isSupabaseConfigured()) redirect("/dashboard?demo=1");
  const supabase=await createClient();
  const {error}=await supabase.auth.signInWithPassword({email:String(formData.get("email")),password:String(formData.get("password"))});
  if(error) redirect(`/login?error=${encodeURIComponent(error.message)}`); redirect("/dashboard");
}
