export interface PollingStation {
  id: number;

  ward_id: number;

  name: string;

  station_code: string | null;

  registered_voters: number;

  target_votes: number;

  presiding_agent: string | null;

  phone: string | null;

  latitude: number | null;

  longitude: number | null;

  notes: string | null;

  created_at: string;

  updated_at: string;
}
