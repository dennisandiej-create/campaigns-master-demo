export interface Campaign {
  id: number;

  office_id: number;

  campaign_name: string;

  candidate_name: string;

  phone: string | null;

  email: string | null;

  county_id: number | null;

  constituency_id: number | null;

  ward_id: number | null;

  active: boolean;

  approved: boolean;

  created_by: number | null;

  approved_by: number | null;

  created_at: string;

  updated_at: string;
}
