// alert(state.history[0].variables.my_var)
// if (state.history[0].variables.my_var == 0){
// 	alert("test")
// }
// alert(state.history[0].variables.my_var);
// state.history[0].variables.my_var = 1;

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000/60);
			};
})();



function loop(){
	requestAnimFrame(function(){
		loop();
	});
	// update();
	// render();
}
loop();

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
	context.clearRect(0, 0, width, height);
	
	context.fillStyle = "red"
	context.fillRect(40, 40, 40, 40)
}

setInterval(function(){
	game();
}, 1000/60)