import { supabase } from './client';

export async function signUp(email, password, fullName, companyName) {
  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw authError;
  }

  // Create company
  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .insert([
      { name: companyName },
    ])
    .select()
    .single();

  if (companyError) {
    throw companyError;
  }

  // Update profile with company ID and full name
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      company_id: companyData.id,
      role: 'admin',
    })
    .eq('id', authData.user.id);

  if (profileError) {
    throw profileError;
  }

  return { user: authData.user, company: companyData };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, companies(*)')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
