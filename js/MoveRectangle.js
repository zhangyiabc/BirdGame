/**
 * 矩形类，可以移动
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、对应的dom对象
 * xSpeed：横向速度，单位（像素/秒），正数是向右，负数向左
 * ySpeed：纵向速度，单位（像素/秒），正数是向下，负数向上
 */

class MoveRectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;


    }
    /**
     * 渲染页面
     */
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    /**
     * 按照矩形的速度，和指定的时间，移动矩形
     * @param {*} interval 时间间隔 秒
     */
    move(interval) {
        //期间经过的距离
        
        
        const disX = this.xSpeed * interval;
        const disY = this.ySpeed * interval;
        this.left = disX + this.left;
        this.top = disY + this.top;
        // console.log(this.left,this.top)
        //在上面最基础的设置下，还有可能有别的设置
        //此时设置onMove函数
        if(this.onMove){
            this.onMove();
        }
        this.render();
    }

}