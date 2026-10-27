// Dream Apartments – interacciones de la web
(function () {
  var WHATSAPP = '34657524919'; // número de contacto (sin + ni espacios)

  function abrirWhatsApp(texto) {
    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  }
  function fecha(v) {
    if (!v) return '—';
    var p = v.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  // Filtros (chips) del listado
  document.querySelectorAll('.chip').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.classList.toggle('on');
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  });

  // Buscador del listado: de momento lleva al listado
  var buscar = document.getElementById('form-buscar');
  if (buscar) {
    buscar.addEventListener('submit', function (e) {
      e.preventDefault();
      var grid = document.querySelector('.card + div, a.card');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Formulario "Llamadme" (propietarios)
  var llamada = document.getElementById('form-llamada');
  if (llamada) {
    llamada.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = llamada.nombre.value.trim();
      var tel = llamada.telefono.value.trim();
      abrirWhatsApp('Hola, soy ' + nombre + ' (tel. ' + tel + '). Tengo un apartamento y me gustaría que me llamarais para información sobre la gestión.');
    });
  }

  // Ficha: contador de huéspedes
  var g = document.getElementById('guests');
  var inc = document.getElementById('inc');
  var dec = document.getElementById('dec');
  var MAX = 4;
  if (g && inc && dec) {
    inc.addEventListener('click', function () { g.textContent = Math.min(MAX, +g.textContent + 1); });
    dec.addEventListener('click', function () { g.textContent = Math.max(1, +g.textContent - 1); });
  }

  // Ficha: reservar (solicitud por WhatsApp hasta conectar el motor de reservas)
  var reservar = document.getElementById('reservar');
  if (reservar) {
    reservar.addEventListener('click', function () {
      var titulo = (document.querySelector('h1') || {}).textContent || 'un apartamento';
      var ll = document.getElementById('llegada').value;
      var sa = document.getElementById('salida').value;
      abrirWhatsApp('Hola, quiero reservar ' + titulo.trim() + ' del ' + fecha(ll) + ' al ' + fecha(sa) + ' para ' + (g ? g.textContent : '2') + ' huéspedes.');
    });
  }

  // Ficha: compartir
  var compartir = document.getElementById('compartir');
  if (compartir) {
    compartir.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({ title: document.title, url: location.href }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () { compartir.textContent = 'Enlace copiado'; });
      }
    });
  }
})();
