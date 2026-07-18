import { supabase } from "../lib/supabase";
import type { Volunteer } from "../types/volunteer";

/* -----------------------------
   GET ALL VOLUNTEERS
------------------------------ */

export async function getVolunteers(): Promise<Volunteer[]> {
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;

  return (data ?? []) as Volunteer[];
}

/* -----------------------------
   GET SINGLE VOLUNTEER
------------------------------ */

export async function getVolunteer(id: number): Promise<Volunteer | null> {
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Volunteer;
}

/* -----------------------------
   CREATE VOLUNTEER
------------------------------ */

export async function addVolunteer(
  volunteer: Omit<Volunteer, "id" | "created_at" | "updated_at">,
): Promise<Volunteer> {
  const { data, error } = await supabase
    .from("volunteers")
    .insert(volunteer)
    .select()
    .single();

  if (error) throw error;

  return data as Volunteer;
}

/* -----------------------------
   UPDATE VOLUNTEER
------------------------------ */

export async function updateVolunteer(
  id: number,
  volunteer: Partial<Omit<Volunteer, "id" | "created_at" | "updated_at">>,
): Promise<Volunteer> {
  const { data, error } = await supabase
    .from("volunteers")
    .update(volunteer)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Volunteer;
}

/* -----------------------------
   DELETE VOLUNTEER
------------------------------ */

export async function deleteVolunteer(id: number): Promise<void> {
  const { error } = await supabase.from("volunteers").delete().eq("id", id);

  if (error) throw error;
}
