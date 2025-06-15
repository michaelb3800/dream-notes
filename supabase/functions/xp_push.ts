import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.1'

serve(async (req) => {
  const { userId, amount } = await req.json()
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
  await supabase.from('xp_log').insert({ user_id: userId, amount })
  // send push notification using Supabase functions - stub
  return new Response('ok')
})
