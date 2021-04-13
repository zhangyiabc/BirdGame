const gameWidth = gameDom.clientWidth;
class Pipe extends MoveRectangle {
    constructor(height, top, xSpeed, dom) {
        super(52, height, gameWidth, top, xSpeed, 0, dom);
    }
    onMove() {
        if (this.left < - this.width) {
            this.dom.remove();
        }
    }
}

//柱子对方法
const PipePlus = (() => {
    //私有属性
    const getRandom = Symbol("sjs");
    return class {

        constructor(speed) {
            this.speed = speed
            //空隙高度
            this.gap = this[getRandom](130, 170);
            // console.log('间隔'+this.gap)
            //最小高度
            this.minHeight = 80;
            //最大高度
            this.maxHeight = landTop - this.minHeight - this.gap;
            //上边柱子的高度
            const upHeight = this[getRandom](this.minHeight, this.maxHeight)
            // console.log("上边的高度"+upHeight)
            let upDom = document.createElement('div');
            upDom.className = `pipe up`;
            this.upPipe = new Pipe(upHeight, 0, this.speed, upDom); //上水管

            const downHeight = landTop - this.gap - upHeight;
            const downTop = landTop - downHeight;
            let downDom = document.createElement('div');
            downDom.className = `pipe down`;
            this.downPipe = new Pipe(downHeight, downTop, this.speed, downDom); //上水管
            gameDom.appendChild(upDom);
            gameDom.appendChild(downDom);
        }
        //判断柱子是否超过区域
        get useLess() {
            return this.upPipe.left < -this.upPipe.width;
        }
        
        //私有属性 获取一个规定范围的随机数
        [getRandom](min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        move(duration) {
            this.upPipe.move(duration);
            this.downPipe.move(duration);
        }
    }
})();

//产生连续不断的柱子对
class CreatePipePlus {
    constructor(speed) {
        //产生柱子的速度
        this.speed = speed;
        //存储柱子数据的数组
        this.pairsArr = [];
        this.timer = null;
        //时间间隔
        this.tick = 1000;

        this.num =  0;

    }
    myPush(){
        this.pairsArr.push(new PipePlus(this.speed))
        // this.num ++;
        // localStorage.setItem("index",this.num);
    }
    startOutPut() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            // this.pairsArr.push(new PipePlus(this.speed))
            this.myPush();
            //移除没用的柱子
            for (let index = 0; index < this.pairsArr.length; index++) {
                let pair = this.pairsArr[index];
                if (pair.useLess) {
                    this.pairsArr.splice(index, 1);
                    this.num++;
                    localStorage.setItem("index",this.num+1);
                    index--;
                }

            }
        }, this.tick);
    }
    stopOutPut() {
        clearInterval(this.timer);
        this.timer = null;
    }
}



