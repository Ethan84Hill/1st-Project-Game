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
            x1: 130,
            y1: 155,
            w1: 645,
            h1: 5,
            draw: function () {
                ctx.fillStyle = 'yellow'
                ctx.fillRect(130, 155, 645, 5)
            }
        }
        let railTwo = {
            x2: 485,
            y2: 155,
            w2: 5,
            h2: 420,
            draw: function () {
                ctx.fillStyle = 'pink'
                ctx.fillRect(485, 155, 5, 420)
            }
        }
        let railThree = {
            x3: 130,
            y3: 552,
            w3: 355,
            h3: 5,
            draw: function () {
                ctx.fillStyle = 'blue'
                ctx.fillRect(130, 552, 355, 5)
            }
        }
        let railFour = {
            x4: 490,
            y4: 568,
            w4: 375,
            h4: 5,
            draw: function () {
                ctx.fillStyle = 'purple'
                ctx.fillRect(490, 568, 375, 5)
            }
        }
        let railFive = {
            x5: 0,
            y5: 338,
            w5: 325,
            h5: 10,
            draw: function () {
                ctx.fillStyle = 'red'
                ctx.fillRect(0, 338, 325, 10)
            }
        }
        let railSix = {
            x6: 773,
            y6: 302,
            w6: 325,
            h6: 8,
            draw: function () {
                ctx.fillStyle = 'orange'
                ctx.fillRect(773, 302, 325, 8)
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
            car.xCord < rails.xCord + rails.width &&
            car.xCord + car.width > rails.xCord &&
            car.yCord < rails.yCord + rails.height &&
            car.yCord + car.height > rails.yCord
          ) {
            car.vy *= -1;
            car.vx *= -1;
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
            {f1Car.ax = -(Math.cos(f1Car.r) * 0.0006);
            f1Car.ay = -(Math.sin(f1Car.r) * 0.0006);
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
         // railsBoundaries(f1Car, rails)
         // startFinishLineBoundaries(f1Car, finish)
      }
      

