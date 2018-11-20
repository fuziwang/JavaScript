var canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d');

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
    context.arc(x,y,10,0,2*Math.PI);
    context.fill();
    context.stroke();
}

canvas.addEventListener('click',function(e){
    drawchess(e.clientX,e.clientY,'black');
},false);