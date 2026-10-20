import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

let supabaseConfigError = '';

if (Boolean(supabaseUrl) !== Boolean(supabaseAnonKey)) {
  supabaseConfigError = 'Nastav obě proměnné VITE_SUPABASE_URL a VITE_SUPABASE_ANON_KEY.';
} else if (supabaseUrl) {
  try {
    const projectUrl = new URL(supabaseUrl);
    if (projectUrl.protocol !== 'https:') {
      supabaseConfigError = 'VITE_SUPABASE_URL musí být HTTPS Project URL tvého Supabase projektu.';
    } else if (projectUrl.hostname === 'supabase.com' || projectUrl.hostname.endsWith('.supabase.com')) {
      supabaseConfigError = 'VITE_SUPABASE_URL je adresa webu Supabase. Použij Project URL projektu, obvykle https://<project-ref>.supabase.co.';
    }
  } catch {
    supabaseConfigError = 'VITE_SUPABASE_URL není platná URL. Použij Project URL z nastavení Supabase projektu.';
  }
}

export { supabaseConfigError };

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseConfigError);
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
