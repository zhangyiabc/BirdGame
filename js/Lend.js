const landDom = document.querySelector(".land");
// console.log(landDom)

const landStyles = getComputedStyle(landDom);
//getComputedStyle获取元素css样式

const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);

class Land extends MoveRectangle {
    constructor() {
        super(landWidth, landHeight, 0, landTop, -100, 0, landDom);
    }
    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}
// let land = new Land();
// setInterval(() => {
//     land.move(10 / 1000)
// }, 16);