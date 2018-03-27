$('#chat').hide();

$('#start').submit(function(e){
	e.preventDefault();
	var name = $('#name').val();
	if (name) {
		startConnection(name);
	} else {
		$('#messages').append($('<li>').text('" Please start with your name "'));
	}
	return false;
});

var socket;

function startConnection(username) {
	socket = io();

	//log user
	socket.emit('login', username);
	
	//check log response
	socket.on('login', function(data){
		if (data == 'ok') {
			$('#start').hide();
			StartChat(username);
		} else {
			$('#messages').append($('<li>').text('" Connection is not possible "'));
			socket.close();
		}
	});
}

function StartChat(username) {
	$('#chat').show();
	$('#username').text(username);

	$('#chat').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(msg){
			$('#messages').append($('<li>').text(msg));
	});
}