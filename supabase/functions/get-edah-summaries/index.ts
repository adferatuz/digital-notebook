import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Define las cabeceras CORS para permitir el acceso desde tu frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Manejar solicitudes OPTIONS (preflight de CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Crear el cliente de Supabase con la service_role_key
    // Esto permite leer datos sin restricciones de RLS (Row Level Security)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    // Obtener todos los formularios EDAH
    const { data: edahForms, error } = await supabaseClient
      .from('edah_forms')
      .select('test_id, student_info, created_at')

    if (error) {
      console.error('Error fetching edah forms:', error.message)
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    // Procesar los datos para crear un resumen por test_id
    const summariesMap = new Map<string, { student_name: string; last_evaluation_date: string; evaluators_count: number }>()

    edahForms.forEach((form) => {
      const { test_id, student_info, created_at } = form
      const studentName = student_info?.name || 'Desconocido'
      const evaluationDate = new Date(created_at).toISOString().split('T')[0] // Formato YYYY-MM-DD

      if (summariesMap.has(test_id)) {
        // Si ya existe una entrada para este test_id, actualiza la fecha y el contador
        const existingSummary = summariesMap.get(test_id)!
        existingSummary.evaluators_count += 1
        // Actualiza la fecha si esta es más reciente
        if (evaluationDate > existingSummary.last_evaluation_date) {
          existingSummary.last_evaluation_date = evaluationDate
        }
      } else {
        // Si no existe, crea una nueva entrada
        summariesMap.set(test_id, {
          student_name: studentName,
          last_evaluation_date: evaluationDate,
          evaluators_count: 1,
        })
      }
    })

    // Convertir el mapa a un array de objetos
    const summaries = Array.from(summariesMap.entries()).map(([test_id, summary]) => ({
      test_id,
      ...summary,
    }))

    // Devolver los resúmenes como respuesta JSON
    return new Response(JSON.stringify(summaries), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('Error in get-edah-summaries function:', err.message)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})