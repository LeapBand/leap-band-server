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
	socket.on('update_member', function(data) {
		clients[socket.id] = data;
		socket.emit('member_updated', {
			'id': socket.id,
			'data': clients[socket.id]
		});

		console.log(`Client ${socket.id} changed:`);
		console.log(data);
	});

	socket.on('play', function(data) {
		data.username = clients[socket.id].username;
		io.emit('play', data);
		console.log(data);
	});

	socket.on('disconnect', function() {
		// Remove client
		console.log(`Client ${clients[socket.id].username} disconnected.`);
		delete clients[socket.id];
		socket.emit('member_left', socket.id);
	});
});

io.listen(3000);