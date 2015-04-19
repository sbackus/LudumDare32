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

$(document).keydown(function(e){
	console.log("keydown");
});

function init(){
	loop();
	contextPlayer.drawImage(images[0],10,10)
}

function update(){

}

function render(){
	contextBackground.clearRect(0,0,width,height)
}

function loop(){
	requestAnimFrame(function(){
		loop();
	});
	// update();
	// render();
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
