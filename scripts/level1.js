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

function Shield(){
	this.max_power = 100;
	this.power = this.max_power;
	this.on = false;
	this.recharging = false
	this.switched = false;
	this.draw = function(){
		contextBackground.clearRect(player.x, player.y+player.height +10,30,10);
		contextBackground.fillStyle = "green"
		contextBackground.fillRect(player.x+9, player.y+player.height +10, this.power/5, 5);
	}
	this.update = function(){
		if(keys[key.space]&&this.power >= 0 && !this.recharging){
			if(!this.on){
				this.switched = true;
			}else{
				this.switched = false;
			}
			this.on = true;
			this.power--;
			if(this.power <= 0){
				this.recharging = true;
			}
		} else {
			if(this.on){
				this.switched = true;
			}else{
				this.switched = false;
			}
			this.on = false;
			if (this.power< this.max_power){
				this.power++;
			}
			if(this.power >= this.max_power/2){
				this.recharging = false;
			}
		}
		if (this.switched){
			
		}
	return this.switched;
	}
}

function Player() {
	this.shielded_image = images[0];
	this.unshieled_image = images[1];
	this.x =  width/2;
	this.y =  height/2;
	this.width = this.shielded_image.width;
	this.height =  this.shielded_image.width;
	this.drawn = false;
	this.speed = 6;
	this.shield = new Shield();
	this.health=20;
	this.draw =  function(){
		this.shield.draw();

		//draw health bar
		contextBackground.clearRect(this.x, this.y+this.height + 15,30,10);
		if (this.health>5){
			contextBackground.fillStyle = "green";
		}else{
			contextBackground.fillStyle = "red";
		}
		contextBackground.fillRect(this.x+9, this.y+this.height +15, this.health, 5);

		if(!this.drawn){
			contextPlayer.clearRect(this.x-10,this.y-10,this.width+20,this.height+30);
			
			if (this.shield.on){
				contextPlayer.drawImage(this.shielded_image,this.x,this.y);
			} else {
				contextPlayer.drawImage(this.unshieled_image,this.x,this.y);
			}
			this.drawn = true;
		}
	};
	this.update = function(){
		if(keys[key.up]) {this.y-=this.speed; this.drawn = false;}
		if(keys[key.down]) {this.y+=this.speed; this.drawn = false;}
		if(keys[key.left]) {this.x-=this.speed; this.drawn = false;}
		if(keys[key.right]) {this.x+=this.speed; this.drawn = false;}
		this.shield.update();
		if(this.shield.switched) {this.drawn = false;}
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;
		if(this.health<=0){
			game_over = true;
		}
		
	};
};

function Caroler(image,x,y) {
	this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  this.image.width;
	this.height =  this.image.height;
	this.drawn = false;
	this.speed = 0.25;
	this.bolas = new Bolas(this.x,this.y+15)
	this.destroyed = false;
	this.destroyed_count = 0;
	this.draw =  function(){
		if(this.destroyed){
			
			if(this.destroyed_count%4==1||this.destroyed_count%4==2){
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
				contextPlayer.drawImage(this.image,this.x,this.y);
			}else{
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			}
		} else {
			if(!this.drawn){
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
				contextPlayer.drawImage(this.image,this.x,this.y);
				this.drawn = true;
			}
			this.bolas.draw();
		}
	};
	this.cleanup = function(){
		return (this.x > width+this.width || this.y > height+this.height) || (this.destroyed && this.destroyed_count > 100)
	};
	this.update = function(){
		if (this.destroyed){
			this.destroyed_count++;
		}else{
			this.bolas.update();
			this.y += this.speed;
			this.drawn = false;
		}
	};
};

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function Bolas(x,y){
	// this.image = image;
	this.x =  x;
	this.y =  y;
	this.width = 6;
	this.height = 6;
	this.size = 3;
	this.speed = 6;
	this.rotation = randomChoice([4,-4,5,-5]);
	if (this.rotation<0){
		this.direction = 90;
	} else {
		this.direction = 270;
	}
	this.reversed = false;
	this.draw = function(){
			contextBackground.clearRect(this.x-this.width,this.y-this.height,this.width*2,this.height*2);
			contextBackground.beginPath();
	    	contextBackground.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
	    	if(this.reversed){
	    		contextBackground.fillStyle = 'pink';
	    	}else{
	    		contextBackground.fillStyle = 'red';
	    	}
	    	contextBackground.fill();
	};
	this.update = function(){
		this.x += offset_x(this.direction,this.speed);
		this.y += 0.25
		this.y += offset_y(this.direction,this.speed);
		this.direction += this.rotation;
	};
};

function Wilderkind(image,x,y) {
	this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  50;
	this.height =  50;
	this.drawn = false;
	this.speed = 7;
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			contextPlayer.drawImage(this.image,this.x,this.y);
			this.drawn = true;
		}

	};
	this.update = function(){

	};
};

function offset_x(direction,distance){
	return Math.sin((direction/180)*Math.PI) * distance;
}
	function offset_y(direction,distance){
		return Math.cos((direction/180)*Math.PI) * distance;
	}

var carolers = [];
var wilderkin = [];
var game_over = false;

function init(){
	//Howler Test
	var chimes = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/131979__juskiddink__chimes.wav']}).play();
	
	player = new Player();
	loop();
	// DON'T PUT ANYTHING AFTER THE GAME LOOP STARTS!
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
		}
		if(collision(caroler.bolas,player)){
			if (player.shield.on){
				caroler.bolas.rotation = caroler.bolas.rotation * -1
				caroler.bolas.direction = caroler.bolas.direction * -1
				caroler.bolas.reversed = true;
			} else{
				player.health--;
				
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

function loadImages(paths){
	requiredImages = paths.length;
	for(i in paths){
		var img = new Image();
		img.src = paths[i];
		images[i] = img;
		images[i].onload = function(){
			doneImages++;
		}
	}
}

function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
};

function checkImages(){
	if(doneImages>=requiredImages){
		init();
	}else{
		setTimeout(function(){
			checkImages();
		}, 10);
	}
}
contextBackground.font = "bold 50px monaco";
contextBackground.fillStyle = "white";
contextBackground.fillText("loading",width/2-100,height/2);

loadImages(["Art/test_ship_shields_up.png", "Art/test_ship_shields_down.png"]);

checkImages();
