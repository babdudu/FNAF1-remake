class OfficeAnimator {
    constructor(officeImage) {
        this.officeImage = officeImage;
        this.frameCount = 3;
        this.frameHeight = 720;
        this.currentFrame = 0;
        this.scaledFrameHeight = 0;
        this.lastFrameTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.paused = false;
        this.frameStart = 0;

    }

    animate(currentTime) {
        // keep looping animation
        requestAnimationFrame((time) => this.animate(time));
        // set initial time if first frame
        if (!this.lastFrameTime) this.lastFrameTime = currentTime;
        const timePassed = currentTime - this.lastFrameTime;
        // skip if not enough time has passed for next frame
        if (timePassed < this.frameInterval) return;
        // update time 
        this.lastFrameTime = currentTime - (timePassed % this.frameInterval); // modulus prevents animation drift (browser is sometimes late to callign RAF)
        // cycle through frames (0, 1, 2, 0, 1, 2 blablabla)
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        // calculate pixel offset in sprite sheet and apply
        const frameOffset = -(this.frameStart + this.currentFrame) * this.scaledFrameHeight;
        this.officeImage.style.top = `${frameOffset}px`;
    }

    updateFrameRange(leftActive, rightActive) {
        if (leftActive && rightActive) {
            this.frameStart = 9;
        } else if (rightActive) {
            this.frameStart = 6;
        } else if (leftActive) {
            this.frameStart = 3;
        } else {
            this.frameStart = 0;
        }
        this.currentFrame = 0;
    }

    updateScale(frameHeight, scale) {
        this.scaledFrameHeight = frameHeight * scale;
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
    }

    setElement(officeImage) {
        this.officeImage = officeImage;
    }
}
