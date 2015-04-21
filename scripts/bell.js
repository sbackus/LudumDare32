
function Bell(x,y,size) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.width = this.size;
	this.height = this.size;
	this.destroyed = false;
	this.time = 0;
	this.duration = 150;

	this.draw = function(){
		contextBackground.clearRect(this.x-this.width,this.y-this.height,this.width*2,this.height*2);
 		contextBackground.beginPath();
 		contextBackground.strokeStyle = 'white';
       	contextBackground.arc(this.x, this.y, this.time%this.size, 0, 2 * Math.PI, false);
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