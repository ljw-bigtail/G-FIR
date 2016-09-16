var me = true;
var over = false;

var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var color = document.getElementById('color');
var white = document.getElementById('white');
var re = document.getElementById('re');
var message = document.getElementById('message');
var title = document.getElementById('title');

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

var p1 = new Image();p1.src = "img/1.jpg",
	p2 = new Image();p2.src = "img/2.jpg";

window.onload = function(){
	drawChessBoard();	
	changeColor();
}
/*改变背景色*/
var changeColor = function(){
	pic1.onclick = function(){
		context.drawImage(p1,0,0,chess.width,chess.height);
		drawChessBoard();
	};
	pic2.onclick = function(){
		context.drawImage(p2,0,0,chess.width,chess.height);
		drawChessBoard();
	};
	color.onclick = function(){
		var R = Math.floor(Math.random()*255),G = Math.floor(Math.random()*255),
		    B = Math.floor(Math.random()*255),A = Math.floor(Math.random());
		var bgColor = "rgb("+R+","+G+","+B+")";
		context.fillStyle = bgColor;
		context.fillRect(0,0,chess.width,chess.height);
		drawChessBoard();
	};
	white.onclick = function(){
		context.fillStyle = "#f0f0f0";
		context.fillRect(0,0,chess.width,chess.height);
		drawChessBoard();
	};
	re.onclick = function(){
		location.reload();
	};
}
/*
	画棋盘
*/
var drawChessBoard = function(){
	context.strokeStyle = "#bfbfbf";
	for (var i = 0; i < 15; i++) {
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);/*横线*/
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);/*竖线*/
		context.stroke();
	}
}
/*
	棋子：i,j是位置索引，me判断是否是黑子
*/
var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	context.fillStyle = gradient;
	context.fill();
}