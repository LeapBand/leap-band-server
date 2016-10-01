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
	// Add client
	// socket.emit('test', {message: `Hello client ${socket.id}!!!`});

	socket.on('update_member', function(data) {
		clients[socket.id] = data;
		socket.emit('members_updated', clients);
		console.log('Client ${socket.id} changed:');
		console.log(data);
	});

	socket.on('play', function(data) {
		data.id = socket.id;
		io.emit('play', data);
	});

	socket.on('disconnect', function() {
		// Remove client
		delete clients[socket.id];
		socket.emit('members_updated', clients);
		console.log(`Client ${socket.id} disconnected.`);
	});
});

io.listen(3000);