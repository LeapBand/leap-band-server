var io = require('socket.io-client');
var socket = io('http://localhost:3000');
// var Mousetrap = require('mousetrap');

// Mousetrap.bind('p', () => {
// 	socket.emit('play', {
// 		'frequency': 500
// 	})
// });

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

socket.emit('update_member', {
	username: 'ProDrummer' + getRandomIntInclusive(0, 100),
	instrument: 'drums'
});

for (let i = 0; i < 10; ++i) {
	console.log(`Sending ${i}...`);
	socket.emit('play', {
		frequency: 500,
		i: i
	});
}

socket.on('play', function(data) {
	console.log(`Received ${data.i}.`);
});
