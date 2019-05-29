var socket = io();


socket.on('connect', function() {
    console.log('Conectado al servidor');
})
socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
})


var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio4 = $('#lblEscritorio4');
var lblEscritorio3 = $('#lblEscritorio3');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);

});

socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(data.ultimos4);

})

function actualizaHTML(ultimo4) {
    for (var i = 0; i <= ultimo4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimo4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimo4[i].escritorio);
    }
}