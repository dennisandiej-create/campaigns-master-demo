import { supabase } from "../lib/supabase";
import type { Ward } from "../types/ward";

/* -----------------------------
   GET ALL WARDS
------------------------------ */

export async function getWards(): Promise<Ward[]> {
  const { data, error } = await supabase
    .from("wards")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;

  return (data ?? []) as Ward[];
}

/* -----------------------------
   CREATE WARD
------------------------------ */

export async function addWard(
  ward: Omit<Ward, "id" | "created_at" | "updated_at">,
): Promise<Ward> {
  const { data, error } = await supabase
    .from("wards")
    .insert(ward)
    .select()
    .single();

  if (error) throw error;

  return data as Ward;
}

/* -----------------------------
   UPDATE WARD
------------------------------ */

export async function updateWard(
  id: number,
  ward: Partial<Omit<Ward, "id" | "created_at" | "updated_at">>,
): Promise<Ward> {
  const { data, error } = await supabase
    .from("wards")
    .update(ward)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Ward;
}

/* -----------------------------
   DELETE WARD
------------------------------ */

export async function deleteWard(id: number): Promise<void> {
  const { error } = await supabase.from("wards").delete().eq("id", id);

  if (error) throw error;
}

/* -----------------------------
   GET SINGLE WARD
------------------------------ */

export async function getWard(id: number): Promise<Ward | null> {
  const { data, error } = await supabase
    .from("wards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Ward;
}
