
function Wilderkind(image,x,y) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.width =  this.image.width;
	this.height =  this.image.height;
	this.direction = 60;
	this.destroyed = false;
	this.speed = 0.7;
	this.bounce_speed=0;
	this.pulled = false;
	this.bell = null;
	this.draw = function(){
		if(!this.destroyed){
			contextPlayer.clearRect(this.x-1,this.y-1,this.width+2,this.height+2);
			contextPlayer.drawImage(this.image,this.x,this.y);
			this.drawn = true;
		}
	};
	this.update = function(){
		if(!this.destroyed){
			if(!(this.bell == null) && this.bell.time>=this.bell.duration){
				this.pulled = false;
				this.bounce_speed = 0
				if (wilderkin.length>=2){
					for (i = 0; i < wilderkin.length; i++) { 
				    	for (j = i+1; j < wilderkin.length; j++) { 
				    		w1 = wilderkin[i];
				    		w2 = wilderkin[j];
				    		if (collision(w1,w2)){
				    			if(w1.pulled || w2.pulled){
				    				contextPlayer.clearRect(this.x-2,this.y-2,this.width+2,this.height+2);
				    				w1.destroyed = true;
				    				w2.destroyed = true;
				    			}
				    		}
				    	}
					}
				}
			}
			if (this.bounce_speed > 0.01){
				this.bounce_speed -= 0.009; 
			}

			if (this.pulled && !(this.bell == null)){
				xdiff = this.bell.x - this.x;
				ydiff = this.bell.y - this.y;
			} else{
				xdiff = player.x - this.x;
				ydiff = player.y - this.y;
			}

			this.direction = Math.atan(xdiff/ydiff)*180/Math.PI;
			if (ydiff > 0){
				this.x += offset_x(this.direction,this.speed-this.bounce_speed)
				this.y += offset_y(this.direction,this.speed-this.bounce_speed)
			} else{
				this.x -= offset_x(this.direction,this.speed-this.bounce_speed)
				this.y -= offset_y(this.direction,this.speed-this.bounce_speed)
			}
		}
	};
	this.cleanup = function(){
		return (this.destroyed)
	};
};