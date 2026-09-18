class CameraButtons {
    constructor() {
        this.ids = ['1A', '1B', '1C', '2A', '2B', '3', '4A', '4B', '5', '6', '7'];
        this.roomNames = ['Show Stage', 'Dining Area', 'Pirate Cove', 'West Hall', 'W. Hall Corner', 'Supply Closet' , 'East Hall' , 'E. Hall Corner' , 'Backstage' , 'Kitchen' , 'Restrooms'];
        this.selectedId = null;
        this.cameraBlip = new Audio('../sounds/userInteraction/cameraBlip.wav');
    }

    loadButtons () {
        this.roomText = document.getElementById('roomText');
        for(let i=0; i< this.ids.length; i++) {
            let camButton = document.createElement('button');
            camButton.className = 'cameraButton';
            camButton.id = this.ids[i];
            camButton.style.backgroundImage = `url('../static/miscellaneous/cams/${this.ids[i]}.png')`;

            camButton.addEventListener('click', () => {
                if (this.selectedId) {
                    document.getElementById(this.selectedId).style.backgroundImage = `url('../static/miscellaneous/cams/${this.selectedId}.png')`;
                }
                camButton.style.backgroundImage = `url('../static/miscellaneous/cams/green/${this.ids[i]}.png')`;
                this.selectedId = this.ids[i];
                this.roomText.textContent = this.roomNames[i];
                this.cameraRooms.showRoom();

                this.cameraBlip.play();
                // play flash gif once then remove
                let flash = document.createElement('img');
                flash.className = 'staticFlash';
                flash.src = '../static/miscellaneous/blipFlashPlayOnce.gif?' + Date.now();
                document.body.appendChild(flash);
                setTimeout(() => {
                    flash.remove();
                }, 400);
            });
            
            document.getElementById('cameraMap').appendChild(camButton);

        }
    }

    unloadButtons() {
        this.selectedId = null;
        for (let i = 0; i < this.ids.length; i++) {
            let button = document.getElementById(this.ids[i]);
            if (button) button.remove();
        }
    }
}