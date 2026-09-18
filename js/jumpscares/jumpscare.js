function playJumpscare(gifSrc) {
    if (cameraSystem.cameraOn) {
        cameraSystem.canToggle = true;
        cameraSystem.onCameraBarHover();
        // wait for camera to close before showing jumpscare
        setTimeout(() => showJumpscare(gifSrc), 200);
        return;
    }
    showJumpscare(gifSrc);
}

function showJumpscare(gifSrc) {
    // hide literally everything
    document.getElementById('bottomItems').style.display = 'none';
    document.getElementById('leftDoorButtons').style.display = 'none';
    document.getElementById('currentTime').style.display = 'none';
    document.getElementById('currentNight').style.display = 'none';
    document.getElementById('leftDoorTopButton').style.display = 'none';
    document.getElementById('leftDoorBottomButton').style.display = 'none';
    document.getElementById('rightDoorButtons').style.display = 'none';
    document.getElementById('rightDoorTopButton').style.display = 'none';
    document.getElementById('rightDoorBottomButton').style.display = 'none';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('officeImage').style.display = 'none';

    const jumpscare = document.createElement('img');
    jumpscare.src = gifSrc;
    jumpscare.id = 'jumpscare';
    jumpscare.className = 'jumpscare';
    document.body.appendChild(jumpscare);

    let scream;
    if (gifSrc === '../static/jumpscares/freddy2.gif') {
        scream = new Audio('../sounds/vocals/XSCREAM2.wav');
    } else {
        scream = new Audio('../sounds/vocals/XSCREAM.wav');
    }
    scream.volume = 0.4;
    scream.play();

    setTimeout(() => {
        scream.pause();
        showGameOver();
    }, 1000);
}
