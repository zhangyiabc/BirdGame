var counterDom = document.querySelector('.score');
let maxDom = document.querySelector('.max');

var maxNum = localStorage.getItem(maxNum) || 0;
class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-150);
        this.bird = new Bird();
        //柱子对生成器
        this.pipeProducer = new CreatePipePlus(-150);
        this.timer = null;
        this.tick = 16; //移动时间间隔，毫秒
        this.gameOver = false;
    }

    start() {
        
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload(); //游戏结束重新加载
        }
        //开始生成柱子
        this.pipeProducer.startOutPut();
        //开始扇动翅膀
        this.bird.startFan();
        this.timer = setInterval(() => {
            counterDom.innerHTML = localStorage.getItem('index')
            //各类矩形开始移动 
            const interval = this.tick / 1000;
            this.sky.move(interval);
            this.land.move(interval);
            this.bird.move(interval);
            // console.log(this.pipeProducer.pairsArr)
            this.pipeProducer.pairsArr.forEach(item => {
                item.move(interval)
            });
            if (this.isGameOver()) {
                this.stop();
                let counter = localStorage.getItem("index");
                if(counter > maxNum){
                    maxNum =counter;
                    console.log(maxNum)
                    localStorage.setItem("maxNum",maxNum);
                }
                
                maxDom.innerText = localStorage.getItem('maxNum')
                this.gameOver = true;
            }

        }, this.tick);
    }

    /**
     * 判断两个矩形是否碰撞
     * @param {*} rec1 
     * @param {*} rec2 
     */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }

    isGameOver() {
        if (this.bird.top === this.bird.maxTop) {
            //鸟碰到了大地
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairsArr.length; i++) {
            const pair = this.pipeProducer.pairsArr[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    stop() {
        clearInterval(this.timer);
        this.bird.stopFan()
        this.pipeProducer.stopOutPut();
        this.timer = null;
    }

    /**
     * 关键键盘事件
     */
    regEvent() {
        window.onkeydown = (e)=>{
            console.log(e.which)
            if(e.which === 13){
                if(this.timer){
                    this.stop();
                }else{
                    this.start();
                    localStorage.setItem('index',0)
                }
            }
            if(e.which === 32){
                this.bird.jump()
            }
        }
    }
}

var g = new Game();
g.regEvent();
// g.start();