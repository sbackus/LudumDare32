function Caroler(image,x,y) {
	this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  this.image.width;
	this.height =  this.image.height;
	this.drawn = false;
	this.speed = 1;
	this.bolas = new Bolas(this.x,this.y+15)
	this.destroyed = false;
	this.destroyed_count = 0;
	this.draw =  function(){
		if(this.destroyed){
			
			if(this.destroyed_count%4==1||this.destroyed_count%4==2){
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
				contextPlayer.drawImage(this.image,this.x,this.y);
			}else{
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			}
		} else {
			if(!this.drawn){
				contextPlayer.clearRect(this.x,this.y,this.width,this.height);
				contextPlayer.drawImage(this.image,this.x,this.y);
				this.drawn = true;
			}
			this.bolas.draw();
		}
	};
	this.cleanup = function(){
		return (this.x > width+this.width || this.y > height+this.height) || (this.destroyed && this.destroyed_count > 100)
	};
	this.update = function(){
		if (this.destroyed){
			this.destroyed_count++;
		}else{
			this.bolas.update();
			this.y += this.speed;
			this.drawn = false;
		}
	};
};
