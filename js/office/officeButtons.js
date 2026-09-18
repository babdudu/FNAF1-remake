class ButtonFunctions {
    constructor(officeView){
        this.officeView = officeView;
        this.topLeft = false;
        this.bottomLeft = false;
        this.topRight = false;
        this.bottomRight = false;

        this.leftDoorAnimator = officeView.leftDoorAnimator;
        this.rightDoorAnimator = officeView.rightDoorAnimator;

        // audio for buttons
        this.lightSound = new Audio('../sounds/userInteraction/lightOn.wav');
        this.lightSound.loop = true;
        this.doorSound = new Audio('../sounds/userInteraction/doorCloseOpen.wav');
    }

    topLeftClick(){
        this.topLeft = !this.topLeft;
        this.updateButton('left');
        this.leftDoorAnimator.animateDoor(this.topLeft, 'left');
        this.doorSound.currentTime = 0;
        this.doorSound.play();
        powerSystem.updateUsage();
    }

    bottomLeftClick(){
        this.bottomLeft = !this.bottomLeft;
        this.updateButton('left');
        this.officeView.animator.updateFrameRange(this.bottomLeft, this.bottomRight);
        this.toggleLightSound();
        powerSystem.updateUsage();
    }

    topRightClick(){
        this.topRight = !this.topRight;
        this.updateButton('right');
        this.rightDoorAnimator.animateDoor(this.topRight, 'right');
        this.doorSound.currentTime = 0;
        this.doorSound.play();
        powerSystem.updateUsage();
    }

    bottomRightClick(){
        this.bottomRight = !this.bottomRight;
        this.updateButton('right');
        this.officeView.animator.updateFrameRange(this.bottomLeft, this.bottomRight);
        this.toggleLightSound();
        powerSystem.updateUsage();
    }

    toggleLightSound(){
        if (this.bottomLeft ) {
            this.lightSound.play();
        } else if (this.bottomRight) {
            this.lightSound.play();
        } else {
            this.lightSound.pause();
            this.lightSound.currentTime = 0;
        }
    }

    updateButton(side){
        const element = document.getElementById(side + 'DoorButtons');
        const top = side === 'left' ? this.topLeft : this.topRight;
        const bottom = side === 'left' ? this.bottomLeft : this.bottomRight;

        if (top && bottom) {
            element.style.objectPosition = '-288px 0';
        } else if (top) {
            element.style.objectPosition = '-192px 0';
        } else if (bottom) {
            element.style.objectPosition = '-96px 0';
        } else {
            element.style.objectPosition = '0 0';
        }
    }

}