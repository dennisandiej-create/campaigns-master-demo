import { supabase } from "../lib/supabase";
import type { PollingAgent } from "../types/pollingAgent";

/* -----------------------------
   GET ALL POLLING AGENTS
------------------------------ */

export async function getPollingAgents(): Promise<PollingAgent[]> {
  const { data, error } = await supabase
    .from("polling_agents")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;

  return (data ?? []) as PollingAgent[];
}

/* -----------------------------
   GET SINGLE POLLING AGENT
------------------------------ */

export async function getPollingAgent(
  id: number,
): Promise<PollingAgent | null> {
  const { data, error } = await supabase
    .from("polling_agents")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as PollingAgent;
}

/* -----------------------------
   CREATE POLLING AGENT
------------------------------ */

export async function addPollingAgent(
  agent: Omit<PollingAgent, "id" | "created_at" | "updated_at">,
): Promise<PollingAgent> {
  const { data, error } = await supabase
    .from("polling_agents")
    .insert(agent)
    .select()
    .single();

  if (error) throw error;

  return data as PollingAgent;
}

/* -----------------------------
   UPDATE POLLING AGENT
------------------------------ */

export async function updatePollingAgent(
  id: number,
  agent: Partial<Omit<PollingAgent, "id" | "created_at" | "updated_at">>,
): Promise<PollingAgent> {
  const { data, error } = await supabase
    .from("polling_agents")
    .update(agent)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as PollingAgent;
}

/* -----------------------------
   DELETE POLLING AGENT
------------------------------ */

export async function deletePollingAgent(id: number): Promise<void> {
  const { error } = await supabase.from("polling_agents").delete().eq("id", id);

  if (error) throw error;
}
