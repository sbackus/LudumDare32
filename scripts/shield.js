function Shield(){
	this.max_power = 100;
	this.power = this.max_power;
	this.on = false;
	this.recharging = false
	this.switched = false;
	this.draw = function(){
		contextBackground.clearRect(player.x, player.y+player.height +10,30,10);
		contextBackground.fillStyle = "green"
		contextBackground.fillRect(player.x+9, player.y+player.height +10, this.power/5, 5);
	}
	this.update = function(){
		if(keys[key.space]&&this.power >= 0 && !this.recharging){
			if(!this.on){
				song.fadeIn( 0.2, 300 );  //Shields Up Sound
				this.switched = true;
			}else{
				this.switched = false;
			}
			this.on = true;

			this.power--;
			if(this.power <= 0){
				this.recharging = true;
			}
		} else {
			if(this.on){
				song.fadeOut( 0 , 500 );  //Fade Out Shields
				this.switched = true;
				
			}else{
				this.switched = false;
				
			}
			this.on = false;
			
			if (this.power< this.max_power){
				this.power++;
			}
			if(this.power >= this.max_power/2){
				this.recharging = false;
			}
		}
		if (this.switched){
			
		}
	return this.switched;
	}
}