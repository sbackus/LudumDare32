function Player() {
	this.shielded_image = images[0];
	this.unshieled_image = images[1];
	this.x =  width/2;
	this.y =  height/2;
	this.width = this.shielded_image.width;
	this.height =  this.shielded_image.width;
	this.drawn = false;
	this.speed = 6;
	this.shield = new Shield();
	this.health=20;
	this.draw =  function(){
		this.shield.draw();

		//draw health bar
		contextBackground.clearRect(this.x, this.y+this.height + 15,30,10);
		if (this.health>5){
			contextBackground.fillStyle = "green";
		}else{
			contextBackground.fillStyle = "red";
		}
		contextBackground.fillRect(this.x+9, this.y+this.height +15, this.health, 5);

		if(!this.drawn){
			contextPlayer.clearRect(this.x-10,this.y-10,this.width+20,this.height+30);
			
			if (this.shield.on){
				contextPlayer.drawImage(this.shielded_image,this.x,this.y);
			} else {
				contextPlayer.drawImage(this.unshieled_image,this.x,this.y);
			}
			this.drawn = true;
		}
	};
	this.update = function(){
		if(keys[key.up]) {this.y-=this.speed; this.drawn = false;}
		if(keys[key.down]) {this.y+=this.speed; this.drawn = false;}
		if(keys[key.left]) {this.x-=this.speed; this.drawn = false;}
		if(keys[key.right]) {this.x+=this.speed; this.drawn = false;}
		this.shield.update();
		if(this.shield.switched) {this.drawn = false;}
		if(this.x < 0) this.x = 0;
		if(this.y < 0) this.y = 0;
		if(this.x > width-this.width) this.x = width-this.width;
		if(this.y > height-this.height) this.y = height-this.height;
		if(this.health<=0){
			game_over = true;
		}
		
	};
};