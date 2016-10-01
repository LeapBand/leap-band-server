var io = require('socket.io-client');
var socket = io('http://130.85.245.80:3000');
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

let start = 0;
setTimeout(function() {
	console.log(`Sending...`);
	start = Date.now();
	socket.emit('play', {
		frequency: 500
	});
}, 1000);

socket.on('play', function(data) {
	let elapsedTime = Date.now() - start;
	console.log(`Received from ${data.id} in ${elapsedTime} ms.`);
	socket.disconnect();
});
