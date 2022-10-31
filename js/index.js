console.log('hello')

window.onload = () => {
    document.getElementById('start-now').onclick = () => {
      startGame();
    };
    
    function startGame() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let race;
        // const imgTrack = new Image();
       // imgTrack.src = 'images/new track 1.png';
        // ctx.drawImage(imgTrack, 0, 0, 1015, 710)
        const frameRate = 1 /40;
        const frameDelay = frameRate * 1000;

        // f1Car.vx += f1Car.ax;
        // f1Car.vy += f1Car.ay;

        // f1Car.xCord += f1Car.vx * frameRate * 100;
        // f1Car.yCord += f1Car.vy * frameRate * 100;

        const imgCar = new Image();
       imgCar.src = 'images/F1_car.png'
        let f1Car = {
            xCord: 220,
            yCord: 620,
            r: -1,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            speedX: 0,
            speedY: 0,
            draw: function (){
                ctx.drawImage(imgCar, 220, 620, 60, 30)
            }
        }
       
    //    const imgCar = new Image();
    //    imgCar.src = 'images/F1_car.png'
    //  ctx.drawImage(imgCar, f1Car.xCord, f1Car.yCord, 60, 30)
    //   window.addEventListener('keydown', function(event) {
    //     ctx.clearRect(0, 0, 1015, 710)
    //     // ctx.drawImage(imgTrack, 0, 0, 1015, 710)
    //     ctx.drawImage(imgCar, f1Car.xCord, f1Car.yCord, 60, 30)
    //     switch(event.code) {
    //       case 'ArrowRight':
    //         f1Car.xCord += 10;
    //        break;
    //       case 'ArrowLeft':
    //         f1Car.xCord -= 10;
    //         break;
    //     case 'ArrowUp':
    //         f1Car.yCord -= 10;
    //         break;
    //     case 'ArrowDown':
    //         f1Car.yCord += 10;
    //         break;
    //     }
    //   })


      driveloop()

    }

    function driveloop() {
        race = window.requestAnimationFrame(driveloop, canvas);
        ctx.clearRect(0, 0, 1015, 710)
        ctx.drawImage(imgCar, f1Car.xCord, f1Car.yCord, 60, 30)
        if ('ArrowRight') f1Car.r += 0.05;
        if ('ArrowLeft') f1Car.r -= 0.05;

        if ('ArrowUp') {
            f1Car.ax = Math.cos(f1Car.r) * 0.05;
            f1Car.ay = Math.sin(f1Car.r) * 0.05;
        }

        f1Car.draw();
      }



}