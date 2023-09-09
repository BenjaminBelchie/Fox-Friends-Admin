import { env } from '~/env.mjs';

// Default to production bucket prefix
export const supabaseProductImagePrefix = env.NEXT_PUBLIC_SUPABASE_BUCKET_PREFIX
  ? env.NEXT_PUBLIC_SUPABASE_BUCKET_PREFIX
  : 'https://gsdqcjtotybgudvdlkvd.supabase.co/storage/v1/object/public/images/';
