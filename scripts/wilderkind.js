
function Wilderkind(image,x,y) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.width =  50;
	this.height =  50;
	this.direction = 60;
	this.destroyed = false;
	this.speed = 0.7;
	this.bounce_speed=0;
	this.draw = function(){
		contextPlayer.clearRect(this.x,this.y,this.width,this.height);
		contextPlayer.drawImage(this.image,this.x,this.y);
		this.drawn = true;
	};
	this.update = function(){
		if (this.bounce_speed > 0.01){
			this.bounce_speed -= 0.009;
		}
		xdiff = player.x - this.x;
		ydiff = player.y - this.y;
		
		this.direction = Math.atan(xdiff/ydiff)*180/Math.PI;
		if (ydiff > 0){
			this.x += offset_x(this.direction,this.speed-this.bounce_speed)
			this.y += offset_y(this.direction,this.speed-this.bounce_speed)
		} else{
			this.x -= offset_x(this.direction,this.speed-this.bounce_speed)
			this.y -= offset_y(this.direction,this.speed-this.bounce_speed)
		}
	};
	this.cleanup = function(){
		return (this.destroyed)
	};
};