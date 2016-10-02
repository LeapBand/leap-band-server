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
	// socket.on('join', function(clientData) {
	// 	clients[socket.id] = clientData;
	// 	socket.emit('members', {
	// 		'id': socket.id,
	// 		'clients': clients
	// 	});

	// 	console.log(`Client ${socket.id} changed:`);
	// 	console.log(clientData);
	// });

	socket.on('update_member', function(clientData) {
		let existingMember = (socket.id in clients);

		clients[socket.id] = clientData;
		if (!existingMember) {
			socket.emit('initialize', {
				'myId': socket.id,
				'clients': clients
			});
		}

		io.emit('member_updated', {
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
		// console.log(instrumentData);
	});

	socket.on('disconnect', function() {
		// Remove client
		console.log(`Client ${socket.id} disconnected.`);
		delete clients[socket.id];
		socket.emit('member_left', {
			'id': socket.id
		});
	});
});

io.listen(3000);