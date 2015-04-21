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
		if(bells.length<5){
			bells = bells.concat(new Bell(mousePos.x, mousePos.y));
			bellCall.play();
		}
		else{
			bellFail.play();
		}
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
	e.preventDefault();
	keys[e.keyCode ? e.keyCode : e.which] = true;
});

$(document).keyup(function(e){
	e.preventDefault();
	delete keys[e.keyCode ? e.keyCode : e.which];
});

var wilderkin = [];
var carolers = [];
var bells = [];
var game_over = false;
var game_won = false;
var casualties = 0;
var timer = 0;
var game_duration = 10800;


function init(){
	//backgound music go
	chimes.play();
	lowNote2.play();
	
	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS! IT WON'T RUN!
}

function new_wilderkind_update(){
	if(!this.destroyed){
		if(!(this.bell == null) && this.bell.time>=this.bell.duration){
			this.pulled = false;
			this.bounce_speed = 0
			// if (wilderkin.length>=2){
			// 	for (i = 0; i < wilderkin.length; i++) { 
			//     	for (j = i+1; j < wilderkin.length; j++) { 
			//     		w1 = wilderkin[i];
			//     		w2 = wilderkin[j];
			//     		if (collision(w1,w2)){
			//     			if(w1.pulled || w2.pulled){
			//     				contextPlayer.clearRect(this.x-20,this.y-20,this.width+40,this.height+40);
			//     				w1.destroyed = true;
			//     				w2.destroyed = true;
			//     			}
			//     		}
			//     	}
			// 	}
			// }
		}
		if (this.bounce_speed > 0.01){
			this.bounce_speed -= 0.009; 
		}

		if (this.pulled && !(this.bell == null)){
			xdiff = this.bell.x - this.x;
			ydiff = this.bell.y - this.y;
			this.direction = Math.atan(xdiff/ydiff)*180/Math.PI;
			if (ydiff > 0){
				this.x += offset_x(this.direction,this.speed-this.bounce_speed)
				this.y += offset_y(this.direction,this.speed-this.bounce_speed)
			} else{
				this.x -= offset_x(this.direction,this.speed-this.bounce_speed)
				this.y -= offset_y(this.direction,this.speed-this.bounce_speed)
			}
		} else{
			this.x += offset_x(this.direction,this.speed-this.bounce_speed)
			this.y += offset_y(this.direction,this.speed-this.bounce_speed)
		}

	}
};

function update(){
	timer++;

	if (casualties > 50){
		game_over = true;
	}
	if(timer > game_duration){
		game_won = true;
	}
	player.update();
	if (Math.random()<=0.009){
		wilderkind = new Wilderkind(images[5], Math.random()*width, height);
		wilderkind.update = new_wilderkind_update;
		wilderkind.direction = randomChoice([180,170,190,200,160]);
		wilderkin = wilderkin.concat(wilderkind);
	}
	if (Math.random()<=0.009 && carolers.length < 3 ){
		carolers = carolers.concat(new Caroler(images[4], Math.random()*width, -10));
	}

	bells.forEach(function(bell){
		bell.update()
	});

	carolers.forEach(function(caroler) {
	    caroler.update();
	});

	carolers.forEach(function(caroler){
		wilderkin.forEach(function(wilderkind) {
			if(collision(caroler,wilderkind)){
				casualties += 2;
				caroler.destroyed = true;
				wilderkind.destroyed = true;
				contextPlayer.clearRect(wilderkind.x-20,wilderkind.y-20,wilderkind.width+40,wilderkind.height+40);
			}
			else if(collision(wilderkind,caroler.bolas)){
				if(randomChoice([true,false])){
					casualties +=1
					contextPlayer.clearRect(wilderkind.x-20,wilderkind.y-20,wilderkind.width+40,wilderkind.height+40);
					wilderkind.destroyed = true;
					hit.play();
				} else{
					caroler.bolas.rotation = caroler.bolas.rotation * -1
					caroler.bolas.direction = caroler.bolas.direction * -1
					caroler.bolas.reversed = true;
				}
			}
		});


		if(collision(caroler,caroler.bolas) && caroler.bolas.reversed){
			caroler.destroyed = true;
			casualties += 1;
			caroler.bolas.y = height + 100;
			strike.play();
		}
		if(collision(caroler.bolas,player)){
			if (player.shield.on){
				console.log(game_won)
				caroler.bolas.rotation = caroler.bolas.rotation * -1
				caroler.bolas.direction = caroler.bolas.direction * -1
				caroler.bolas.y = height + 300;
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
	[wilderkin,bells,carolers].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
		    if (list[i].cleanup()) {
		        list.splice(i--, 1);
		    }
		};
	});

}

function render(){
	contextBackground.clearRect(0,0,width,height);
	contextBackground.font = "bold 30px monaco";
	contextBackground.fillStyle = "black";
	contextBackground.fillText("casualties: " + casualties,10,30);
	player.draw();

	[wilderkin,bells,carolers].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
			list[i].draw();
		}
	});
}

contextBackground.font = "bold 50px monaco";
contextBackground.fillStyle = "white";
contextBackground.fillText("loading",width/2-100,height/2);

loadImages(["Art/Icons/Player_shield.png", "Art/Icons/Player.png", "Art/Icons/projectile.png", "Art/Icons/projectile_converted.png", "Art/Icons/Attacking_Caroller.png", "Art/Icons/Attacking_Wilderkind.png" ]);

checkImages();
