import { supabase } from "../lib/supabase";
import type { PollingStation } from "../types/pollingStation";

/* -----------------------------
   GET ALL POLLING STATIONS
------------------------------ */

export async function getPollingStations(): Promise<PollingStation[]> {
  const { data, error } = await supabase
    .from("polling_stations")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;

  return (data ?? []) as PollingStation[];
}

/* -----------------------------
   GET ONE POLLING STATION
------------------------------ */

export async function getPollingStation(
  id: number,
): Promise<PollingStation | null> {
  const { data, error } = await supabase
    .from("polling_stations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as PollingStation;
}

/* -----------------------------
   CREATE POLLING STATION
------------------------------ */

export async function addPollingStation(
  station: Omit<PollingStation, "id" | "created_at" | "updated_at">,
): Promise<PollingStation> {
  const { data, error } = await supabase
    .from("polling_stations")
    .insert(station)
    .select()
    .single();

  if (error) throw error;

  return data as PollingStation;
}

/* -----------------------------
   UPDATE POLLING STATION
------------------------------ */

export async function updatePollingStation(
  id: number,
  station: Partial<Omit<PollingStation, "id" | "created_at" | "updated_at">>,
): Promise<PollingStation> {
  const { data, error } = await supabase
    .from("polling_stations")
    .update(station)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as PollingStation;
}

/* -----------------------------
   DELETE POLLING STATION
------------------------------ */

export async function deletePollingStation(id: number): Promise<void> {
  const { error } = await supabase
    .from("polling_stations")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
