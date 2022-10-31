console.log('hello')

window.onload = () => {
    document.getElementById('start-now').onclick = () => {
      startGame();
    };
    
    function startGame() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');


        const imgTrack = new Image();
        imgTrack.src = 'images/road.png';
        ctx.drawImage(imgTrack, 0, 0, 1015, 710)


        let xCord = 220;
        let yCord = 620;
       const imgCar = new Image();
       imgCar.src = 'images/F1_car.png'
      ctx.drawImage(imgCar, xCord, yCord, 60, 30)
      window.addEventListener('keydown', function(event) {
        ctx.clearRect(0, 0, 1015, 710)
        ctx.drawImage(imgTrack, 0, 0, 1015, 710)
        // ctx.clearRect(0, 0, 1015, 710)
        ctx.drawImage(imgCar, xCord, yCord, 60, 30)
        // ctx.clearRect(0, 0, 1015, 710)
        switch(event.code) {
          case 'ArrowRight':
          xCord += 10;
           break;
          case 'ArrowLeft':
            xCord -= 10;
            break;
        case 'ArrowUp':
            yCord -= 10;
            break;
        case 'ArrowDown':
            yCord += 10;
            break;
        }
      })




    }





}