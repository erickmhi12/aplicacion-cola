var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
})
socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
})

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');

}
//obtener de Jquery todos lo small y tenerlos de referencia en la etiqueta
var label = $('small');

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });

});