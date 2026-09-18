class PauseManager {
    constructor(officeView) {
        this.officeView = officeView;
    }

    pause() {
        this.officeView.paused = true;
        this.officeView.animator.pause();
        document.getElementById('pauseOverlay').style.display = 'flex';
        document.getElementById('bgMusic').pause();
        buttons.lightSound.pause();
        powerSystem.stopDrain();
    }

    unpause() {
        this.officeView.paused = false;
        this.officeView.animator.unpause();
        document.getElementById('pauseOverlay').style.display = 'none';
        document.getElementById('bgMusic').play();
        if (buttons.bottomLeft || buttons.bottomRight) {
            buttons.lightSound.play();
        }
        powerSystem.startDrain();
    }

    restart() {
        document.getElementById('pauseOverlay').style.display = 'none';

        // reset systems
        powerSystem.reset();
        time.reset();
        this.officeView.paused = false;
        this.officeView.animator.unpause();

        // reset animator to normal frames
        this.officeView.animator.frameStart = 0;
        this.officeView.animator.frameCount = 3;
        this.officeView.animator.currentFrame = 0;
        this.officeView.animator.fps = 60;
        this.officeView.animator.frameInterval = 1000 / this.officeView.animator.fps;

        // reset button states
        buttons.topLeft = false;
        buttons.topRight = false;
        buttons.bottomLeft = false;
        buttons.bottomRight = false;
        buttons.updateButton('left');
        buttons.updateButton('right');
        powerSystem.updateUsage();

        // reset doors to open position
        this.officeView.leftDoorAnimator.showFrame(6);
        this.officeView.rightDoorAnimator.showFrame(0);

        // start audio and drain
        document.getElementById('bgMusic').play();
        powerSystem.startDrain();
    }
}
