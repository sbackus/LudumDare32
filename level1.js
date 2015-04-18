alert(state.history[0].variables.my_var)
if (state.history[0].variables.my_var == 0){
	alert("test")
}
alert(state.history[0].variables.my_var);
state.history[0].variables.my_var = 1;

var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

		var keys = [];

var message = ""

var width = 500, height = 400, speed = 5

var robot = {
	x: width/2,
	y: height/2,
	width: 20,
	height: 20,
	draw: function(){
		context.fillStyle = "black"
		context.fillRect(this.x, this.y, this.width, this.height)
		context.fillStyle = "grey"
		context.fillRect(this.x+3, this.y+14, 13, 4)

		this.draw_eye(this.x+5, this.y+5);
		this.draw_eye(this.x+15, this.y+5);
	},
	update: function(){
		if(keys[38]) this.y-=speed;
		if(keys[40]) this.y+=speed;
		if(keys[37]) this.x-=speed;
		if(keys[39]) this.x+=speed;

		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;
	},
	draw_eye: function(x,y){
		context.beginPath();
    	context.arc(x, y, 3, 0, 2 * Math.PI, false);
    	context.fillStyle = 'green';
    	context.fill();
    }
};

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function box(contents) {
	this.contents = contents;
	this.x =  Math.random() * width;
	this.y =  Math.random() * height;
	this.width =  10;
	this.height =  10;
	this.color = getRandomColor();
	this.draw =  function(){
		context.fillStyle = this.color
		context.fillRect(this.x, this.y, this.width, this.height)
	};
	this.touching =  function(other){
		return !(this.x > other.x + other.width ||
			this.x + this.width < other.x ||
			this.y > other.y + other.height ||
			this.y + this.height < other.y);
	};
};

var things = [
			"a fluffy kitten!",
			"a rotten banana", 
			"a pile of rusty screws", 
			"a wobbly unicycle",
			"a delicious candy bar",
			"a bunch of wild flowers",
			"a light switch",
			"a disposable camera",
			"a guinea pig named Lola"
			]
var boxes = []

things.forEach(function(thing){
	boxes = boxes.concat(new box(thing));
});

window.addEventListener("keydown", function(e){
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);


function game(){
	update();
	render();
}

function update(){
	robot.update();

	boxes.forEach(function(box){
		if (box.touching(robot)){
			message = "You found " + box.contents;
		}
	});
}

function render(){
	context.clearRect(0, 0, width, height);
	robot.draw();
	boxes.forEach(function(box){
		box.draw();
	});

	context.fillStyle = "black";
	context.font = "bold 30px helvetica";
	context.fillText(message, 10, 30);
}

setInterval(function(){
	game();
}, 1000/60)