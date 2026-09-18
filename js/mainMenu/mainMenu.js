// handle the background animation
class MainMenuAnimation {
    constructor() {
        this.bg = document.getElementById('mainMenuBg');

        // configuring the sprite sheet 
        this.frameWidth = 1278;
        this.frameHeight = 722;  
        this.totalFrames = 4; // only use first 4 frames
        this.currentFrame = 0;

        // animation 
        this.frameRate = 60; // 60 fps
        this.frameDuration = 1000 / this.frameRate; // ms per frame
        this.lastFrameTime = 0; // time stamp of last time we updated the frame
        this.frameCounter = 0; // how many times has a frame been passed
        this.framesPerImage = 15; // how many times should a frame be passed
        this.pauseTime = 0; // time when pause started
        this.isPaused = false; // is currently paused

        this.setupBackground(); // object made => background is then setup
    }

    setupBackground() {
        this.bg.style.width = this.frameWidth + "px";
        this.bg.style.height = this.frameHeight + "px";
        this.bg.style.backgroundImage = `url('../static/miscellaneous/mainMenu.png')`;
        this.bg.style.backgroundRepeat = 'no-repeat';
        this.bg.style.backgroundPosition = '0px 0px';  
    }
    
    animate(timestamp) {
        requestAnimationFrame((time) => this.animate(time));
        // check if its paused 
        if (this.isPaused) {
            // if one second pause finished 
            if (timestamp - this.pauseTime >= 1000) {
                this.isPaused = false;
                this.lastFrameTime = timestamp; // reset frame timer
            } else {
                return;
            }
        }

        // check if the current frame has reached its max duration
        if (timestamp - this.lastFrameTime >= this.frameDuration) {
            this.frameCounter++; // increment how many times this frame was shown
            
            // if the frame was shown more or equal than frame per image (shown 15 times)
            if (this.frameCounter >= this.framesPerImage) {
                // go to next frame and set counter of new/cur frame to 0
                this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
                this.frameCounter = 0; 
                
                // if we just finished all 4 frames, start pause
                if (this.currentFrame === 0) {
                    this.isPaused = true;
                    this.pauseTime = timestamp;
                }
            }
            
            // find the position of the image based on what frame we are on and update background
            const yPos = -this.currentFrame * this.frameHeight; // negative because we are going down
            this.bg.style.backgroundPosition = "0px " + yPos + "px"; // updae background position
            this.lastFrameTime = timestamp; // set the timestamp from where we first kept this frame
        }
        
    }
}
