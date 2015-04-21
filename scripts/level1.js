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

var width = 1020;
var height = 515;

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
	e.preventDefault();
	keys[e.keyCode ? e.keyCode : e.which] = true;
});

$(document).keyup(function(e){
	e.preventDefault();
	delete keys[e.keyCode ? e.keyCode : e.which];
});

var carolers = [];
var wilderkin = [];
var game_over = false;
var game_won = false;
var timer = 0;
var game_duration = 3600;

function init(){
	chimes.play();
	lowNote2.play();
	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS!
	//alert("Post Loop"); //if uncommented this line will fire once at game load
}

function update(){
	timer++;
	if(timer > game_duration){
		game_won = true;
		chimes.fadeOut( 0, 2000 );
		lowNote2.fadeOut( 0, 2000 );
		ahhh.play().fadeOut( 0, 4000 );
	}
	player.update();
	if (Math.random()<=0.009 && carolers.length < 15 ){
		carolers = carolers.concat(new Caroler(images[4], Math.random()*width, -10));
	}

	carolers.forEach(function(caroler) {
	    caroler.update();
	});
	//delete references to offscreen objects
	[carolers].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
		    if (list[i].cleanup()) {
		        list.splice(i--, 1);
		    }
		};
	});

	carolers.forEach(function(caroler){
		if(collision(caroler,caroler.bolas) && caroler.bolas.reversed){
			caroler.destroyed = true;
			caroler.bolas.y = height + 100;
			strike.play();
		}
		if(collision(caroler.bolas,player)){
			if (player.shield.on){
				caroler.bolas.rotation = caroler.bolas.rotation * -1
				caroler.bolas.direction = caroler.bolas.direction * -1
				caroler.bolas.reversed = true;
				bounce.play();
			} else{
				if (!caroler.bolas.reversed){
					player.health--;
					hit.play();
				}
				
			}
		}
	});
}

function render(){
	contextBackground.clearRect(0,0,width,height);
	player.draw();

	carolers.forEach(function(caroler) {
	    caroler.draw();
	});
}

contextBackground.font = "bold 50px monaco";
contextBackground.fillStyle = "white";
contextBackground.fillText("loading",width/2-100,height/2);

loadImages(["Art/Icons/Player_shield.png", "Art/Icons/Player.png", "Art/Icons/projectile.png", "Art/Icons/projectile_converted.png", "Art/Icons/Attacking_Caroller.png" ]);

checkImages();
