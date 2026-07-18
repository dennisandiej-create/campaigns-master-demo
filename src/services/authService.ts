import { supabase } from "../lib/supabase";

/* ===================================================
   SIGN IN
=================================================== */

export async function signIn(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw error;

  return data;
}

/* ===================================================
   SIGN OUT
=================================================== */

export async function signOut() {
  const { error } =
    await supabase.auth.signOut();

  if (error) throw error;
}

/* ===================================================
   SESSION
=================================================== */

export async function getSession() {
  const { data } =
    await supabase.auth.getSession();

  return data.session;
}

/* ===================================================
   CURRENT USER
=================================================== */

export async function getCurrentUser() {
  const { data } =
    await supabase.auth.getUser();

  return data.user;
}

/* ===================================================
   USER PROFILE
=================================================== */

export async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (error) throw error;

  return data;
}

/* ===================================================
   REQUIRE LOGIN
=================================================== */

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated.");
  }

  const profile =
    await getCurrentProfile();

  if (!profile) {
    throw new Error(
      "Profile not found."
    );
  }

  if (!profile.active) {
    throw new Error(
      "Account has been disabled."
    );
  }

  if (
    profile.approval_status !==
    "APPROVED"
  ) {
    throw new Error(
      "Account has not been approved."
    );
  }

  return profile;
}

/* ===================================================
   ROLE HELPERS
=================================================== */

export async function isSuperAdmin() {
  const profile =
    await getCurrentProfile();

  return profile?.role === "SUPER_ADMIN";
}

export async function isCampaignAdmin() {
  const profile =
    await getCurrentProfile();

  return (
    profile?.role ===
    "CAMPAIGN_ADMIN"
  );
}

export async function isCoordinator() {
  const profile =
    await getCurrentProfile();

  return (
    profile?.role ===
    "COORDINATOR"
  );
}

export async function isAgent() {
  const profile =
    await getCurrentProfile();

  return (
    profile?.role === "AGENT"
  );
}