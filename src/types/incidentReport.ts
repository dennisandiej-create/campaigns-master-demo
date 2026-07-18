export interface IncidentReport {
  id: number;

  polling_station_id: number;

  polling_agent_id: number | null;

  incident_type: string;

  severity: string;

  description: string;

  status: string;

  reported_at: string;

  resolved_at: string | null;

  resolution_notes: string | null;

  created_at: string;
}
