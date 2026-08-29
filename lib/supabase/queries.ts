import { createClient } from "./client";
import { createServiceClient } from "./server";

export async function getProperties(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("properties").select("*").eq("status","published").order("sort_order");
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

export async function getExperiences(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("experiences").select("*").eq("status","published").order("order_index");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getExperienceBySlug(slug:string){
  try{
    const supabase=createClient();
    const { data }=await supabase.from("experiences").select("*").eq("slug",slug).single();
    return data;
  }catch{ return null; }
}

export async function getOffers(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("offers").select("*").eq("active",true).eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getOfferBySlug(slug:string){
  try{
    const supabase=createClient();
    const { data }=await supabase.from("offers").select("*").eq("slug",slug).single();
    return data;
  }catch{ return null; }
}

export async function getDiningVenues(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("dining_venues").select("*").eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getWellnessServices(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("wellness_services").select("*").eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getDestinations(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("destinations").select("*").eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getGalleryItems(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("gallery_items").select("*").eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getTestimonials(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("testimonials").select("*").eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getFAQs(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("faqs").select("*").eq("active",true).eq("status","published").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getStaff(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("staff").select("*").eq("status","active").order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getAmenities(){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("amenities").select("*").eq("active",true).order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getPropertyImages(propertyId:string){
  try{
    const supabase=createClient();
    const { data, error }=await supabase.from("property_images").select("*").eq("property_id",propertyId).order("sort_order");
    if(error || !data || data.length===0) return null;
    return data;
  }catch{ return null; }
}

export async function getHotelSettings(){
  try{
    const supabase=createServiceClient();
    const { data, error }=await supabase.from("hotel_settings").select("*");
    if(error || !data || data.length===0) return null;
    return data.reduce((acc, item) => { acc[item.key] = item.value; return acc; }, {});
  }catch{ return null; }
}
