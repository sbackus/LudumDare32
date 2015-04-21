
function Bolas(x,y){
	this.image = images[2];
	this.imageAlt = images[3];
	this.x =  x;
	this.y =  y;
	this.width =  this.image.width;
	this.height =  this.image.height;
	this.speed = 6;
	this.rotation = randomChoice([4,-4,5,-5]);
	if (this.rotation<0){
		this.direction = 90;
	} else {
		this.direction = 270;
	}
	this.reversed = false;
	this.draw = function(){		
	    	if(this.reversed){
	    		contextBackground.clearRect(this.x,this.y,this.width,this.height);
				contextBackground.drawImage(this.imageAlt,this.x,this.y);
	    	}else{
	    		contextBackground.clearRect(this.x,this.y,this.width,this.height);
				contextBackground.drawImage(this.image,this.x,this.y);
	    	}
	};
	this.update = function(){
		this.x += offset_x(this.direction,this.speed);
		this.y += 0.25
		this.y += offset_y(this.direction,this.speed);
		this.direction += this.rotation;
	};
};