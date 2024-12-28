geocodificadorModulo = (function () {
  // var geocodificador // Geocodificador que dada una dirección devuelve una coordenada
  
    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
    var that = this;

    const direccionSolicitada = {address: direccion}

    function callback(coordenada, status) {
      if (status === "OK") {
        console.log('La operación se realizó con exito');
        funcionALlamar(direccion, coordenada);
      } else if (status === "ZERO_RESULTS") {

        swal({
          type: "warning",
          title: 'Oops',
          text: 'No se encontró el lugar que buscabas.',
          timer: 2500
          });
      } else if (status === "INVALID_REQUEST") {
        console.log('No se ingresó ninguna dirección');
      } else if (status === "UNKNOWN_ERROR" || status === "ERROR") {

        swal({
          type: "warning",
          title: 'Hubo un error en el Servidor',
          text: 'Intente reiniciando la pagina',
          timer: 3000
          });
      } else {

        swal({
          type: "error",
          title: 'Servidor muy ocupado',
          text: 'Intenté usar nuestra web mañana.',
          timer: 3000
          });
      }
      
    }

    that.geolocalizarString(direccion).then((coordenadas) => {
      if (coordenadas) {
        callback(coordenadas, "OK");
      } else {
        callback(null, "ZERO_RESULTS");
      }
    });

      /* Completar la función usaDireccion(dirección,funcionALlamar)
     para que se obtengan las coordenadas a partir de la dirección pasada por parámetro
     y que llame a la función pasada por parámetro con los siguientes parámetros
     dirección: la dirección pasada por parámetro
     coordenada: la ubicación de tipo L.LatLng */
  }

    // Inicializo el geocoder que obtiene las corrdenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion,direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  

  function geolocalizarString(unStringAGeolocalizar) {
    //and return the lat and long of the first result.

    const resultado = fetch('https://nominatim.openstreetmap.org/search.php?q=' + unStringAGeolocalizar + '&format=jsonv2&limit=40');
    return resultado.then((response) => {
      return response.json();
    }).then((json) => {
      if (json.length > 0) {
        return {lat: json[0].lat, lng: json[0].lon};
      } else {
        return null;
      }
    });

  }

  return {
    geolocalizarString,
    usaDireccion,
    inicializar
  }
})()
