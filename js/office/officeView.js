class OfficeView {
    constructor() {
        this.container = document.getElementById('officeContainer');
        this.frameHeight = 720;

        this.doorHeight = 721;
        this.doorWidth = 250;

        this.buttonFrameCount = 3;
        this.buttonHeight = '247px';
        this.buttonWidth = '94px';

        this.init();

        this.leftDoorAnimator = new DoorAnimator(document.getElementById('leftDoor'));
        this.rightDoorAnimator = new DoorAnimator(document.getElementById('rightDoor'));
        this.leftDoorAnimator.showFrame(6);
        this.rightDoorAnimator.showFrame(0);
    }

    init() {
        this.getElements();
        this.animator = new OfficeAnimator(this.officeImage);
        this.inputHandler = new InputHandler(this);
        this.setupImageLoad();
        this.animator.animate();
    }

    getElements() {
        this.imageWrapper = document.getElementById('imageWrapper');
        this.officeImage = document.getElementById('officeImage');
        this.leftDoorButton = document.getElementById('leftDoorButtons');
        this.rightDoorButton = document.getElementById('rightDoorButtons');
        this.leftDoorTopButton = document.getElementById('leftDoorTopButton');
        this.leftDoorBottomButton = document.getElementById('leftDoorBottomButton');
        this.rightDoorTopButton = document.getElementById('rightDoorTopButton');
        this.rightDoorBottomButton = document.getElementById('rightDoorBottomButton');
        this.rightDoor = document.getElementById('rightDoor');
        this.leftDoor = document.getElementById('leftDoor');
    }

    setupImageLoad() {
        // if image is cached, update immediately, otherwise wait for load
        if (this.officeImage.complete) {
            this.updateImageScale();
            this.setInitialPositions();
        } else {
            this.officeImage.onload = () => {
                this.updateImageScale();
                this.setInitialPositions();
            };
        }
    }

    setInitialPositions() {
        const imageWidth = this.officeImage.offsetWidth;
        const screenWidth = window.innerWidth;
        const imageLeft = (screenWidth - imageWidth) / 2;

        this.officeImage.style.left = '50%';

        this.leftDoorButton.style.left = `${imageLeft + 1}px`;
        this.rightDoorButton.style.left = `${imageLeft + imageWidth - 120}px`;

        this.leftDoor.style.left = `${imageLeft + 70}px`;
        this.rightDoor.style.left = `${imageLeft + imageWidth - 330}px`;

        this.leftDoorTopButton.style.left = `${imageLeft + 32}px`;
        this.leftDoorTopButton.style.top = '57%';
        this.leftDoorBottomButton.style.left = `${imageLeft + 32}px`;
        this.leftDoorBottomButton.style.top = '68%';

        this.rightDoorTopButton.style.left = `${imageLeft + imageWidth - 100}px`;
        this.rightDoorTopButton.style.top = '57%';
        this.rightDoorBottomButton.style.left = `${imageLeft + imageWidth - 100}px`;
        this.rightDoorBottomButton.style.top = '68%';
    }

    updateImageScale() {
        const scale = window.innerHeight / this.frameHeight;
        const scaledWidth = (this.officeImage.naturalWidth * scale);
        this.officeImage.style.width = `${scaledWidth}px`;
        this.animator.updateScale(this.frameHeight, scale);
    }

    refresh() {
        this.getElements();
        this.animator.setElement(this.officeImage);
        this.leftDoorAnimator.setElement(document.getElementById('leftDoor'));
        this.rightDoorAnimator.setElement(document.getElementById('rightDoor'));

        this.leftDoorAnimator.showFrame(buttons.topLeft ? 13 : 6);
        this.rightDoorAnimator.showFrame(buttons.topRight ? 7 : 0);

        this.updateImageScale();
    }
}
