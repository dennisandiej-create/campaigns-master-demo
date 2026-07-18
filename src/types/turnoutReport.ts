export interface TurnoutReport {
  id: number;

  polling_station_id: number;

  polling_agent_id: number | null;

  report_time: string;

  voters_processed: number;

  turnout_percent: number;

  notes: string | null;

  created_at: string;
}
