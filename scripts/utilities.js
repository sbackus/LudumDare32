function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

function offset_x(direction,distance){
	return Math.sin((direction/180)*Math.PI) * distance;
}
function offset_y(direction,distance){
	return Math.cos((direction/180)*Math.PI) * distance;
}

function collision(first, second){
	return !(first.x > second.x + second.width ||
		first.x + first.width < second.x ||
		first.y > second.y + second.height ||
		first.y + first.height < second.y);
};

function loop(){
	if (!game_over&&!game_won){
		requestAnimFrame(function(){
			loop();
		});
		update();
		render();
	}
	else if(game_over){
		show_game_over_screen();
	}
	else if(game_won){
		["#playerCanvas","#backgroundCanvas","#projectileCanvas","statusCanvas"].forEach(function(canvas){
			$(canvas).fadeOut(900);
		});
	}
}

function show_game_over_screen(){
	contextBackground.font = "bold 50px monaco";
	contextBackground.fillStyle = "white";
	contextBackground.fillText("Game Over",(width/2)-165,(height/2)-90);
	contextBackground.fillText("Retry?",(width/2)-125,(height/2)-40);
	chimes.stop().fadeOut( 0, 2000 );
	lowNote2.stop().fadeOut( 0, 2000 );
	sadBell.play().fadeOut( 0, 3000 );
	lowNote.play().fadeOut( 0, 5000 );
	var canvas = document.getElementById('playerCanvas');
	canvas.addEventListener('click', function(evt) {
        location.reload();
	});
};