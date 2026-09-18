class InputHandler {
    constructor(officeView) {
        this.officeView = officeView;
        this.setupListeners();
    }

    setupListeners() {
        this.officeView.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('resize', () => this.officeView.updateImageScale());
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleMouseMove(e) {
        if (this.officeView.animator.paused) return;
        const mousePercent = e.clientX / window.innerWidth;
        const imageWidth = this.officeView.officeImage.offsetWidth;
        const screenWidth = window.innerWidth;
        const panOffset = imageWidth - screenWidth;
        const offset = (mousePercent - 0.5) * panOffset;

        const imageLeft = (screenWidth - imageWidth) / 2 - offset;
        const offsetPercent = (offset / screenWidth) * 100;

        this.officeView.officeImage.style.left = `calc(50% - ${offsetPercent}%)`;
        this.officeView.leftDoorButton.style.left = `${imageLeft + 1}px`;
        this.officeView.rightDoorButton.style.left = `${imageLeft + imageWidth - 120}px`;

        this.officeView.leftDoor.style.left = `${imageLeft + 70}px`;
        this.officeView.rightDoor.style.left = `${imageLeft + imageWidth - 320}px`;

        this.officeView.leftDoorTopButton.style.left = `${imageLeft + 32}px`;
        this.officeView.leftDoorBottomButton.style.left = `${imageLeft + 32}px`;

        this.officeView.rightDoorTopButton.style.left = `${imageLeft + imageWidth - 100}px`;
        this.officeView.rightDoorBottomButton.style.left = `${imageLeft + imageWidth - 100}px`;
    }

    handleKeyDown(e) {
        if (e.repeat) return;
        switch(e.key.toLowerCase()) {
            case 'escape':
                if (this.officeView.animator.paused) {
                    pauseManager.unpause();
                } else {
                    pauseManager.pause();
                }
                break;
            case 'q':
                    buttons.topLeftClick();
                break;
            case 'a':
                    buttons.bottomLeftClick();
                break;
            case 'e':
                    buttons.topRightClick();
                break;
            case 'd':
                    buttons.bottomRightClick();
                break;
            case ' ':
                    cameraSystem.onCameraBarHover();
                break;  
        }
    }
}
