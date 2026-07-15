import { supabase } from "./supabase";

export async function getContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("full_name");

  if (error) throw error;
  return data ?? [];
}

export async function addContact(contact: any) {
  const { data, error } = await supabase
    .from("contacts")
    .insert(contact)
    .select();

  if (error) throw error;
  return data;
}

export async function updateContact(id: number, contact: any) {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteContact(id: number) {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function importContacts(rows: any[]) {
  const contacts = rows.map((row) => ({
    full_name:
      row.full_name ??
      row["Full Name"] ??
      row["Name"] ??
      "",

    phone:
      row.phone ??
      row["Phone"] ??
      row["Phone Number"] ??
      "",

    county:
      row.county ??
      row["County"] ??
      "",

    constituency:
      row.constituency ??
      row["Constituency"] ??
      "",

    ward:
      row.ward ??
      row["Ward"] ??
      "",

    polling_station:
      row.polling_station ??
      row["Polling Station"] ??
      row["Polling"] ??
      "",

    supporter:
      row.supporter === true ||
      row.Supporter === true ||
      row.supporter === "Yes" ||
      row.Supporter === "Yes",
  }));

  const { error } = await supabase
    .from("contacts")
    .insert(contacts);

  if (error) throw error;
}

export async function getVolunteers() {
  const { data, error } = await supabase
    .from("volunteers")
    .select("*")
    .order("full_name");

  if (error) throw error;
  return data ?? [];
}

export async function getCampaignEvents() {
  const { data, error } = await supabase
    .from("campaign_events")
    .select("*")
    .order("event_date");

  if (error) throw error;
  return data ?? [];
}

export async function getBroadcasts() {
  const { data, error } = await supabase
    .from("broadcasts")
    .select("*");

  if (error) throw error;
  return data ?? [];
}

export async function getReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("generated_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getDashboardStats() {
  const [contacts, volunteers, events, broadcasts] =
    await Promise.all([
      getContacts(),
      getVolunteers(),
      getCampaignEvents(),
      getBroadcasts(),
    ]);

  return {
    contacts: contacts.length,
    supporters: contacts.filter(
      (c: any) => c.supporter
    ).length,

    volunteers: volunteers.length,

    activeVolunteers: volunteers.filter(
      (v: any) => v.status === "Active"
    ).length,

    events: events.length,

    activeEvents: events.filter(
      (e: any) => e.status === "Active"
    ).length,

    broadcasts: broadcasts.length,
  };
}
export async function exportContacts() {
  return await getContacts();
}
export async function addVolunteer(volunteer: any) {

  const { data, error } = await supabase
    .from("volunteers")
    .insert(volunteer)
    .select();

  if (error) throw error;

  return data;

}