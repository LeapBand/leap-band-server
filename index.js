var io = require('socket.io')();

let clients = {};

/*
{
	socketId: {
		username: "fdfdgdfg",
		instrument: "drums"
	}
}
*/

io.on('connection', function(socket) {
	socket.on('update_member', function(clientData) {
		clients[socket.id] = clientData;
		socket.emit('member_updated', {
			'id': socket.id,
			'data': clients[socket.id]
		});

		console.log(`Client ${socket.id} changed:`);
		console.log(clientData);
	});

	socket.on('play', function(instrumentData) {
		io.emit('play', {
			'id': socket.id,
			'data': instrumentData
		});
		console.log(instrumentData);
	});

	socket.on('disconnect', function() {
		// Remove client
		console.log(`Client ${socket.id} disconnected.`);
		delete clients[socket.id];
		socket.emit('member_left', socket.id);
	});
});

io.listen(3000);