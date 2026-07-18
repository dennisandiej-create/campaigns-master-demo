export interface Contact {
  id: number;

  county_id: number | null;

  constituency_id: number | null;

  ward_id: number | null;

  polling_station_id: number | null;

  full_name: string;

  phone: string;

  email: string | null;

  category: string;

  support_level: string;

  tags: string | null;

  last_contact: string | null;

  notes: string | null;

  created_at: string;

  updated_at: string;
}
