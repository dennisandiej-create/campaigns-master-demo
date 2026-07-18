export interface Volunteer {
  id: number;

  polling_station_id: number;

  full_name: string;

  phone: string;

  email: string | null;

  id_number: string | null;

  role: string;

  status: string;

  date_joined: string;

  notes: string | null;

  created_at: string;

  updated_at: string;
}
