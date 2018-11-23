/**
 * create by fuziwang 2018/11/23
 * 1. 当鼠标放到某张图片上去的时候，修改图片上的地址
 * 2. 鼠标放到大图上的时候，会动态的修改右边图片的一个位置
 *      显示一个区域，用来确定鼠标放下的位置
 *      显示右边的区域，用于放大图片的展示效果
 */
var list = document.getElementsByTagName('ul')[0],
    imgs = list.querySelectorAll('img');
    img = document.querySelector('.pic img'),
    pic = document.querySelector('.itemarea .pic'),
    cover = document.querySelector('.cover'),
    detail = document.querySelector('.detail');

list.addEventListener('mousemove',function(e){
    if(e.target.tagName == 'IMG'){
        img.src = e.target.src;
        detail.style.backgroundImage = 'url('+ e.target.src +')';
        imgs.forEach((item)=>{
            item.className = '';
        })
        e.target.className = 'current';
    }
});

pic.addEventListener('mousemove',function(e){
    var x = e.clientX,
        y = e.clientY,
        cx = pic.getBoundingClientRect().x,
        cy = pic.getBoundingClientRect().y,
        tx = x - cx - 50,
        ty = y - cy - 50;
    // console.log(pic.getBoundingClientRect());
    if (tx<0) tx = 0;
    if(tx > 250) tx = 250;
    if (ty< 0) ty = 0;
    if(ty> 250) ty = 250;
    cover.style.display = 'block';
    detail.style.display = 'block';
    detail.style.backgroundPosition = tx / 250 * 100 + '% ' + ty / 250 * 100 + '%';// 核心代码
    cover.style.left = tx + 'px';
    cover.style.top = ty + 'px';
});
pic.addEventListener('mouseout',function(){
    cover.style.display = 'none';
    detail.style.display = 'none';
})
