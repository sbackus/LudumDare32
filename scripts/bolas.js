
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