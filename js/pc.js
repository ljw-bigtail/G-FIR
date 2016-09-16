/*
	人机对战
*/
chess.onclick = function(e){
	if (over) {
		return;
	}
	if (!me) {
		return;
	}
	var x = e.offsetX,
		y = e.offsetY;
	var i = Math.floor(x/30),
		j = Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i,j,me);
		console.log("黑子",i+1,j+1);
		chessBoard[i][j] = 1;	
		message.innerHTML="该你了~~";	
		for (var k = 0; k < count; k++) {
			/*判断黑子赢*/
			if(wins[i][j][k] && chessBoard[i][j] == 1){
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k]==5) {
					message.innerHTML="你赢啦！";
					over = true;
				}
			}
		}
		/*计算机AI*/
		if (!over) {
			me = !me;
			conputerAI();	
		}
	}else{
		message.innerHTML="不能重复落子!";
	}
}

var conputerAI =function(){
	var myScore =[],
		computerScore = [];
	var max = 0,u = 0,v = 0;
	//新建数组
	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if(chessBoard[i][j] == 0){
				for (var k = 0; k < count; k++) {
					if(wins[i][j][k]){
						/*AI判断玩家棋子数量进行拦截*/
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}else if (myWin[k] == 2) {
							myScore[i][j] += 400;						
						}else if (myWin[k] == 3) {
							myScore[i][j] += 2000;						
						}else if (myWin[k] == 4) {
							myScore[i][j] += 10000;						
						}
						/*AI判断AI棋子数量进行填补*/
						if(computerWin[k] == 1){
							computerWin[i][j] += 220;
						}else if (myWin[k] == 2) {
							computerWin[i][j] += 420;						
						}else if (myWin[k] == 3) {
							computerWin[i][j] += 2100;						
						}else if (myWin[k] == 4) {
							computerWin[i][j] += 20000;						
						}
					}
				}
				if(myScore[i][j] > max){
					max = myScore[i][j];
					u = i;
					v = j;
				}else if (myScore[i][j] = max) {
					if(computerScore[i][j] > computerScore[u][v]){
						u = i;
						v = j;
					}
				}
				if(computerScore[i][j] > max){
					max = computerScore[i][j];
					u = i;
					v = j;
				}else if (computerScore[i][j] = max) {
					if(myScore[i][j] > myScore[u][v]){
						u = i;
						v = j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	console.log("白子",u+1,v+1);
	chessBoard[u][v] = 2;
	for (var k = 0; k < count; k++) {
		/*判断白子赢*/
		if(wins[u][v][k] && chessBoard[u][v] == 2){
			computerWin[k]++;
			myWin[k] = 6;
			if (computerWin[k]==5) {
				message.innerHTML="电脑赢了！";	
				over = true;
			}
		}
	}
	/*计算机AI*/
	if (!over) {
		me = !me;
	}
}