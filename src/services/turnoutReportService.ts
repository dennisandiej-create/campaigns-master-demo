import { supabase } from "../lib/supabase";
import type { TurnoutReport } from "../types/turnoutReport";

export async function getTurnoutReports(): Promise<TurnoutReport[]> {
  const { data, error } = await supabase
    .from("turnout_reports")
    .select("*")
    .order("report_time", { ascending: false });

  if (error) throw error;

  return (data ?? []) as TurnoutReport[];
}

export async function addTurnoutReport(
  report: Omit<TurnoutReport, "id" | "created_at">,
): Promise<TurnoutReport> {
  const { data, error } = await supabase
    .from("turnout_reports")
    .insert(report)
    .select()
    .single();

  if (error) throw error;

  return data as TurnoutReport;
}

export async function deleteTurnoutReport(id: number): Promise<void> {
  const { error } = await supabase
    .from("turnout_reports")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
