import { supabase } from "../lib/supabase";
import type { IncidentReport } from "../types/incidentReport";

/* -----------------------------
   GET ALL INCIDENTS
------------------------------ */

export async function getIncidentReports(): Promise<IncidentReport[]> {
  const { data, error } = await supabase
    .from("incident_reports")
    .select("*")
    .order("reported_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as IncidentReport[];
}

/* -----------------------------
   CREATE INCIDENT
------------------------------ */

export async function addIncidentReport(
  report: Omit<IncidentReport, "id" | "created_at">,
): Promise<IncidentReport> {
  const { data, error } = await supabase
    .from("incident_reports")
    .insert(report)
    .select()
    .single();

  if (error) throw error;

  return data as IncidentReport;
}

/* -----------------------------
   UPDATE INCIDENT
------------------------------ */

export async function updateIncidentReport(
  id: number,
  report: Partial<Omit<IncidentReport, "id" | "created_at">>,
): Promise<IncidentReport> {
  const { data, error } = await supabase
    .from("incident_reports")
    .update(report)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as IncidentReport;
}

/* -----------------------------
   DELETE INCIDENT
------------------------------ */

export async function deleteIncidentReport(id: number): Promise<void> {
  const { error } = await supabase
    .from("incident_reports")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
