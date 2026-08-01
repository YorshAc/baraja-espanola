// Configuración de todas las tiradas disponibles
const tiradas = {
  respuestaRapida: {
    id: 'respuesta-rapida',
    nombre: 'Respuesta Rápida',
    descripcion: 'Tirada simple de 3 cartas para una respuesta directa',
    cartas: 3,
    posiciones: ['Pasado', 'Presente', 'Futuro'],
    disposicion: 'linea-horizontal'
  },
  
  cruzDelConsejo: {
    id: 'cruz-del-consejo',
    nombre: 'Cruz del Consejo',
    descripcion: 'Tirada en cruz de 5 cartas para análisis completo',
    cartas: 5,
    posiciones: ['Pasado', 'Presente', 'Futuro', 'Lo Positivo', 'Lo Negativo'],
    disposicion: 'cruz'
  },
  
  pasadoPresenteFuturo: {
    id: 'pasado-presente-futuro',
    nombre: 'Pasado Presente Futuro',
    descripcion: 'Tirada de 7 cartas para análisis temporal detallado',
    cartas: 7,
    posiciones: [
      'Pasado Lejano', 
      'Pasado Intermedio', 
      'Pasado Inmediato', 
      'Presente', 
      'Futuro Inmediato', 
      'Futuro Intermedio', 
      'Futuro Lejano'
    ],
    disposicion: 'tres-filas'
  },
  
  lecturaDelPensamiento: {
    id: 'lectura-del-pensamiento',
    nombre: 'Lectura del Pensamiento',
    descripcion: 'Tirada completa de 12 cartas para análisis profundo',
    cartas: 12,
    posiciones: [
      'Pensamiento 1', 'Pensamiento 2', 'Pensamiento 3',
      'Pasado 1', 'Pasado 2', 'Pasado 3',
      'Presente 1', 'Presente 2', 'Presente 3',
      'Futuro 1', 'Futuro 2', 'Futuro 3'
    ],
    grupos: [
      { nombre: 'Pensamiento Actual', cartas: [0, 1, 2] },
      { nombre: 'Pasado (Lo que deja atrás)', cartas: [3, 4, 5] },
      { nombre: 'Presente (Lo que está en su camino)', cartas: [6, 7, 8] },
      { nombre: 'Futuro (Solución al problema)', cartas: [9, 10, 11] }
    ],
    disposicion: 'grupos'
  }
};