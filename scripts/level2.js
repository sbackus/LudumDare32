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

var width = 550;
var height = 600;

var images = [];
var doneImages = 0;
var requiredImages = 0;

var contextPlayer = document.getElementById("playerCanvas").getContext("2d");
var contextBackground = document.getElementById("backgroundCanvas").getContext("2d");

var keys = [];

var player = null;

var key = {
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	space: 32,
	w: 87,
	a: 65,
	s: 83,
	d: 68,
}

$(document).keydown(function(e){
	keys[e.keyCode ? e.keyCode : e.which] = true;
});

$(document).keyup(function(e){
	delete keys[e.keyCode ? e.keyCode : e.which];
});

var wilderkin = [];
var game_over = false;

function init(){
	//Howler Test
	var chimes = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/131979__juskiddink__chimes.wav']}).play();
	
	// wilderkin = wilderkin.concat(new Wilderkind(images[1], width/2, height/2));

	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS! IT WON'T RUN!
}

function update(){
	player.update();
	// console.log(wilderkin.length)
	if (Math.random()<=0.009){
		wilderkin = wilderkin.concat(new Wilderkind(images[1], Math.random()*width, -10));
	}

	wilderkin.forEach(function(wilderkind) {
	    wilderkind.update();
	});

	//delete references to offscreen objects
	[wilderkin].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
		    if (list[i].cleanup()) {
		        list.splice(i--, 1);
		    }
		};
	});

}

function render(){
	contextBackground.clearRect(0,0,width,height);
	player.draw();

	wilderkin.forEach(function(wilderkind) {
	    wilderkind.draw();
	});
}

function loop(){
	requestAnimFrame(function(){
		loop();
	});
	if (!game_over){
		update();
		render();
	}else{
		contextBackground.font = "bold 50px monaco";
		contextBackground.fillStyle = "white";
		contextBackground.fillText("Game Over",(width/2)-165,(height/2)-80);
	}
}

contextBackground.font = "bold 50px monaco";
contextBackground.fillStyle = "white";
contextBackground.fillText("loading",width/2-100,height/2);

loadImages(["Art/test_ship_shields_up.png", "Art/test_ship_shields_down.png"]);

checkImages();
