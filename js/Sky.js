/**
 * 
 */
 const skyDom = document.querySelector(".sky");
 const skyStyles = getComputedStyle(skyDom);
//  console.log(skyDom)
//getComputedStyle获取元素css样式

 const skyWidth = parseFloat(skyStyles.width);
 const skyHeight = parseFloat(skyStyles.height);

class Sky extends MoveRectangle{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,skyDom);
    }
    onMove(){
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}

// let sky1 = new Sky();
// setInterval(() => {
//     sky1.move(10/1000)
// }, 16);