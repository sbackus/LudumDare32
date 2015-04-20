
function Bell(x,y) {
	this.x = x;
	this.y = y;
	this.size = 50;
	this.width = this.size;
	this.height = this.size;
	this.destroyed = false;
	this.time = 0;
	this.duration = 150;

	this.draw = function(){
		contextBackground.clearRect(this.x-this.width,this.y-this.height,this.width*2,this.height*2);
 		contextBackground.beginPath();
 		contextBackground.strokeStyle = 'white';
       	contextBackground.arc(this.x+this.size/2, this.y+this.size/2, this.time%this.size, 0, 2 * Math.PI, false);
       	contextBackground.stroke();
	};
	this.update = function(){
		this.time++;
		if (this.time > this.duration){
			this.destroyed = true;
		}
	};
	this.cleanup = function(){
		return (this.destroyed)
	};
};