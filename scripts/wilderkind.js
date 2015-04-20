
function Wilderkind(image,x,y) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.width =  50;
	this.height =  50;
	this.direction = 60;
	this.speed = 0.7;
	this.draw = function(){
		contextPlayer.clearRect(this.x,this.y,this.width,this.height);
		contextPlayer.drawImage(this.image,this.x,this.y);
		this.drawn = true;
	};
	this.update = function(){
		// console.log(offset_y(this.direction,this.speed));
		xdiff = player.x - this.x;
		ydiff = player.y - this.y;

		// while (xdiff>this.speed || ydiff>this.speed){
		// 	xdiff *= 0.5;
		// 	ydiff *= 0.5;
		// }
		
		this.direction = Math.atan(xdiff/ydiff)*180/Math.PI;
		console.log(this.direction);


		console.log(this.x + "  " + this.y);
		if (ydiff > 0){
			this.x += offset_x(this.direction,this.speed)
			this.y += offset_y(this.direction,this.speed)
		} else{
			this.x -= offset_x(this.direction,this.speed)
			this.y -= offset_y(this.direction,this.speed)
		}



	};
	this.cleanup = function(){
		return (this.x > width+this.width || this.y > height+this.height) || (this.destroyed && this.destroyed_count > 100)
	};
};