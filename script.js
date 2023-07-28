score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

setTimeout(()=>{
    audio.play()
},1000);

document.onkeydown = function(e){
    console.log("Key code is ",e.key)
    if (e.key === 'ArrowUp') {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino')
        },700);
    }
    else if (e.key === 'ArrowLeft') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
    else if (e.key === 'ArrowRight') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
  
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox =  parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy =  parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    if (offsetX<113 && offsetY<52) {
        gameOver.innerHTML = "Game over - Reload to play again!";
        obstacle.classList.remove('obstacleAni')
        audio.pause();
        audiogo.play();
        setTimeout(()=>{
            audiogo.pause();
        },1000)
    }
    else if (offsetX<73 && cross) {
        score = score+1;
        updateScore(score);
        cross = false;
        setTimeout(()=>{
            cross = true;
        }, 1000);
        setTimeout (()=>{
            animationDuration = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDuration = animationDuration - 0.1;
            obstacle.style.animationDuration = newDuration + 's';
        }, 500)
    }
},10);


function updateScore(score) {
    scoreCont.innerHTML = "Your Score is " + score;
} 