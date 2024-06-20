import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid'
import { decode } from 'base64-arraybuffer';
import * as Crypto from 'expo-crypto';

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


export const getTasks = async (huntId) => {
  const { data, error, status } = await supabase
    .from("tasks")
    .select()
    .eq("hunt_id", huntId)
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

export const getSubmissions = async (huntId) => {
  const { data, error, status } = await supabase
    .from("submissions")
    .select()
    .eq("hunt_id", huntId)
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}

export const getTeamSubmissions = async (huntId, teamId) => {
  const { data, error, status } = await supabase
    .from("submissions")
    .select()
    .eq("hunt_id", huntId)
    .eq("team_id", teamId)
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
  const hashedPassword = await hashPassword(teamData.password)
  teamData.password = hashedPassword

  const { data, error } = await supabase
    .from("teams")
    .insert(teamData)
    .select()
  if (error) {
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
        team_id, 
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
    .select(`
      *,
      submissions (
          id, 
          task_id,
          team_id, 
          submission
      )
    `)
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

export const getAnnouncements = async (huntId) => {
  const { data, error, status } = await supabase
    .from("announcements")
    .select()
    .eq("hunt_id", huntId)
  if (error && status != "406") {
    throw error
  }
  return { data, error }
}


export const addAnnouncement = async (data) => {
  const { error } = await supabase
    .from("announcements")
    .insert(data)
  if (error) {
    console.log(error)
    throw error
  }
  return { error }
}


export const getHuntIdFromCode = async (huntCode) => {
  const { data, error, status } = await supabase
    .from("hunts")
    .select("id")
    .eq("hunt_code", huntCode)
  if (error && status != "406") {
    console.log(error)
    throw error
  }
  return { data, error }
}

export const getHuntCodes = async () => {
  const { data, error, status } = await supabase
    .from("hunts")
    .select("hunt_code")
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

export const addSubmissionImgPathtoDB = async (data) => {
  const { error } = await supabase
    .from("photopaths")
    .insert(data)
  if (error) {
    console.log(error)
    throw error
  }
  return { error }
}

export const uploadSubmissionAndStoreInDB = async (huntId, teamId, submission) => {
  const id = uuidv4()
  const { data, error } = await supabase
    .storage
    .from("submissions")
    .upload(huntId + "/" + teamId + "/" + id, decode(submission), {
      contentType: 'image/jpg'
    })

  const imgData = {
    "uuid": id,
    "hunt_id": huntId,
    "team_id": teamId
  }

  await addSubmissionImgPathtoDB(imgData)

  if (error) {
    console.log(error)
    throw error
  }
}

export const getHuntPhotoPaths = async (huntId) => {
  const { data, error, status } = await supabase
    .from("photopaths")
    .select()
    .eq("hunt_id", huntId)
  if (error && status != "406") {
    console.log(error)
    throw error
  }
  return { data, error }
}

export const hashPassword = async (password) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return digest
}

export const verifyPassword = async (enteredPassword, correctPasswordHash) => {
  const hashedEnteredPassword = await hashPassword(enteredPassword)
  return hashedEnteredPassword === correctPasswordHash
}