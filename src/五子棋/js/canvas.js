/**
 * author:Frewen
 * date:2018/11/20
 * 制作流程：
 * 1 绘制棋盘 - 采用canvas画布进行绘制
 * 2 绘制棋子
 *  2.1 使用context.arc();绘制棋子
 *  2.2 使用addEventListener监听事件点击事件进行绘制
 *  2.3 使用交换手，一人来一次，改变颜色
 *  2.4 落子点的问题（棋子必须下在交叉点的位置），自瞄系统，通过Math.floor进行判断
 *  2.5 友军的判断 已经下过棋的地方不下
 * 3 游戏胜负的判断
 *  平局 胜利 失败
 *  当前下下去的棋子一定会参与到胜负判断效果此时下棋的人要么赢要么不赢（此时棋子的棋子的位置作为胜负的判断点）
 *  一条线上左右方向是否有5个连续的棋子
 */
var canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    step = 0,
    chesscolor = ['black','white'],
    maparr = [];

for(var i = 0;i<14;i++){
    maparr[i] = [];
    for(var j = 0;j<14;j++){
        maparr[i][j] = 0;
    }
}

for(var i = 1;i<15;i++){
    context.moveTo(30*i,30);
    context.lineTo(30*i,420);
    context.moveTo(30,30*i);
    context.lineTo(420,30*i);
}
context.stroke();// 开始绘制


function drawchess(x,y,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,12,0,2*Math.PI,false);
    context.fill();
    context.stroke();
}
var mode = [
    [1,0],
    [0,1],
    [1,1],
    [1,-1]
];
function checkwin(x,y,color,mode){
    var count = 0;
    for(var i = 1;i<5;i++){
        if(maparr[x+i*mode[0]]){
            if(maparr[x+i*mode[0]][y+i*mode[1]] == color){
                count++;
            }else{
                break;
            }
        }
    }
    for (var i = 1; i < 5; i++) {
        if (maparr[x - i * mode[0]]) {
            if (maparr[x - i * mode[0]][y + i * mode[1]] == color) {
                count++;
            } else {
                break;
            }
        }
    }
    if(count == 4){
        alert(color + ' win!');
    }
}

canvas.addEventListener('click',function(e){
    var dx = Math.floor((e.offsetX + 15)/30)*30;
    var dy = Math.floor((e.offsetY + 15)/30)*30;
    if (dx == 0 || dy == 0 || dx == 450 || dy == 450) {
        return;// 不在棋盘绘制交叉点的位置不进行绘制
    }
    if(maparr[dx/30-1][dy/30-1] == 0){
        drawchess(dx, dy, chesscolor[step % 2]);
        maparr[dx / 30 - 1][dy / 30 - 1] = chesscolor[step % 2];
        checkwin(dx / 30 - 1, dy / 30 - 1, chesscolor[step % 2],mode[0]);
        checkwin(dx / 30 - 1, dy / 30 - 1, chesscolor[step % 2], mode[1]);
        checkwin(dx / 30 - 1, dy / 30 - 1, chesscolor[step % 2], mode[2]);
        checkwin(dx / 30 - 1, dy / 30 - 1, chesscolor[step % 2], mode[3]);
        step++;
    }
});