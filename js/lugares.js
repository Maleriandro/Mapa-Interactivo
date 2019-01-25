lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
    var radioDeBusqueda = 20000;
    var centro = mapa.getCenter();

    var circulo = new google.maps.Circle({
      center: centro,
      radius: radioDeBusqueda,
      map: mapa,
      strokeOpacity: 0,
      fillOpacity: 0
    });

    var limites = circulo.getBounds();


    var inputsAutocompletados = [document.getElementById('direccion'),
                                document.getElementById('desde'),
                                document.getElementById('hasta'),
                                document.getElementById('agregar')];

    var opciones = {
      bounds: limites,
      strictBounds: true,
      map: map
    }

    var autocompletado1 = new google.maps.places.Autocomplete(inputsAutocompletados[0], opciones);
    var autocompletado2 = new google.maps.places.Autocomplete(inputsAutocompletados[1], opciones);
    var autocompletado3 = new google.maps.places.Autocomplete(inputsAutocompletados[2], opciones);
    var autocompletado4 = new google.maps.places.Autocomplete(inputsAutocompletados[3], opciones);
    
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion) {
    var radio = document.getElementById('radio').value;
    var tipoDeLugar = document.getElementById('tipoDeLugar').value;

    if (tipoDeLugar === "null") {
      return;
    }

    servicioLugares = new google.maps.places.PlacesService(mapa);

    var request = {
      location: posicion,
      radius: radio,
      type: [tipoDeLugar]
    };

    function callback(result, status) {
      if (status === "OK") {
        console.log('La operacion se realizó con exito');
        marcadorModulo.marcarLugares(result, status);
      } else if (status === "ZERO_RESULTS") {

        swal({
          type: "info",
          title: 'No se encontró ningun lugar cercano',
          text: 'Intente ampliar el radio de busqueda',
          timer: 3000
          });
      } else if (status === "INVALID_REQUEST") {
        console.log('No se ingresó ninguna dirección');
      } else if (status === "UNKNOWN_ERROR" || status === "ERROR") {

        swal({
          type: "warning",
          title: 'Hubo un error en el Servidor',
          text: 'Intente reiniciando la página.',
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

    servicioLugares.nearbySearch(request, callback.bind(this));

    /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */

  }
  return {
    inicializar,
    buscarCerca
  }
})()
