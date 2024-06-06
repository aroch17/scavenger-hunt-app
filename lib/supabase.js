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

export const getTask = async (taskId) => {
  const { data, error, status } = await supabase
    .from("tasks")
    .select()
    .eq("id", taskId)
  if (error && status != "406") {
    throw error
  }
  return { data, error }
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

export const getSubmissions = async () => {
  const { data, error, status } = await supabase
    .from("submissions")
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

export const addSubmission = async (data) => {
  const { error } = await supabase
    .from("submissions")
    .insert(data)
  if (error) {
    console.log(error)
    throw error
  }
  return { error }
}

export const addHunt = async (huntData) => {
  const { data, error } = await supabase
    .from("hunts")
    .insert(huntData)
    .select()
  if (error) {
    throw error
  }
  return { data, error }
}

export const addTeam = async (teamData) => {
  const { data, error } = await supabase
    .from("teams")
    .insert(teamData)
    .select()
  if (error) {
    console.log(error)
    throw error
  }
  return { data, error }
}

export const getHunt = async (huntId) => {
  const { data, error, status } = await supabase
    .from("hunts")
    .select(`
      *,
      tasks (
        id,
        title,
        task_type
      ),
      teams (
        id,
        name
      ),
      announcements (
        id, 
        title,
        description
      ),
      submissions (
        id, 
        task_id,
        submission
      )
    `)
    .eq("id", stringToInt8(huntId))
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

export const getTeam = async (teamId) => {
  const { data, error, status } = await supabase
    .from("teams")
    .select()
    .eq("id", teamId)
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

export const getHunts = async (userId) => {
  const { data, error, status } = await supabase
    .from("hunts")
    .select()
    .eq("creator_id", userId)
  if (error && status != "406") {
    console.log(error)
    throw error
  }
  return { data, error }
}


export const getHuntIds = async () => {
  const { data, error, status } = await supabase
    .from("hunts")
    .select("id")
  if (error && status != "406") {
    console.log(error)
    throw error
  }
  return { data, error }
}



export const getTeams = async (huntId) => {
  const { data, error, status } = await supabase
    .from("teams")
    .select("name")
    .eq("hunt_id", stringToInt8(huntId))
  if (error && status != "406") {
    console.log(error)
    throw error
  }
  return { data, error }
}




function stringToInt8(str) {
  // Parse the string to a number
  const num = parseInt(str, 10);

  // Ensure the number is within the range of int8 (-128 to 127)
  if (num < -128 || num > 127) {
      throw new RangeError("Value out of bounds for int8");
  }

  // Create an Int8Array and set the value
  const int8 = new Int8Array(1);
  int8[0] = num;

  return int8[0];
}