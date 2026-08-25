import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL as FILE_URL, SUPABASE_ANON_KEY as FILE_KEY } from '../../config.js';

const STORAGE_KEY = 'mf-supabase';

export function savedCreds() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

export function storeCreds(url, key) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ url, key }));
}

export function resolveCreds() {
  const saved = savedCreds();
  const url = (FILE_URL || saved?.url || '').trim();
  const key = (FILE_KEY || saved?.key || '').trim();
  return { url, key };
}

export function isConfigured() {
  const { url, key } = resolveCreds();
  return url.startsWith('https://') && key.length > 20;
}

let client;
export function getClient() {
  if (!isConfigured()) return null;
  if (client) return client;
  const { url, key } = resolveCreds();
  client = createClient(url, key);
  return client;
}

export function resetClient() {
  client = null;
}
