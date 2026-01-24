import { createClient } from '@supabase/supabase-js';


const URL = 'https://pcinnqtpitggcewrlxzx.supabase.co';
const API_KEY = 'sb_publishable_8KVFMnARc79h7j9B4lTX-w_5YDXVWy5';

export const supabase = createClient(URL, API_KEY);



