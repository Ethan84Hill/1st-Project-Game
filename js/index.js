console.log('hello')

window.onload = () => {
    document.getElementById('start-now').onclick = () => {
      startGame();
    };
}

    const imgCar = new Image();
       imgCar.src = 'images/F1_car.png'
        let f1Car = {
            xCord: 220,
            yCord: 620,
            width: 60,
            height: 30,
            r: 0,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            speedX: 0,
            speedY: 0,
            draw: function (){
                ctx.beginPath();
                ctx.arc(this.xCord, this.yCord, 60, 0, Math.PI * 2);
                ctx.closePath();
                ctx.save();
                ctx.translate(this.xCord, this.yCord);
                ctx.rotate(this.r);
                ctx.drawImage(imgCar, -10, -15, 60, 30)
                ctx.restore();
            }
        }

        let railOne = {
            x: 130,
            y: 155,
            w: 645,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(130, 155, 645, 1)
            }
        }
        let railTwo = {
            x: 485,
            y: 155,
            w: 1,
            h: 420,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(485, 155, 1, 420)
            }
        }
        let railThree = {
            x: 130,
            y: 552,
            w: 355,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(130, 552, 355, 1)
            }
        }
        let railFour = {
            x: 490,
            y: 568,
            w: 375,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(490, 568, 375, 1)
            }
        }
        let railFive = {
            x: 0,
            y: 338,
            w: 325,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(0, 338, 325, 1)
            }
        }
        let railSix = {
            x: 773,
            y: 302,
            w: 325,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(773, 302, 325, 1)
            }
        }


       let race;
       const frameRate = 1 / 60;
        const frameDelay = frameRate * 1000;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let w = canvas.width
        let h = canvas.height

    function startGame() {
        driveloop()
    }

    function updatePosition(car) {
        car.vx += car.ax;
        car.vy += car.ay;

        car.xCord += car.vx * frameRate * 100;
        car.yCord += car.vy * frameRate * 100;
    }

    function canvasBoundaries(car) {
        if (car.xCord >= w) {
            car.vx = 0
            car.ax = 0
        }
        if (car.xCord <= 0) {
            car.vx = 0
            car.ax = 0
        }
        if (car.yCord >= h) {
            car.vy = 0
            car.ay = 0
        }
        if (car.yCord <= 0) {
            car.vy = 0
            car.ay = 0
        }
    }

    function startFinishLineBoundaries(car, finish) {
        if (
            car.xCord < finish.xCord + finish.width &&
            car.xCord + car.width > finish.xCord &&
            car.yCord < finish.yCord + finish.height &&
            car.yCord + car.height > finish.yCord
          ) {
            car.vy = 0;
            car.vx = 0;
          }
    }

    function railsBoundaries(car, rails) {
        if (
            car.xCord < rails.x + rails.w &&
            car.xCord + car.width > rails.x &&
            car.yCord < rails.y + rails.h &&
            car.yCord + car.height > rails.y
          ) {
            car.vy *= -0.5;
            car.vx *= -0.5;
          }
    }


        const keys = [];
     window.addEventListener("keydown", function (e) {
         keys[e.which] = true;
       });
       window.addEventListener("keyup", function (e) {
         keys[e.which] = false;
       });

    function driveloop() {
        race = window.requestAnimationFrame(driveloop, canvas);
        ctx.clearRect(0, 0, 1015, 710)
        
        if (keys[39]) {f1Car.r += 0.05;}
        if (keys[37]) {f1Car.r -= 0.05;}

        if (keys[38]) {
            if (f1Car.ax >= 0 || f1Car.ay >= 0) 
            {f1Car.ax = -(Math.cos(f1Car.r) * 0.001);
            f1Car.ay = -(Math.sin(f1Car.r) * 0.001);
        } else {
            f1Car.ax = 0
            f1Car.ay = 0
            }
        } 
        
          if (keys[40]) {
            f1Car.ax = Math.cos(f1Car.r) * 0.001;
             f1Car.ay = Math.sin(f1Car.r) * 0.001;
            } 
        
          f1Car.draw();
          railOne.draw();
          railTwo.draw();
          railThree.draw();
          railFour.draw();
          railFive.draw();
          railSix.draw();
         updatePosition(f1Car)
         canvasBoundaries(f1Car)
         railsBoundaries(f1Car, railOne)
         railsBoundaries(f1Car, railTwo)
         railsBoundaries(f1Car, railThree)
         railsBoundaries(f1Car, railFour)
         railsBoundaries(f1Car, railFive)
         railsBoundaries(f1Car, railSix)
         // railsBoundaries(f1Car, rails)
         // startFinishLineBoundaries(f1Car, finish)
      }
      

