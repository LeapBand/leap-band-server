var io = require('socket.io')();

let clients = {};

io.on('connection', function(socket) {
	// Add client
	socket.emit('test', {message: `Hello client ${socket.id}!!!`});

	socket.on('event', function(data) {
		data.id = socket.id
		console.log(data);
	});

	socket.on('disconnect', function() {
		// Remove client
		console.log(`Client ${socket.id} disconnected.`);
	});
});

io.listen(3000);