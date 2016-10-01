var io = require('socket.io-client');
var socket = io('http://localhost:3000');

for (let i = 0; i < 10; ++i) {
	socket.emit('event', {a: 'test', i: i});
}

socket.on('test', function(data) {
	console.log(data);
});
