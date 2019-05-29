const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguient = ticketControl.siguienteTicket();
        console.log(`El siguiente ticket ${siguient}`);
        callback(siguient);
    })

    //emitir un evento estado actual

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atendertTicket(data.escritorio);

        callback(atenderTicket);


    });

    client.broadcast.emit('ultimos4', {
        ultimos4: ticketControl.getUltimos4()
    });

});