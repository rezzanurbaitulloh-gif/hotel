
import { createClient } from "./client";
import { createServiceClient } from "./server";

export async function getProperties(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("properties").select("*").eq("status","published").order("price");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}
export async function getPropertyBySlug(slug:string){
  try{
    const supabase=createClient();
    const { data }=await supabase.from("properties").select("*").eq("slug",slug).single();
    return data;
  }catch{ return null; }
}
