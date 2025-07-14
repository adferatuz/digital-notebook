// src/services/mockEdahSummaries.js

/**
 * Datos simulados que representan un resumen de todas las evaluaciones EDAH.
 * Esto simula una llamada a una Edge Function que agrupa los resultados por test_id
 * para evitar duplicados en la lista de pacientes.
 */
export const mockEdahSummaries = [
  {
    test_id: "XYZ-789",
    student_name: "Juan Pérez",
    last_evaluation_date: "2025-07-11",
    evaluators_count: 2, // Simula que madre y padre llenaron el formulario
  },
  {
    test_id: "ABC-123",
    student_name: "María Rodríguez",
    last_evaluation_date: "2025-07-09",
    evaluators_count: 1, // Simula que solo un tutor llenó el formulario
  },
  {
    test_id: "LMN-456",
    student_name: "Carlos Sánchez",
    last_evaluation_date: "2025-07-12",
    evaluators_count: 1,
  },
];

// También necesitamos añadir los datos detallados para los nuevos pacientes
// en el mock original para que la navegación funcione.
export const newDetailedResults = [
    {
        id: "c3d4e5f6-a7b8-9012-3456-7890abcdef1",
        created_at: "2025-07-09T09:00:00.000Z",
        test_id: "ABC-123",
        student_info: {
            name: "María Rodríguez",
            age: "7",
            grade: "2° Básico",
            evaluator: "Luisa González (Madre)",
            date: "2025-07-09"
        },
        responses: { "1": 1, "2": 2, "3": 0, "4": 2, "5": 1, "6": 0, "7": 2, "8": 2, "9": 0, "10": 0, "11": 1, "12": 0, "13": 1, "14": 0, "15": 0, "16": 0, "17": 1, "18": 0, "19": 2, "20": 0 },
        scores: { H: 4, DA: 8, TC: 0, "H+DA": 12 },
        highest_score_scale: { scale: "DA", score: 8 },
        lowest_score_scale: { scale: "TC", score: 0 }
    },
    {
        id: "d4e5f6a7-b8c9-0123-4567-890abcdef2",
        created_at: "2025-07-12T14:00:00.000Z",
        test_id: "LMN-456",
        student_info: {
            name: "Carlos Sánchez",
            age: "9",
            grade: "4° Básico",
            evaluator: "Marta López (Profesora)",
            date: "2025-07-12"
        },
        responses: { "1": 2, "2": 1, "3": 1, "4": 1, "5": 2, "6": 1, "7": 1, "8": 1, "9": 1, "10": 1, "11": 2, "12": 1, "13": 2, "14": 1, "15": 1, "16": 1, "17": 2, "18": 1, "19": 1, "20": 1 },
        scores: { H: 8, DA: 4, TC: 8, "H+DA": 12 },
        highest_score_scale: { scale: "H", score: 8 }, // Empate, se elige uno
        lowest_score_scale: { scale: "DA", score: 4 }
    }
];
