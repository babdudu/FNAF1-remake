class DoorAnimator {
    constructor(doorElement) {
        this.door = doorElement;
        this.spriteColumns = 7;
        this.frameWidth = 230;
        this.frameHeight = 721;
        this.currentFrame = 0;
        
        this.door.style.width = `${this.frameWidth}px`;
        this.door.style.height = `${this.frameHeight}px`;

        this.leftDoorFrames = {
            open: [13, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6 ],
            close: [6, 5, 4, 3, 2, 1, 0, 12, 11, 10, 9, 8, 7, 13]
        };
        this.rightDoorFrames = {
            open: [7, 13, 12, 11, 10, 9, 8, 6, 5, 4, 3, 2, 1,0 ],
            close: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 7]
        };
    }
    
    showFrame(frameIndex) {
        // frame index divided by columns, then with math floor gives exact row
        const row = Math.floor(frameIndex / this.spriteColumns);
        // remainder gives column, ex: 5/7 we get 0 (FOR ROW) the remainder is 5 so col 5
        const col = frameIndex % this.spriteColumns;
        
        const xOffset = -col * this.frameWidth;
        const yOffset = -row * this.frameHeight;
        
        this.door.style.objectPosition = `${xOffset}px ${yOffset}px`;
        this.currentFrame = frameIndex;
    }

    animateDoor(isClosed, side) {
        const frameSequence = side === 'left' ? this.leftDoorFrames : this.rightDoorFrames;

        const frames = isClosed ? frameSequence.close : frameSequence.open;

        this.playFrameSequence(frames);
    }


    playFrameSequence(frames) {
        let frameIndex = 0;
        const framesPerStep = 2;
        let stepCount = 0;

        const animate = () => {
            stepCount++;
            if (stepCount % framesPerStep === 0) {
                this.showFrame(frames[frameIndex]);
                frameIndex++;
            }

            if (frameIndex < frames.length) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    setElement(doorElement) {
        this.door = doorElement;
        this.door.style.width = `${this.frameWidth}px`;
        this.door.style.height = `${this.frameHeight}px`;
    }
}