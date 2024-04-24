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