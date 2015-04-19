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


function Player(image) {
	this.image = image;
	this.x =  width/2;
	this.y =  height/2;
	this.width =  40;
	this.height =  40;
	this.drawn = false;
	this.speed = 7;
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x-10,this.y-10,this.width+20,this.height+30);
			contextPlayer.drawImage(this.image,this.x,this.y);
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
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			contextPlayer.drawImage(this.image,this.x,this.y);
			this.drawn = true;
		}

	};
	this.update = function(){
		if( Math.random() <= 0.0006){
			projectiles = projectiles.concat(new Projectile(this.x,this.y,0,5))
		}
		this.y += this.speed;
		this.drawn = false;
	};
};

function Projectile(x,y,x_speed,y_speed){
	// this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  50;
	this.height =  50;
	this.x_speed = x_speed;
	this.y_speed = y_speed;
	this.draw = function(){
			contextBackground.clearRect(this.x-this.width,this.y-this.height,this.width*2,this.height*2);
			contextBackground.beginPath();
	    	contextBackground.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
	    	contextBackground.fillStyle = 'red';
	    	contextBackground.fill();
	};
	this.update = function(){
		this.x += x_speed;
		this.y += y_speed;
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

var carolers = []
var wilderkin = []
var projectiles = []

function init(){
	player = new Player(images[0]);
	for(var i=0; i < 10; i++){
	    carolers = carolers.concat(new Caroler(images[0], i*45, 10));
	}
	loop();
	// Don't put anything after the loop starts!
}

function update(){
	player.update();

	carolers.forEach(function(caroler) {
	    caroler.update();
	});
	projectiles.forEach(function(projectile) {
	    projectile.update();
	});

	for (i = 0; i < projectiles.length; ++i) {
	    if (projectiles[i].x > width+projectiles[i].width || projectiles[i].y > height+projectiles[i].height) {
	        projectiles.splice(i--, 1);
	        console.log(projectiles.length)
	    }
	};
}

function render(){
	contextBackground.clearRect(0,0,width,height)
	player.draw();
	projectiles.forEach(function(projectile) {
	    projectile.draw();
	});

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
