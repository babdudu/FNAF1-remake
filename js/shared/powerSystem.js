class PowerSystem {
    constructor() {
        this.usageBar = document.getElementById('usageBar');
        this.percentElement = document.getElementById('percent');
        this.barWidth = 21;  // pixels per bar
        this.maxBars = 5;
        this.power = 100;  
        this.drainInterval = null;
        this.baseDrain = 0.1;  // base drain per tick
        this.powerOut = false;
        this.powerdownSound = new Audio('../sounds/ending/powerdown.wav');
        this.musicBoxSound = new Audio('../sounds/ending/musicBox.wav');
    }

    getCurrentBars() {
        let bars = 1;
        if (buttons.topLeft) bars++;
        if (buttons.topRight) bars++;
        if (buttons.bottomLeft || buttons.bottomRight) bars++;
        if (cameraSystem.cameraOn) bars++;
        if (bars > this.maxBars) bars = this.maxBars;
        return bars;
    }

    updateUsage() {
        const bars = this.getCurrentBars();
        this.usageBar.style.width = `${bars * this.barWidth}px`;
    }

    startDrain() {
        if (this.powerOut) return;
        this.drainInterval = setInterval(() => {
            const bars = this.getCurrentBars();
            this.power -= this.baseDrain * bars ;

            if (this.power < 0) this.power = 0;

            this.percentElement.textContent = `${Math.floor(this.power)}%`;

            if (this.power <= 0) {
                this.onPowerOut();
            }

        }, 2000);
    }

    stopDrain() {
        if (this.drainInterval) {
            clearInterval(this.drainInterval);
            this.drainInterval = null;
        }
    }

    onPowerOut() {
        this.stopDrain();
        this.powerOut = true;

        // mute all audio
        document.getElementById('bgMusic').pause();
        buttons.lightSound.pause();

        // change frame and frame speed 
        buttons.lightSound.currentTime = 0;
        officeView.animator.frameStart = 21;
        officeView.animator.frameCount = 1;
        officeView.animator.currentFrame = 0;
        officeView.animator.fps = 2;
        officeView.animator.frameInterval = 1000 / officeView.animator.fps;
        // force frame to show immediately
        const frameOffset = -(officeView.animator.frameStart + officeView.animator.currentFrame) * officeView.animator.scaledFrameHeight;
        officeView.officeImage.style.top = `${frameOffset}px`;

        this.powerdownSound.play();
        setTimeout(() => {
            if (time.isNightFinished) return;
            this.musicBoxSound.play();
            officeView.animator.frameCount = 2;
            // stop music box after 20 seconds
            setTimeout(() => {
                if (time.isNightFinished) return;
                this.musicBoxSound.pause();
                this.musicBoxSound.currentTime = 0;
                officeView.animator.frameCount = 1;
                setTimeout(() => {
                    playJumpscare('../static/jumpscares/freddy1.gif');
                }, 5000)
            }, 20000);
        }, 10000);

        // if camera is open, close it 
        if (cameraSystem.cameraOn) {
            cameraSystem.canToggle = true; 
            cameraSystem.onCameraBarHover();
            setTimeout(() => this.powerOutEffects(), 100);
        } else {
            setTimeout( () => {
                this.powerOutEffects();
            }, 100)
        }
    }

    reset() {
        this.stopDrain();
        this.power = 100;
        this.powerOut = false;
        this.percentElement.textContent = '100%';
        this.powerdownSound.pause();
        this.powerdownSound.currentTime = 0;
        this.musicBoxSound.pause();
        this.musicBoxSound.currentTime = 0;
        this.updateUsage();
    }

    powerOutEffects() {

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

        // if doors are closed, play open animation
        if (buttons.topLeft) {
            officeView.leftDoorAnimator.animateDoor(false, 'left');
        }
        if (buttons.topRight) {
            officeView.rightDoorAnimator.animateDoor(false, 'right');
        }
    }
}