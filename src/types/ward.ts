export interface Ward {
  id: number;
  constituency_id: number;

  name: string;

  ward_code: string | null;

  registered_voters: number;

  target_votes: number;

  coordinator: string | null;

  phone: string | null;

  notes: string | null;

  created_at: string;

  updated_at: string;
}
