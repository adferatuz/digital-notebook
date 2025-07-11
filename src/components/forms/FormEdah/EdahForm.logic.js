// Datos del formulario EDAH basados en el JSON proporcionado
export const edahQuestions = {
  "1": { "pregunta": "Tiene excesiva inquietud motora", "escala": "H" },
  "2": { "pregunta": "Tiene dificultades de aprendizaje escolar", "escala": "DA" },
  "3": { "pregunta": "Molesta frecuentemente a otros niños", "escala": "TC" },
  "4": { "pregunta": "Se distrae fácilmente, muestra escasa atención", "escala": "DA" },
  "5": { "pregunta": "Exige inmediata satisfacción a sus demandas", "escala": "H" },
  "6": { "pregunta": "Tiene dificultad para las actividades cooperativas", "escala": "TC" },
  "7": { "pregunta": "Está en las nubes, ensimismado", "escala": "DA" },
  "8": { "pregunta": "Deja por terminar las tareas que empieza", "escala": "DA" },
  "9": { "pregunta": "Es mal aceptado por el grupo", "escala": "TC" },
  "10": { "pregunta": "Niega sus errores o echa la culpa a otros", "escala": "TC" },
  "11": { "pregunta": "A menudo grita en situaciones inadecuadas", "escala": "H" },
  "12": { "pregunta": "Es contestón", "escala": "TC" },
  "13": { "pregunta": "Se mueve constantemente, intranquilo", "escala": "H" },
  "14": { "pregunta": "Discute y pelea por cualquier cosa", "escala": "TC" },
  "15": { "pregunta": "Tiene explosiones impredecibles de mal genio", "escala": "TC" },
  "16": { "pregunta": "Le falta sentido de la regla, del 'juego limpio'", "escala": "TC" },
  "17": { "pregunta": "Es impulsivo", "escala": "H" },
  "18": { "pregunta": "Se lleva mal con la mayoría de sus compañeros", "escala": "TC" },
  "19": { "pregunta": "Sus esfuerzos se frustran fácilmente, se desanima", "escala": "DA" },
  "20": { "pregunta": "Acepta mal las indicaciones del profesor", "escala": "TC" }
};

// Configuración de escalas
export const scaleLabels = {
  0: 'Nada',
  1: 'Poco',
  2: 'Bastante',
  3: 'Mucho'
};

export const scaleTypes = {
  H: 'Hiperactividad/Impulsividad',
  DA: 'Déficit de Atención',
  TC: 'Trastorno de Conducta'
};
