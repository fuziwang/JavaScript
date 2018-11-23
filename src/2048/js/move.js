/**
 * create by fuziwang 2018/11/23
 */
// 模块化开发
var json = {
    flag:false,
    // 创建初始化函数
    init:function(){
        var oTab = document.querySelector('#tab'),
            str = '',
            id = 1;
        for(var i = 0;i<4;i++){
            str += '<tr>';
            for(var j = 0;j<4;j++){
                str += '<td id="' + id +'"></td>';
                id++; 
            }
            str += '</tr>';
        }
        oTab.innerHTML = str;
        for(var i = 0;i<2;i++){
            this.randomNum();
        }
        this.result();
    },
    // 创建一个任意区间的随机函数
    myRandom:function(min,max){
        // (0,1] -> (2,8] (0,1]*6+2
        return Math.round(Math.random() * (max-min) + min);
    },
    // 随机在格子上生成一个数字
    randomNum:function(){
        var num = this.myRandom(1,16),
            oGrid = document.getElementById(num);
        if(oGrid.innerHTML === ''){
            oGrid.innerHTML = '' + this.myRandom(1,2)*2;
        }else{
            this.randomNum();
        }
    },
    // 上键
    top:function(){
        for(var i = 1;i<=4;i++){
            for(var j = i;j<=i+12;j+=4){
                for(var k = j;k>4;k-=4){
                    this.change(document.getElementById(k-4),document.getElementById(k));
                }
            }
        }
    },
    // 下键
    bottom: function () {
        for (var i = 1; i <= 4; i++) {
            for (var j = i+12; j >=i; j-= 4) {
                for (var k = j; k <13; k += 4) {
                    this.change(document.getElementById(k + 4), document.getElementById(k));
                }
            }
        }
    },
    // 左键
    left:function(){
        for(var i = 1;i<=13;i+=4){
            for(var j = i;j<=i+3;j++){
                for(var k = j;k > i;k--){
                    this.change(document.getElementById(k-1),document.getElementById(k));
                }
            }
        }
    },
    // 右键
    right:function(){
        for(var i = 1;i<=13;i+=4){
            for(var j = i+3;j>=i;j--){
                for(var k = j;k < i+3;k++){
                    this.change(document.getElementById(k+1),document.getElementById(k));
                }
            }
        }
    },
    // 移动和合并检测
    change:function(before,after){
        // 移动
        if(before.innerHTML === '' && after.innerHTML !==''){
            before.innerHTML = after.innerHTML;
            after.innerHTML = '';
            this.flag = true;
        }
        if (before.innerHTML !== '' && after.innerHTML === before.innerHTML){
            before.innerHTML *= 2;// 字符串转化为数字 可以用*=1进行转化
            after.innerHTML = '';
            this.flag = true;
        }
    },
    // 改变颜色计算结果的函数
    result:function(){
        // 定义每一个数字的颜色
        var score = 0;
        var color = {"": "#fff", "2": "#00FF00", "4": "#00CCFF", "8": "#FF9900", "16": "#00CC66", "32": "#FFCCCC", "64": "#FF33FF", "128": "#0066CC","256": "#6633CC", "512": "#FF0099", "1024": "#990033", "2048": "#6600FF", "4096": "#CC0066"};
        for(var i = 1;i<=16;i++){
            var oGrid = document.getElementById(i);
            oGrid.style.backgroundColor = color[oGrid.innerHTML];
            score += oGrid.innerHTML * 10;
        }
        document.querySelector('#score').innerHTML = score;
    }
}

window.onload = json.init();
document.onkeydown = function(e){
    json.flag = false;
    if(/38/.test(e.keyCode)) json.top();
    if (/40/.test(e.keyCode)) json.bottom();
    if (/37/.test(e.keyCode)) json.left();
    if (/39/.test(e.keyCode)) json.right();
    if (/13/.test(e.keyCode)) json.init();

    if(json.flag){
        json.randomNum();
    }
    json.result();
}
var oRestart = document.getElementById("restart");
oRestart.onclick = function () {
    json.init();
};