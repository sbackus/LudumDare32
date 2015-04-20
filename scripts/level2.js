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

var mouse_x = 0;
var mouse_y = 0;

var contextPlayer = document.getElementById("playerCanvas").getContext("2d");
var contextBackground = document.getElementById("backgroundCanvas").getContext("2d");

      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
      var canvas = document.getElementById('playerCanvas');

      canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		if(bells.length<1){
			bells = bells.concat(new Bell(mousePos.x, mousePos.y));
		}
		
		bellCall.play();
      }, false);

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
var bells = [];
var game_over = false;

function init(){
	//backgound music go
	chimes.play();
	lowNote2.play();
	
	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS! IT WON'T RUN!
}

function update(){
	player.update();
	if (Math.random()<=0.009){
		wilderkin = wilderkin.concat(new Wilderkind(images[1], Math.random()*width, randomChoice([-10,height])));
	}

	bells.forEach(function(bell){
		bell.update()
	});

	bells.forEach(function(bell){
		wilderkin.forEach(function(wilderkind) {
			if(collision(bell,wilderkind)){
				if(!wilderkind.pulled){
					wilderkind.bounce_speed = -2;
					wilderkind.pulled = true;
					wilderkind.bell = bell;
				}
			}
		});
	});

	wilderkin.forEach(function(wilderkind) {
	    wilderkind.update();
	    if (collision(wilderkind,player)){
	    	wilderkind.bounce_speed = 2.5;
	    	if (!player.shield.on){
	    		player.health -= 5;
				hit.play();
	    	}else{
	    		player.shield.power = 0;
				reflect.play()
	    	}
	    }
	});

	//delete references to offscreen objects
	[wilderkin,bells].forEach(function(list){  
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

	bells.forEach(function(bell){
		bell.draw();
	});

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
