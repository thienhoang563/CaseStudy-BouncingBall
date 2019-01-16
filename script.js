class Bar{
    constructor(speed,x,y,height,width){
        this.speed=speed;
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
    }
    hienThi(){
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');
        ctx.fillRect(this.x,this.y,this.height,this.width);
    }
    leftArrowPressed(){
        this.x+=this.speed;
    }
    rightArrowPressed(){
        this.x-=this.speed;
    }

}
class Ball{
    constructor(dx,dy,x,y, radius, color){
        this.dx=dx;
        this.dy=dy;
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    crashWith(otherobj) {
        // myleft là tọa độ trái của component đang xét
        var myleft = this.x;
        // myright là tọa độ phải của component đang xét = tọa độ trái + độ rộng của component
        var myright = this.x + (this.radius);
        //tọa độ đỉnh của component
        var mytop = this.y;
        //tọa độ đáy của component = tọa độ đỉnh + độ dài của component
        var mybottom = this.y + (this.radius);
        //otherleft tọa độ trái của vật cản otherobj
        var otherleft = otherobj.x;
        //otherright tọa độ phải của vật cản otherobj
        var otherright = otherobj.x + 400;
        //othertop tọa độ đỉnh của vật cản otherobj
        var othertop = otherobj.y;
        //otherbottom tọa độ đáy của vật cản otherobj
        var otherbottom = otherobj.y + 10;
        //khởi tạo crash = true
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            //nếu khối hình không chạm vật cản thì crash = false
            crash = false;
        }
        return crash;
    }

}
var point=0;
var context;
var bi= new Ball(4,4,150,10,20,"#4aff50");
var khay=new Bar(8,500,500,400,20);
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 39:
            khay.leftArrowPressed();
            break;
        case 37:
            khay.rightArrowPressed();
            break;
    }
}
function docReady()
{
    window.addEventListener('keydown',moveSelection);
}
function drawBall(){
    //var canvas = document.getElementById('myCanvas');
    //var ctx = canvas.getContext('2d');
    context= document.getElementById("myCanvas").getContext('2d');
    context.clearRect(0,0,1200,550);
    context.beginPath();
    context.fillStyle=bi.color;
    khay.hienThi();
    //ctx.fillRect(khay.x,khay.y,khay.height,khay.width);
    context.arc(bi.x,bi.y,bi.radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    if( bi.x<0 || bi.x>1200)
        bi.dx=-bi.dx;
    if( bi.y<0 || bi.y>550 || bi.crashWith(khay)) {
        if(bi.crashWith(khay)){
            point++;
        }
        bi.dy = -bi.dy;
    }
    console.log(bi.y+", "+bi.x);
    bi.x+=bi.dx;
    bi.y+=bi.dy;
}
var interval_obj = setInterval(function(){
    drawBall();
    if(bi.y===550) {
        alert("Thua, bạn được: "+point+" Điểm!");
        clearInterval(interval_obj);
    }
}, 20);
//setInterval(drawBall,20);