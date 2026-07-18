export interface PollingAgent {
  id: number;

  polling_station_id: number;

  full_name: string;

  phone: string;

  national_id: string | null;

  role: string;

  status: string;

  check_in_time: string | null;

  check_out_time: string | null;

  notes: string | null;

  created_at: string;

  updated_at: string;
}
