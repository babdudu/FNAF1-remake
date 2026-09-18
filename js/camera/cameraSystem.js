class CameraSystem {
    constructor() {
        this.office = document.getElementById('officeContainer')
        this.cameraOn = false;
        this.canToggle = true;
        this.savedOfficeHTML = null; 
        this.createCameraDiv();
        this.cameraUI = new CameraUI();
        this.cameraAudio = new CameraAudio();
        this.cameraButtons = new CameraButtons();
        this.cameraRooms = new CameraRooms(this.cameraButtons);
        this.cameraButtons.cameraRooms = this.cameraRooms;
    }

    createCameraDiv() {
        this.camera = document.createElement('img');
        this.camera.className = 'camera';
        this.camera.style.display = 'none';
        document.body.appendChild(this.camera);
    }

    playCameraGif(gif) {
        this.camera.style.display = 'none';
        this.camera.onload = () => {
            this.camera.style.display = 'block';
        };
        this.camera.src = `../static/theOffice/${gif}?${Date.now()}`;
    }

    onCameraBarHover() {
        if (!this.canToggle) return;

        this.canToggle = false;
        setTimeout(() => this.canToggle = true, 600);

        this.cameraOn = !this.cameraOn;
        powerSystem.updateUsage();

        if (this.cameraOn) {
            // save office contents
            this.savedOfficeHTML = this.office.innerHTML;
            
            this.playCameraGif('camera.gif');
            this.cameraAudio.playOpen();
            
            setTimeout(() => {
                this.office.innerHTML = '';
                this.cameraUI.open();
                this.cameraRooms.load(this.office);
                this.cameraButtons.loadButtons();
                document.getElementById('1A').click();
                
                setTimeout( () =>  {
                     this.camera.style.display = 'none';
                }, 100)
            }, 400);

        } else {
            this.cameraUI.close();
            this.cameraRooms.unload();
            this.cameraButtons.unloadButtons();
            this.playCameraGif('cameraDown.gif');
            this.cameraAudio.playClose();
            
            setTimeout(() => {
                // restore office view
                this.office.innerHTML = this.savedOfficeHTML;

                const img = document.getElementById('officeImage');
                if (img.complete) {
                    officeView.refresh();
                    officeView.setInitialPositions();
                } else {
                    img.onload = () => {
                        officeView.refresh();
                        officeView.setInitialPositions();
                    };
                }
            }, 50);
            
            setTimeout(() => {
                this.camera.style.display = 'none';
            }, 400);
        }
    }
}