// Variable global para almacenar los significados
let significados = {};

// Ya no necesitamos cargar con fetch, usamos la variable global
function inicializarSignificados() {
  if (typeof significadosData !== 'undefined') {
    significados = significadosData;
    console.log('✅ Significados cargados correctamente:', Object.keys(significados).length, 'cartas');
  } else {
    console.error('❌ Error: significadosData no está definido');
    mostrarToast('Error al cargar los significados', 'error');
  }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  inicializarSignificados();
  inicializarEventos();
});

// Inicializar eventos de la interfaz
function inicializarEventos() {
  const btnRealizarTirada = document.getElementById('btn-realizar-tirada');
  const selectTirada = document.getElementById('select-tirada');
  
  if (btnRealizarTirada) {
    btnRealizarTirada.addEventListener('click', realizarTirada);
  }
  
  if (selectTirada) {
    selectTirada.addEventListener('change', actualizarDescripcionTirada);
  }
}

// Actualizar descripción cuando cambia la tirada seleccionada
function actualizarDescripcionTirada() {
  const selectTirada = document.getElementById('select-tirada');
  const descripcionElement = document.getElementById('descripcion-tirada');
  const tiradaSeleccionada = tiradas[selectTirada.value];
  
  if (descripcionElement && tiradaSeleccionada) {
    descripcionElement.textContent = tiradaSeleccionada.descripcion;
  }
}

// Realizar la tirada seleccionada
function realizarTirada() {
  const selectTirada = document.getElementById('select-tirada');
  const tipoTirada = selectTirada.value;
  const configuracionTirada = tiradas[tipoTirada];
  
  if (!configuracionTirada) {
    mostrarToast('Por favor selecciona una tirada', 'error');
    return;
  }
  
  // Seleccionar cartas
  const cartasSeleccionadas = seleccionarCartas(configuracionTirada.cartas);
  
  // Mostrar tirada con animación
  mostrarTiradaConAnimacion(cartasSeleccionadas, configuracionTirada);
  
  // Mostrar notificación
  mostrarToast(`Tirada "${configuracionTirada.nombre}" realizada`, 'success');
}

// Mostrar la tirada con animación
// Mostrar la tirada con animación
function mostrarTiradaConAnimacion(cartas, configuracionTirada) {
  const contenedorTirada = document.getElementById('contenedor-tirada');
  const panelSignificados = document.getElementById('panel-significados');
  
  if (!contenedorTirada) return;
  
  // Limpiar contenedor
  contenedorTirada.innerHTML = '';
  contenedorTirada.className = '';
  
  // Aplicar clase de disposición
  contenedorTirada.classList.add(`tirada-${configuracionTirada.disposicion}`);
  
  // Si es tirada de grupos, crear estructura especial
  if (configuracionTirada.disposicion === 'grupos') {
    crearTiradaGrupos(contenedorTirada, cartas, configuracionTirada);
  } else {
    // Crear cartas boca abajo
    cartas.forEach((carta, index) => {
      const cartaElement = crearCartaBocaAbajo(carta, index, configuracionTirada);
      contenedorTirada.appendChild(cartaElement);
    });
  }
  
  // Resetear panel de significados
  if (panelSignificados) {
    panelSignificados.innerHTML = '<h2>Significados</h2><p class="hint">Las cartas se revelarán automáticamente. Haz clic en una carta para ver su significado.</p>';
  }
  
  // Las cartas permanecen boca abajo hasta que el usuario hace clic
  const todasLasCartas = contenedorTirada.querySelectorAll('.carta');
  
  todasLasCartas.forEach((cartaElement, index) => {
    const carta = cartas[index];
    if (carta) {
      // Al hacer clic, voltea la carta y muestra el significado
      cartaElement.addEventListener('click', () => {
        // Solo voltear si aún está boca abajo
        if (cartaElement.classList.contains('carta-boca-abajo')) {
          voltearCarta(cartaElement, carta, index, configuracionTirada);
        }
        // Mostrar significado (ya sea que se acabe de voltear o ya estaba volteada)
        const posicion = cartaElement.dataset.posicion || configuracionTirada.posiciones[index];
        mostrarSignificado(carta, posicion);
      });
    }
  });
    
}

