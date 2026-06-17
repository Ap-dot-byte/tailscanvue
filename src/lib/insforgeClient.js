import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_INSFORGE_URL
const supabaseAnonKey = import.meta.env.VITE_INSFORGE_KEY
export const insforge = createClient(supabaseUrl, supabaseAnonKey)