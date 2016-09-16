/*
	人人对战
	点击落子，传入坐标，生成索引再画子
*/
chess.onclick = function(e){
	if (over) {
		return;
	}
	var x = e.offsetX,
		y = e.offsetY;
	var i = Math.floor(x/30),
		j = Math.floor(y/30);
	if(chessBoard[i][j] == 0){
		oneStep(i,j,me);
		if(me){
			chessBoard[i][j] = 1;
			message.innerHTML="轮到：白棋";
		}else{
			chessBoard[i][j] = 2;
			message.innerHTML="轮到：黑棋";
		}
		console.log(chessBoard[i][j]);	
		me = !me;
		for (var k = 0; k < count; k++) {
			//判断黑子赢
			if(wins[i][j][k] && chessBoard[i][j] == 1){
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k]==5) {
					alert("黑子赢了");
					over = true;
				}
			}
			//判断白子赢
			if(wins[i][j][k] && chessBoard[i][j] == 2){
				computerWin[k]++;
				myWin[k] = 6;
				if (computerWin[k]==5) {
					alert("白子赢了");
					over = true;
				}
			}
		}
	}else{
		console.log("不能重复落子。");
	}
}