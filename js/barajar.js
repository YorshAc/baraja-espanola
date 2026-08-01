// Función para barajar el mazo usando algoritmo Fisher-Yates
function barajarMazo() {
  const mazoBarajado = [...baraja];
  
  for (let i = mazoBarajado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazoBarajado[i], mazoBarajado[j]] = [mazoBarajado[j], mazoBarajado[i]];
  }
  
  return mazoBarajado;
}

// Función para seleccionar cartas para una tirada
function seleccionarCartas(cantidad) {
  const mazoBarajado = barajarMazo();
  const cartasSeleccionadas = [];
  
  for (let i = 0; i < cantidad; i++) {
    const carta = mazoBarajado[i];
    
    // 30% de probabilidad de que salga invertida
    const estaInvertida = Math.random() < 0.3;
    
    cartasSeleccionadas.push({
      ...carta,
      clave: `${carta.numero}-${carta.palo}`,
      invertida: estaInvertida
    });
  }
  
  return cartasSeleccionadas;
}