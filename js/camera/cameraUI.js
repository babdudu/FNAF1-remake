class CameraUI {
    constructor() {
        this.pauseButton = document.getElementById('pauseButton');

    }

    open() {      
        this.roomText = document.createElement('div');    
        this.staticPlay = document.createElement('img');
        this.cameraDiv = document.createElement('div');
        this.mapDiv = document.createElement('div');

        this.staticPlay.className = 'static';
        this.roomText.className = 'roomText';
        this.cameraDiv.className = 'cameraUI';
        this.mapDiv.className = 'cameraMap';

        this.staticPlay.src = '../static/miscellaneous/static.gif';

        
        this.cameraDiv.id = 'cameraUI';
        this.mapDiv.id = 'cameraMap';
        this.roomText.id = 'roomText';
        
        document.body.appendChild(this.mapDiv);
        document.body.appendChild(this.cameraDiv);
        document.body.appendChild(this.staticPlay);
        document.body.appendChild(this.roomText);
        
        this.pauseButton.style.display = 'none';
    }

    close() {
        if (this.cameraDiv) {
            this.cameraDiv.remove();
            this.mapDiv.remove();
            this.cameraDiv = null;
            this.mapDiv = null;
            this.staticPlay.remove();
            this.roomText.remove(); 
        }
        this.pauseButton.style.display = '';
    }
}
