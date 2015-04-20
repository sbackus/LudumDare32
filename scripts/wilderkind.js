function Wilderkind(image,x,y) {
	this.image = image;
	this.x =  x;
	this.y =  y;
	this.width =  50;
	this.height =  50;
	this.drawn = false;
	this.speed = 7;
	this.draw =  function(){
		if(!this.drawn){
			contextPlayer.clearRect(this.x,this.y,this.width,this.height);
			contextPlayer.drawImage(this.image,this.x,this.y);
			this.drawn = true;
		}

	};
	this.update = function(){

	};
};