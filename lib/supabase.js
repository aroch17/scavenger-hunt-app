import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bnclavuutowqagwoxhvc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuY2xhdnV1dG93cWFnd294aHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MjE0NzIsImV4cCI6MjAyOTQ5NzQ3Mn0.zOPthEss0PLIk0EL56CAReP-SumqU5q0IKiftGC1JsY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (data.session) {
    const { user } = data.session
    return { user, error }
  }
  else {
    // no signed in user
    return { user: null, error }
  }
}

export const getCurrentUserDetails = async (user) => {
  const { data, error, status } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single()
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

// custom SMTP for sign up


// delete all these functions in the future, call directly from login/logout component
export const signInUser = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return { data, error }
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  return error
}