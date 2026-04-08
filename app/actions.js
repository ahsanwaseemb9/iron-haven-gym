'use server'

import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

/** * 1. THE LOGIN DOOR (For existing members) 
 */
export async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Access Denied: Invalid credentials." };
  }

  // Once the "Key" (Cookie) is set, send them to the Vault
  redirect('/profile');
}

/** * 2. THE SIGNUP DOOR (For new recruits) 
 */
export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: "Account Created. You can now Sign In." };
}

/** * 3. THE EXIT DOOR (Logout) 
 */
export async function logout() {
  await supabase.auth.signOut();
  redirect('/login');
}

/** * 4. THE LEAD GENERATOR (Landing Page Email Form) 
 */
export async function saveLead(prevState, formData) {
  const email = formData.get('email');

  if (!email || !email.includes('@')) {
    return { error: "Please enter a valid elite-tier email." };
  }

  const { error } = await supabase.from('leads').insert([{ email }]);

  if (error) {
    if (error.code === '23505') return { error: "Already on the roster." };
    return { error: "System error. Try again." };
  }

  return { success: true };
}

/** * 5. THE WORKOUT LOG (Member Activity) 
 */
export async function logWorkout(prevState, formData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Session expired. Please re-login." };

  const exercise_name = formData.get('exercise_name');
  const duration = formData.get('duration');
  const intensity = formData.get('intensity');
  const calories = parseInt(formData.get('calories') || "0");

  const { error } = await supabase.from('workouts').insert([
    { user_id: user.id, exercise_name, duration, intensity, calories }
  ]);

  if (error) return { error: "Failed to save the lift." };
  redirect('/profile');
}

/** * 6. THE FEEDBACK (Member Testimonials) 
 */
export async function submitReview(prevState, formData) {
  const { error } = await supabase.from('testimonials').insert([
    { 
      full_name: formData.get('full_name'), 
      role: formData.get('role'), 
      content: formData.get('content'), 
      rating: parseInt(formData.get('rating') || "5") 
    }
  ]);

  if (error) return { error: "Feedback rejected." };
  return { success: true };
}