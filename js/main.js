// Dream Apartments – interacciones de la web
(function () {
  var WHATSAPP = '34657524919'; // número de contacto (sin + ni espacios)

  // Formulario "Llamadme": abre WhatsApp con el mensaje preparado
  var llamada = document.getElementById('form-llamada');
  if (llamada) {
    llamada.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = llamada.nombre.value.trim();
      var tel = llamada.telefono.value.trim();
      var texto = 'Hola, soy ' + nombre + ' (tel. ' + tel + '). Tengo un apartamento y me gustaría que me llamarais para información sobre la gestión.';
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    });
  }
})();
