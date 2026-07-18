import { supabase } from "../lib/supabase";

import type { Campaign } from "../types/campaign";
import type { Office } from "../types/office";

/* ============================
   OFFICES
============================ */

export async function getOffices(): Promise<Office[]> {
  const { data, error } = await supabase
    .from("offices")
    .select("*")
    .order("level");

  if (error) throw error;

  return (data ?? []) as Office[];
}

/* ============================
   CAMPAIGNS
============================ */

export async function getCampaigns(): Promise<Campaign[]> {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Campaign[];
}

export async function getCampaign(id: number): Promise<Campaign | null> {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Campaign;
}

export async function createCampaign(campaign: {
  office_id: number;
  campaign_name: string;
  candidate_name: string;
  county_id: number | null;
  constituency_id: number | null;
  ward_id: number | null;
}) {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      office_id: campaign.office_id,

      campaign_name: campaign.campaign_name,

      candidate_name: campaign.candidate_name,

      county_id: campaign.county_id,

      constituency_id: campaign.constituency_id,

      ward_id: campaign.ward_id,

      active: true,

      approved: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateCampaign(id: number, updates: Partial<Campaign>) {
  const { data, error } = await supabase
    .from("campaigns")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function archiveCampaign(id: number) {
  const { error } = await supabase
    .from("campaigns")
    .update({
      active: false,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function activateCampaign(id: number) {
  const { error } = await supabase
    .from("campaigns")
    .update({
      active: true,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function approveCampaign(id: number) {
  const { error } = await supabase
    .from("campaigns")
    .update({
      approved: true,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function deleteCampaign(id: number) {
  const { error } = await supabase.from("campaigns").delete().eq("id", id);

  if (error) throw error;
}
