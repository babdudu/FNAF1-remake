class CameraAudio {
    constructor() {
        this.openSound = new Audio('../sounds/userInteraction/cameraOpen.wav');
        this.closeSound = new Audio('../sounds/userInteraction/cameraClose.wav');
    }

    playOpen() {
        this.openSound.currentTime = 0;
        this.openSound.play();
        document.getElementById('bgMusic').pause();
        if (buttons.bottomLeft || buttons.bottomRight) {
            buttons.lightSound.pause();
        }
    }

    playClose() {
        this.openSound.pause();
        this.closeSound.currentTime = 0;
        this.closeSound.play();
        // don't play bgMusic or lightSound if power is out
        if (powerSystem.powerOut) return;
        document.getElementById('bgMusic').play();
        if (buttons.bottomLeft || buttons.bottomRight) {
            buttons.lightSound.play();
        }
    }
}
