import { supabase } from "../lib/supabase";
import type { Contact } from "../types/contact";

/* -----------------------------
   GET ALL CONTACTS
------------------------------ */

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;

  return (data ?? []) as Contact[];
}

/* -----------------------------
   GET SINGLE CONTACT
------------------------------ */

export async function getContact(id: number): Promise<Contact | null> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Contact;
}

/* -----------------------------
   CREATE CONTACT
------------------------------ */

export async function addContact(
  contact: Omit<Contact, "id" | "created_at" | "updated_at">,
): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .insert(contact)
    .select()
    .single();

  if (error) throw error;

  return data as Contact;
}

/* -----------------------------
   UPDATE CONTACT
------------------------------ */

export async function updateContact(
  id: number,
  contact: Partial<Omit<Contact, "id" | "created_at" | "updated_at">>,
): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Contact;
}

/* -----------------------------
   DELETE CONTACT
------------------------------ */

export async function deleteContact(id: number): Promise<void> {
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) throw error;
}
