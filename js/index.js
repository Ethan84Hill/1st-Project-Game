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
            x: 160,
            y: 155,
            w: 600,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(160, 155, 600, 1)
            }
        }
        let railTwo = {
            x: 485,
            y: 155,
            w: 1,
            h: 400,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(485, 155, 1, 400)
            }
        }
        let railThree = {
            x: 150,
            y: 552,
            w: 300,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(150, 552, 300, 1)
            }
        }
        let railFour = {
            x: 500,
            y: 568,
            w: 300,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(500, 568, 300, 1)
            }
        }
        let railFive = {
            x: 0,
            y: 338,
            w: 300,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(0, 338, 300, 1)
            }
        }
        let railSix = {
            x: 773,
            y: 302,
            w: 300,
            h: 1,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(773, 302, 300, 1)
            }
        }
        let finishLine = {
            x: 300,
            y: 588,
            w: 3,
            h: 98,
            draw: function () {
                ctx.fillStyle = 'white'
                ctx.fillRect(300, 588, 3, 98)
            }
        }
        let antiCheat = {
            x: 290,
            y: 588,
            w: 1,
            h: 95,
            draw: function () {
                ctx.fillStyle = 'black'
                ctx.fillRect(290, 588, 1, 98)
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
        lapTime()
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
            car.xCord < finish.x + finish.w &&
            car.xCord + car.width > finish.x &&
            car.yCord < finish.y + finish.h &&
            car.yCord + car.height > finish.y
          ) {
            car.vy = 0;
            car.vx = 0;
            lapDone();
            // lapTime();
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
          ctx.globalAlpha = 1
          lapTime()
          ctx.globalAlpha = 1
          f1Car.draw();
          ctx.globalAlpha = 0
          finishLine.draw();
          railOne.draw();
          railTwo.draw();
          railThree.draw();
          railFour.draw();
          railFive.draw();
          railSix.draw();
          antiCheat.draw();
         updatePosition(f1Car)
         canvasBoundaries(f1Car)
         railsBoundaries(f1Car, antiCheat)
         railsBoundaries(f1Car, railOne)
         railsBoundaries(f1Car, railTwo)
         railsBoundaries(f1Car, railThree)
         railsBoundaries(f1Car, railFour)
         railsBoundaries(f1Car, railFive)
         railsBoundaries(f1Car, railSix)
         startFinishLineBoundaries(f1Car, finishLine)
      }
      
      function lapDone() {
        window.cancelAnimationFrame(race);

        ctx.globalAlpha = 0.5
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 1015, 710);
        ctx.globalAlpha = 1
        ctx.fillStyle = 'white';
        ctx.font = '40px sans-serif';
        ctx.fillText('Lap Complete!', w/3, 100);
      }
    
      let startTime;

      function lapTime() {
        let elapsed = parseInt((new Date() - startTime) / 1000);

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.fillText(elapsed + ' secs', 880, 30);
        ctx.restore();
      }


    //   lapRace = setInterval(lapDone, 25);

    //   let startTime = new Date().getTime();
    //   let time = 0
    //   let lapRace;

    //   function timer() {
    //     time = parseInt((new Date().getTime() - startTime) / 1000, 10)
    //   }