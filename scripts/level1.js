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

var avatar = null;
/*
up - 38
down - 40
left - 37
right - 39

space - 32

w - 87
a - 65
s - 83
d - 68
*/

$(document).keydown(function(e){
	keys[e.keyCode ? e.keyCode : e.which] = true;
});

$(document).keyup(function(e){
	delete keys[e.keyCode ? e.keyCode : e.which];
});


function player(image) {
	this.image = image;
	this.x =  width/2;
	this.y =  height/2;
	this.width =  40;
	this.height =  40;
	this.speed = 7;
	this.draw =  function(){
		contextPlayer.drawImage(this.image,this.x,this.y)
	};
	this.update = function(){
		if(keys[38]) this.y-=this.speed;
		if(keys[40]) this.y+=this.speed;
		if(keys[37]) this.x-=this.speed;
		if(keys[39]) this.x+=this.speed;

		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;
	};
	this.touching =  function(other){
		return !(this.x > other.x + other.width ||
			this.x + this.width < other.x ||
			this.y > other.y + other.height ||
			this.y + this.height < other.y);
	};
};

function init(){
	avatar = new player(images[0]);
	loop();
}

function update(){
	avatar.update();
}

function render(){
	contextBackground.clearRect(0,0,width,height)
	contextPlayer.clearRect(0,0,width,height)

	avatar.draw();
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
