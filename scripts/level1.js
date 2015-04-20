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

//Sounds
var hit = new Howl({urls: ['././Audio/47356__fotoshop__oof.wav'], volume: 0.1 });  //plays when you are struck with a bola
var chimes = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/131979__juskiddink__chimes.wav'], loop: true, volume: 0.2 }); //looping background music
var bounce = new Howl({urls: ['././Audio/198116__editor-adp__clang-1.wav'], volume: 0.2 }); //plays when you redirect a bola
var strike = new Howl({urls: ['././Audio/196733__paulmorek__crash-02.wav'], volume: 0.1 }); //plays when a redirected bola hits an enemy
var sadBell = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/59535__juskiddink__bell2.wav']}); //plays on game over
var lowNote = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122680__juskiddink__gong-2.wav']}); //plays on game over
var song = new Howl({urls: ['././Audio/11078__maerkunst__female-voice/176118__maerkunst__short-song-1_edit.wav'], volume: 0 }).play(); //plays while shields are up via fadeIn/Out functions
var lowNote2 = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122680__juskiddink__gong-2.wav'], loop: true, volume: 0.2}); //looping background

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

var carolers = [];
var wilderkin = [];
var game_over = false;

function init(){
	chimes.play();
	lowNote2.play();
	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS!
	//alert("Post Loop"); //if uncommented this line will fire once at game load
}

function update(){
	player.update();
	// console.log(carolers.length)
	if (Math.random()<=0.009 && carolers.length < 3 ){
		carolers = carolers.concat(new Caroler(images[0], Math.random()*width, -10));
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

function loop(){

	if (!game_over){
		requestAnimFrame(function(){
			loop();
		});
		update();
		render();
	}else{
		contextBackground.font = "bold 50px monaco";
		contextBackground.fillStyle = "white";
		contextBackground.fillText("Game Over",(width/2)-165,(height/2)-80);
		chimes.stop().fadeOut( 0, 2000 );
		lowNote2.stop().fadeOut( 0, 2000 );
		sadBell.play().fadeOut( 0, 3000 );
		lowNote.play().fadeOut( 0, 5000 );
		return 0;
	}
}

contextBackground.font = "bold 50px monaco";
contextBackground.fillStyle = "white";
contextBackground.fillText("loading",width/2-100,height/2);

loadImages(["Art/test_ship_shields_up.png", "Art/test_ship_shields_down.png"]);

checkImages();
