var mapa // Mapa que vamos a modificar

var posicionCentral = {
  lat: -34.67312823795221,
  lng: -58.47391129343055
}

/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */

// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
  mapa = L.map('map', {
    center: posicionCentral,
    zoom: 13,
    scrollWheelZoom: false,
    smoothWheelZoom: true,
    smoothSensitivity: 1
  })

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);


  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()

  
}



