var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var keys = [];

var message = ""

var width = 500, height = 400, speed = 5

window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);


function game(){
	update();
	render();
}

function update(){
}

function render(){
}

setInterval(function(){
	game();
}, 1000/60)