function showGameOver() {
    const jumpscare = document.getElementById('jumpscare');
    jumpscare.style.display = 'none';

    const staticImg = document.createElement('img');
    staticImg.src = '../static/miscellaneous/static.gif';
    staticImg.className = 'jumpscare';
    document.body.appendChild(staticImg);

    const staticAudio = new Audio('../sounds/main/static.wav');
    staticAudio.play();

    setTimeout( () => {
        // show scoreboard then ........... but will keep this for now 
        window.location.replace('../index.html');
    }, 7000)
    
}   