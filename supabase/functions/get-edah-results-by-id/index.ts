import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.2'

Deno.serve(async (req) => {
  // Define CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // This should be your frontend URL in production, e.g., 'http://localhost:5173' or 'https://your-vercel-app.vercel.app'
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders,
    });
  }

  // Ensure it's a POST request for the actual data fetching
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });
  }

  const { testId } = await req.json();

  if (!testId) {
    return new Response(JSON.stringify({ error: 'testId is required' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const { data, error } = await supabaseClient
    .from('edah_forms')
    .select('*')
    .eq('test_id', testId)
    .order('created_at', { ascending: true }); // Ordenar por fecha de creación

  if (error) {
    console.error('Error fetching EDAH results by ID:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  });
});