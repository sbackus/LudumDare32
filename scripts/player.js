function Player() {
	this.shielded_image = images[0];
	this.unshieled_image = images[1];
	this.x =  width/2 -10;
	this.y =  height/2 -10;
	this.width = this.shielded_image.width;
	this.height =  this.shielded_image.height;
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
			contextPlayer.clearRect(this.x-20,this.y-20,this.width+30,this.height+40);
			
			if (this.shield.on){
				contextPlayer.drawImage(this.shielded_image,this.x,this.y);
			} else {
				contextPlayer.drawImage(this.unshieled_image,this.x,this.y);
			}
			this.drawn = true;
		}
	};
	this.update = function(){
		if(keys[key.up]||keys[key.w]) {this.y-=this.speed; this.drawn = false;}
		if(keys[key.down]||keys[key.s]) {this.y+=this.speed; this.drawn = false;}
		if(keys[key.left]||keys[key.a]) {this.x-=this.speed; this.drawn = false;}
		if(keys[key.right]||keys[key.d]) {this.x+=this.speed; this.drawn = false;}
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