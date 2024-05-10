import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://psdsdmptskceretwhxxt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZHNkbXB0c2tjZXJldHdoeHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNDY2MjYsImV4cCI6MjAzMDkyMjYyNn0.rcjbUanRks8Jn1uuqMNyjiEQ_5A1--iE4e053QtrJdI"

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

export const getTasks = async () => {
  const { data, error, status } = await supabase
    .from("tasks")
    .select()
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

export const addTask = async (data) => {
  const { error } = await supabase
    .from("tasks")
    .insert(data)
  if (error) {
    console.log(error)
    throw error
  }
  return { error }
}