// Crear tirada de grupos (12 cartas)
function crearTiradaGrupos(contenedor, cartas, configuracionTirada) {
  configuracionTirada.grupos.forEach((grupo, grupoIndex) => {
    const grupoDiv = document.createElement('div');
    grupoDiv.className = 'grupo-cartas';
    
    const tituloDiv = document.createElement('div');
    tituloDiv.className = 'grupo-titulo';
    tituloDiv.textContent = grupo.nombre;
    grupoDiv.appendChild(tituloDiv);
    
    const cartasGrupoDiv = document.createElement('div');
    cartasGrupoDiv.className = 'cartas-grupo';
    
    grupo.cartas.forEach((cartaIndex, posicionEnGrupo) => {
      const carta = cartas[cartaIndex];
      const cartaElement = crearCartaBocaAbajo(carta, cartaIndex, configuracionTirada);
      cartasGrupoDiv.appendChild(cartaElement);
    });
    
    grupoDiv.appendChild(cartasGrupoDiv);
    contenedor.appendChild(grupoDiv);
  });
}

// Crear carta boca abajo (con reverso)
function crearCartaBocaAbajo(carta, index, configuracionTirada) {
  const cartaDiv = document.createElement('div');
  cartaDiv.className = 'carta carta-boca-abajo';
  cartaDiv.dataset.index = index;
  
  const posicion = configuracionTirada.posiciones[index] || `Carta ${index + 1}`;
  cartaDiv.dataset.posicion = posicion;
  
  cartaDiv.innerHTML = `
    <div class="carta-contenido">
      <img src="images/reverso.png" alt="Reverso" class="carta-imagen reverso-imagen">
    </div>
  `;
  
  return cartaDiv;
}

// Voltear carta para revelar
function voltearCarta(cartaElement, carta, index, configuracionTirada) {
  const posicion = cartaElement.dataset.posicion || configuracionTirada.posiciones[index] || `Carta ${index + 1}`;
  
  // Añadir efecto de volteo
  cartaElement.classList.add('volteando');
  setTimeout(() => cartaElement.classList.remove('volteando'), 600);
    
  // CORRECCIÓN: Separar las clases correctamente
  cartaElement.classList.remove('carta-boca-abajo');
  cartaElement.classList.add('carta');
  
  if (carta.invertida) {
    cartaElement.classList.add('invertida');
  } else {
    cartaElement.classList.add('derecha');
  }
  
  // Actualizar contenido
  cartaElement.innerHTML = `
    <div class="carta-contenido">
      <img src="${carta.imagen}" alt="${carta.nombre}" class="carta-imagen">
      <div class="carta-info">
        <div class="posicion-label">${posicion}</div>
      </div>
    </div>
  `;
  
  // Añadir evento click
  cartaElement.addEventListener('click', () => mostrarSignificado(carta, posicion));
}

// Mostrar significado de una carta
function mostrarSignificado(carta, posicion) {
  const significado = significados[carta.clave];
  
  if (!significado) {
    mostrarToast('Significado no disponible', 'error');
    return;
  }
  
  const significadoCarta = carta.invertida ? significado.invertida : significado.derecha;
  const estado = carta.invertida ? 'Invertida' : 'Al derecho';
  
  const panelSignificados = document.getElementById('panel-significados');
  
  if (panelSignificados) {
    panelSignificados.innerHTML = `
      <div class="significado-detalle">
        <h2>${significado.nombre}</h2>
        <div class="estado ${carta.invertida ? 'invertido' : 'derecho'}">
          ${carta.invertida ? '🔄' : '✓'} ${estado}
        </div>
        <div class="posicion-info">
          <strong>Posición:</strong> ${posicion}
        </div>
        <div class="resumen">
          <h3>Resumen:</h3>
          <p>${significadoCarta.resumen}</p>
        </div>
        <div class="interpretacion">
          <h3>Interpretación:</h3>
          <p>${significadoCarta.interpretacion}</p>
        </div>
      </div>
    `;
    
    // Scroll al panel en móviles
    if (window.innerWidth <= 768) {
      panelSignificados.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Mostrar toast/notificación
function mostrarToast(mensaje, tipo = 'info') {
  const toast = document.getElementById('toast');
  const toastMensaje = document.getElementById('toast-mensaje');
  
  if (toast && toastMensaje) {
    toastMensaje.textContent = mensaje;
    toast.className = `toast toast-${tipo}`;
    toast.classList.remove('oculto');
    
    setTimeout(() => {
      toast.classList.add('oculto');
    }, 3000);
  }
}