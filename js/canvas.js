const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"]; //цвета пузырьков
const BUBBLE_DENSITY = 100; //количество пузырьков


//инициализация начальной позиции пузырька, его размер, скорость движения вверх, прозрачность цвета
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
 }


// КЛАСС СОЗДАНИЕ ПУЗЫРЬКОВ 
class Bubble{
    constructor(canvas){
        this.canvas=canvas;

        this.getCanvasSize();
        this.init();
    }

    getCanvasSize(){
         //передаем свойствам  ширину и высоту холста
        
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }

    init(){
        this.color=COLORS[Math.floor(Math.random() * COLORS.length)]; //случайный выбор цвета пузырька
        this.alpha=generateDecimalBetween(5,10)/10; // прозрачность пузырьков
        this.size=generateDecimalBetween(1,3); //случайный размер пузырьков
        this.translateX=generateDecimalBetween(0,this.canvasWidth); // сучайная позиция пузырька
        this.translateY=generateDecimalBetween(0,this.canvasHeight);
        this.velocity = generateDecimalBetween(20, 40); // скорость
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;// смещение
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }

    move(){
        this.translateX=this.translateX - this.movementX;
        this.translateY=this.translateY - this.movementY;

        // если пузырки выходят за границы, проводится инициализация заново
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
          }
    
    }

}

//КЛАСС ДОБАВЛЕНИЯ ПУЗЫРЬКОВ НА ЭКРАН
class CanvasBackground {
    constructor(id){
        this.canvas = document.getElementById(id);
        this.ctx=this.canvas.getContext("2d");
        this.dpr= window.devicePixelRatio;
    }

    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }

    canvasSize(){
        this.canvas.width=this.canvas.offsetWidth*this.dpr;
        this.canvas.height=this.canvas.offsetHeight*this.dpr;
        this.ctx.scale(this.dpr,this.dpr);
    }

    

    animate(){
        this.ctx.clearRect(0,0,this.canvas.clientWidth, this.canvas.clientHeight); //очищаем холст
        this.bubblesList.forEach((bubble) => {
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);// меняем координаты пузырька на новые
            this.ctx.beginPath();
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            this.ctx.fillStyle="rgba(" + bubble.color + "," + bubble.alpha + ")";
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
            
            
        });
        requestAnimationFrame(this.animate.bind(this));
    }
    
    generateBubbles(){
        this.bubblesList =[];
        for(let i=0; i<BUBBLE_DENSITY; i++){
        this.bubblesList.push(new Bubble(this.canvas))// добавляем 100 пузырьков на холст
        }
    }
    
}

const canvas=new CanvasBackground("orb-canvas");
canvas.start();
