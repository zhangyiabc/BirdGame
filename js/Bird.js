const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
console.log(birdHeight)
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;


class Bird extends MoveRectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500; //向下的加速度，单位：像素/秒²
        this.maxTop = gameHeight - landHeight - birdHeight;
        // console.log(gameHeight,landHeight,birdHeight)
        // console.log(this.maxTop)
        this.swingStatus = 1; //小鸟的翅膀状态
        this.timer = null;
        //由于一上来小鸟就需要做自由落体运动
        //一上来就得渲染页面
        this.render();
    }

    move(interval) {
        super.move(interval);
        this.ySpeed += this.g * interval;
    }

    startFan() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            //设置小鸟翅膀状态在 1 2 3 循环
            this.swingStatus++;
            this.swingStatus = this.swingStatus % 3 + 1;
            this.render();
        }, 200)
    }
    render() {
        super.render(); //调用父类的render方法
        this.dom.className = `bird swing${this.swingStatus}`;
    }
    stopFan() {
        clearInterval(this.timer);
        this.timer = null;
        this.dom.className = `bird swing1`
    }
    jump() {
        this.ySpeed = -400;
    }
    //设置小鸟跳跃范围
    onMove() {
        if (this.top > this.maxTop) {
            this.top = this.maxTop;

        } else if (this.top < 0) {
            this.top = 0

        }
    }
}


// let bird = new Bird();
// setInterval(() => {
//     bird.move(10/1000)
// }, 16);