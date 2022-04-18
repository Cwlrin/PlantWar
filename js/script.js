var mainObj = document.getElementById("main");
// 小飞机数组
var smallPlaneArray = [];
// 子弹数组
var bullerArray = [];
// 按键开关
var upBtn = false;
var dowmBtn = false;
var leftBtn = false;
var rightBtn = false;

/**
 *  创建敌方小飞机
 *  属性：图片节点、图片、x坐标、y坐标，速度
 *  行为：移动、初始化、把图片节点添加到 main 里面
 */
function SmallPlaneProto(imgSrc, x, y, speed) {
    this.imgNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.position = "absolute";
        this.imgNode.style.left = this.x + "px";
        this.imgNode.style.top = this.y + "px";
        mainObj.appendChild(this.imgNode);
    }
    this.init();
    this.move = function () {
        this.imgNode.style.top = parseInt(this.imgNode.style.top) + this.speed + "px";
    }
}

function createSmallPlane() {
    var smallPlane = new SmallPlaneProto("./images/enemy1_fly_1.png", parseInt(Math.random() * 356), -parseInt(Math.random() * 100 + 40), parseInt(Math.random() * 10));
    smallPlaneArray.push(smallPlane);
}

setInterval(createSmallPlane, 1000);

function smallPlaneMove() {
    for (var i = 0; i < smallPlaneArray.length; i++) {
        smallPlaneArray[i].move();
        if (parseInt(smallPlaneArray[i].imgNode.style.top) >= 800) {
            mainObj.removeChild(smallPlaneArray[i].imgNode);
            smallPlaneArray.splice(i, 1);
        }
    }
}

setInterval(smallPlaneMove, 50);

/**
 * 创建玩家飞机
 * 属性：图片节点、图片、x坐标、y坐标，速度
 * 行为：移动（上下左右）、发射子弹、初始化、把图片节点添加到 main 里面
 */
function playerPlaneProto(imgSrc, x, y, speed) {
    this.imgNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.position = "absolute";
        this.imgNode.style.left = this.x + "px";
        this.imgNode.style.top = this.y + "px";
        mainObj.appendChild(this.imgNode);
    };
    this.init();
    this.moveLeft = function () {
        // 根据判断玩家的按键来执行事件进行移动
        if (this.imgNode.style.left == "-60px") {
            this.imgNode.style.left = "620px";
        } else {
            this.imgNode.style.left = parseInt(this.imgNode.style.left) - this.speed + "px";
        }

    }
    this.moveRight = function () {
        // 根据判断玩家的按键来执行事件进行移动
        if (this.imgNode.style.left == "620px") {
            this.imgNode.style.left = "-60px";
        } else {
            this.imgNode.style.left = parseInt(this.imgNode.style.left) + this.speed + "px";
        }
    }
    this.moveUp = function () {
        // 根据判断玩家的按键来执行事件进行移动
        if (this.imgNode.style.top == "0px") {
            this.imgNode.style.top = "0px";
        } else {
            this.imgNode.style.top = parseInt(this.imgNode.style.top) - this.speed + "px";
        }
    }
    this.moveDown = function () {
        // 根据判断玩家的按键来执行事件进行移动
        if (this.imgNode.style.top == "720px") {
            this.imgNode.style.top = "720px";
        } else {
            this.imgNode.style.top = parseInt(this.imgNode.style.top) + this.speed + "px";
        }
    }
    this.shoot = function () {
        // 根据判断玩家的按键来执行发射子弹的事件
        var newBullet = new bulletProto("./images/bullet1.png", parseInt(this.imgNode.style.left) + 30, parseInt(this.imgNode.style.top) - 10, 10);
        bullerArray.push(newBullet);
    }
}

var player = new playerPlaneProto("./images/myplane.gif", 50, 700, 10);

/**
 * 在 body 中按下键盘的时候 移动玩家飞机
 */
document.body.onkeydown = function () {
    var e = window.event || arguments[0];
    // 使用控制台检测按键
    // console.log(e)
    if (e.keyCode == 37) {
        leftBtn = true;
    }
    if (e.keyCode == 38) {
        upBtn = true;
    }
    if (e.keyCode == 39) {
        rightBtn = true;
    }
    if (e.keyCode == 40) {
        dowmBtn = true;
    }
    if (e.keyCode == 32) {
        player.shoot();
    }
}

document.body.onkeyup = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == 37) {
        leftBtn = false;
    }
    if (e.keyCode == 38) {
        upBtn = false;
    }
    if (e.keyCode == 39) {
        rightBtn = false;
    }
    if (e.keyCode == 40) {
        dowmBtn = false;
    }
}

function ctrlPlay() {
    if (leftBtn == true) {
        player.moveLeft();
    }
    if (rightBtn == true) {
        player.moveRight();
    }
    if (upBtn == true) {
        player.moveUp();
    }
    if (dowmBtn == true) {
        player.moveDown();
    }
}

// 30 毫秒监听一次是否按下键盘
setInterval(ctrlPlay, 30);

/**
 * 子弹模板
 */
function bulletProto(imgSrc, x, y, speed) {
    this.imgNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.init = function () {
        this.imgNode.src = this.imgSrc;
        this.imgNode.style.position = "absolute";
        this.imgNode.style.left = this.x + "px";
        this.imgNode.style.top = this.y + "px";
        mainObj.appendChild(this.imgNode);
    }
    this.init();
    this.move = function () {
        this.imgNode.style.top = parseInt(this.imgNode.style.top) - this.speed + "px";
    }
}

/**
 * 子弹移动
 */
function bulletMove() {
    for (var i = 0; i < bullerArray.length; i++) {
        bullerArray[i].move();
        if (parseInt(bullerArray[i].imgNode.style.top) <= 10) {
            mainObj.removeChild(smallPlaneArray[i].imgNode);
            smallPlaneArray.splice(i, 1);
        }
    }
}

setInterval(bulletMove, 10);