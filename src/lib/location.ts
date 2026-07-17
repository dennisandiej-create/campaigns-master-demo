import { supabase } from "./supabase";

export async function getCounties() {
  const { data, error } = await supabase
    .from("counties")
    .select("*")
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getConstituencies(countyId: number) {
  const { data, error } = await supabase
    .from("constituencies")
    .select("*")
    .eq("county_id", countyId)
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getWards(constituencyId: number) {
  const { data, error } = await supabase
    .from("wards")
    .select("*")
    .eq("constituency_id", constituencyId)
    .order("name");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
