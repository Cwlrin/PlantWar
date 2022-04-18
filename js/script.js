var mainObj = document.getElementById("main");
var smallPlaneArray = [];

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
    }
    this.moveRight = function () {
        // 根据判断玩家的按键来执行事件进行移动
    }
    this.moveUp = function () {
        // 根据判断玩家的按键来执行事件进行移动
    }
    this.moveDown = function () {
        // 根据判断玩家的按键来执行事件进行移动
    }
    this.shoot = function () {
        // 根据判断玩家的按键来执行发射子弹的事件
    }
}

var player = new playerPlaneProto("./images/myplane.gif",50,700,10);