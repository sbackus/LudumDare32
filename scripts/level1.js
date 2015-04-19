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

function Player() {
	this.shielded_image = images[0];
	this.unshieled_image = images[1];
	this.x =  width/2;
	this.y =  height/2;
	this.width =  40;
	this.height =  40;
	this.drawn = false;
	this.speed = 7;
	this.shielded=false;
	this.shield_timer=0;
	this.shield_duration=10;
	this.shield_cooldown=10;
	this.health=3;
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x-10,this.y-10,this.width+20,this.height+30);
			if (this.shielded){
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

		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;

		if(keys[key.space]&&this.shield_timer == 0){
			this.shielded = true; 
			this.drawn = false;
		}
	};
};

function Caroler(image,x,y) {
	this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  50;
	this.height =  50;
	this.drawn = false;
	this.speed = 0.25;
	this.projectile = new Projectile(this.x,this.y,320)
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			contextPlayer.drawImage(this.image,this.x,this.y);
			this.drawn = true;
		}
		this.projectile.draw();
	};
	this.update = function(){
		this.projectile.update();
		this.y += this.speed;
		this.drawn = false;
	};
};

function Projectile(x,y,direction){
	// this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  6;
	this.height =  6;
	this.size = 3;
	this.speed = 6;
	this.direction = direction;
	this.draw = function(){
			contextBackground.clearRect(this.x-this.width,this.y-this.height,this.width*2,this.height*2);
			contextBackground.beginPath();
	    	contextBackground.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
	    	contextBackground.fillStyle = 'red';
	    	contextBackground.fill();
	};
	this.update = function(){
		this.x += offset_x(this.direction,this.speed);
		this.y += 0.25
		this.y += offset_y(this.direction,this.speed);
		this.direction += 2;
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

var carolers = []
var wilderkin = []

function init(){
	player = new Player();
	for(var i=0; i < 5; i++){
	    carolers = carolers.concat(new Caroler(images[0], i*85+40, 10));
	}
	loop();
	// Don't put anything after the loop starts!
}

function update(){
	player.update();

	carolers.forEach(function(caroler) {
	    caroler.update();
	});
	//delete references to offscreen objects
	[carolers].forEach(function(list){  
		for (i = 0; i < list.length; ++i) {
		    if (list[i].x > width+list[i].width || list[i].y > height+list[i].height) {
		        list.splice(i--, 1);
		    }
		};
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
	update();
	render();
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
