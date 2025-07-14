
// src/services/mockEdahResults.js

/**
 * Datos simulados para los resultados del formulario EDAH.
 * Simula la respuesta que la Edge Function de Supabase devolvería
 * para un testId específico. Puede contener múltiples entradas si varios
 * tutores llenaron el formulario para el mismo paciente.
 */
export const mockEdahResults = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    created_at: "2025-07-11T10:00:00.000Z",
    test_id: "XYZ-789",
    student_info: {
      name: "Juan Pérez",
      age: "8",
      grade: "3° Básico",
      evaluator: "Ana García (Madre)",
      date: "2025-07-10"
    },
    responses: {
      "1": 3, "2": 1, "3": 2, "4": 2, "5": 3,
      "6": 1, "7": 2, "8": 2, "9": 1, "10": 0,
      "11": 3, "12": 1, "13": 3, "14": 2, "15": 1,
      "16": 0, "17": 3, "18": 1, "19": 2, "20": 1
    },
    scores: {
      H: 15,
      DA: 7,
      TC: 6,
      "H+DA": 22
    },
    highest_score_scale: {
      scale: "H",
      score: 15
    },
    lowest_score_scale: {
      scale: "TC",
      score: 6
    }
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
    created_at: "2025-07-11T11:30:00.000Z",
    test_id: "XYZ-789",
    student_info: {
      name: "Juan Pérez",
      age: "8",
      grade: "3° Básico",
      evaluator: "Carlos Pérez (Padre)",
      date: "2025-07-11"
    },
    responses: {
      "1": 2, "2": 2, "3": 1, "4": 3, "5": 2,
      "6": 0, "7": 3, "8": 3, "9": 0, "10": 0,
      "11": 2, "12": 0, "13": 2, "14": 1, "15": 0,
      "16": 0, "17": 2, "18": 0, "19": 3, "20": 0
    },
    scores: {
      H: 10,
      DA: 11,
      TC: 2,
      "H+DA": 21
    },
    highest_score_scale: {
      scale: "DA",
      score: 11
    },
    lowest_score_scale: {
      scale: "TC",
      score: 2
    }
  },
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
      highest_score_scale: { scale: "H", score: 8 },
      lowest_score_scale: { scale: "DA", score: 4 }
  }
];
