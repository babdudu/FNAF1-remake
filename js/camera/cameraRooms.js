class CameraRooms {
    constructor(cameraButtons) {
        this.cameraButtons = cameraButtons;
        this.frame = 0;
        this.frameWidth = 1600;
        this.frameHeight = 720;

        // mapping the camera IDs to the room
        this.roomImages = {
            '1A': 'showStage.png',
            '1B': 'diningArea.png',
            '1C': 'piratesCove.png',
            '2A': 'westHall.png',
            '2B': 'wHallCorner.png',
            '3': 'supplyCloset.png',
            '4A': 'eastHall.png',
            '4B': 'eHallCorner.png',
            '5': 'backstage.png',
            '6': 'kitchen.png',
            '7': 'restrooms.png'
        };

        this.roomDiv = null;
        this.panPosition = 0;
        this.panDirection = 1; 
        this.panSpeed = 0.2;
        this.maxPan = 0;
        this.animationId = null;

    }

    updateImageScale() {
        const scale = window.innerHeight / this.frameHeight;
        const scaledWidth = this.frameWidth * scale;

        this.roomDiv.style.backgroundSize = `${scaledWidth}px auto`;

        // calc how far the image can move
        this.maxPan = scaledWidth - window.innerWidth;

        this.panPosition = this.maxPan / 2;
        this.roomDiv.style.backgroundPosition = `-${this.panPosition}px 0`;
    }

    startPanning() {
        const pan = () => {
            this.panPosition += this.panSpeed * this.panDirection;

            if (this.panPosition >= this.maxPan) {
                this.panPosition = this.maxPan;
                this.panDirection = -1;
            } else if (this.panPosition <= 0) {
                this.panPosition = 0;
                this.panDirection = 1;
            }

            this.roomDiv.style.backgroundPosition = `-${this.panPosition}px 0`;
            this.animationId = requestAnimationFrame(pan);
        };

        this.animationId = requestAnimationFrame(pan);
    }

    stopPanning() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    showRoom() {
        const selectedId = this.cameraButtons.selectedId;
        if (selectedId && this.roomImages[selectedId]) {
            // Reset pan direction to prevent drift
            this.panDirection = 1;
            this.roomDiv.style.backgroundImage = `url('../static/rooms/${this.roomImages[selectedId]}')`;
            this.updateImageScale();
        }
    }

    load(container) {
        this.roomDiv = container; // replacing office div 
        this.roomDiv.style.backgroundSize = 'auto 100%';
        this.roomDiv.style.backgroundRepeat = 'no-repeat';
        this.updateImageScale();
        this.startPanning();
    }

    unload() {
        this.stopPanning();
        this.roomDiv.style.backgroundImage = '';
        this.roomDiv.style.backgroundPosition = '';
        this.roomDiv = null;
    }
}