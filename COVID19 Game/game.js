//Loading images
function load_images(){
	virus_image = new Image;
	virus_image.src = "assets/virus.png";
	player_img = new Image;
	player_img.src = "assets/superhero.png";
	gem_image = new Image;
	gem_image.src = "assets/gem1.png";
}


//Adding movement to bird
function init()
{
	game_over = false;
	//DOM tree traversal to find an element by id
	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	//changing height and width of canvas
	W = 1000;
	H = 400;
	canvas.width = W;
	canvas.height = H;

	//working with canvas
	pen = canvas.getContext('2d');
	console.log(pen);

	//score variable
	score = 0;

	//We want to create a box
    //We use JSON objects

	bird1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	bird2 = {
		x : 300,
		y : 50,
		w : 60,
		h : 70,
		speed : 30,
	};
	bird3 = {
		x : 450,
		y : 20,
		w : 60,
		h : 80,
		speed : 45,
	};
	enemy = [bird1,bird2,bird3];
	//creating player which can be in both stationary or moving state
	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : "false",
	};
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	};

	//create an event listener for moving the player
	canvas.addEventListener('mousedown',function(){
		//console.log("You pressed mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		//console.log("You released mouse");
		player.moving = false;
	});

}
//Game loop
//same as animation concept but little using loops
function draw(){
	//Clear the old screen (entire area) check the increment command in update
	pen.clearRect(0,0,W,H);
	//Drawing this box on screen
	pen.fillStyle = "Yellow";
	//pen.fillRect(bird.x,bird.y,bird.w,bird.h);
	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
	for(let i=0;i<enemy.length;i++)
	pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	
	pen.fillText("Score: " + score,10,10);
}

function isColliding(b1,b2){
	//to see if there is any collission
	if(Math.abs(b1.x-b2.x)<=b1.h && Math.abs(b1.y-b2.y)<=b2.h)
		return true;
	else
		return false;
}

function update(){

	//player state
	if(player.moving == true){
		player.x += player.speed;
		score += 20;
	}
	//loop check collision between enemy and player
	for(let i=0;i<enemy.length;i++)
	{
		if(isColliding(enemy[i],player))
			score -= i*100;
			if(score<0)
			{
				game_over = true;
				alert("Game over");
			}
	}
	//check for collission
	if(isColliding(gem,player))
	{
		game_over = true;
		draw();
		alert("You have scored: " + score);
	}
	for(let i=0;i<enemy.length;i++)
	{
		enemy[i].y += enemy[i].speed;//if only this is kept it continuous draws the box again and again
		//if it reaches bottom then make it reappear from start
		if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
			enemy[i].speed *= -1; //speed becomes -10 and it starts going up so that we have an oscillatory motion
		}
	}
}

function gameloop(){
	if(game_over)
		clearInterval(f);
	draw();
	update();
}

//calling function to load the images
load_images();
//start of the game
init();

//Repeatedly call gameloop
var f = setInterval(gameloop,100)//we dont use while loop as it doesnt hava a delay and puts load on system
clearInterval();