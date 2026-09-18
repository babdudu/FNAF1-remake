// for audio handling in main menu
class MenuAudio {
    constructor() {
        this.bgMusic = document.getElementById('bgMusic');
        this.hoverSound = document.getElementById('buttonAction');
        this.clickSound = document.getElementById('buttonAction');

        this.bgMusic.volume = 0.7;
        this.hoverSound.volume = 0.4;
        this.clickSound.volume = 0.4;

        this.canPlayHover = true; // debounce flag
        this.hoverCooldown = 150; // milliseconds between hover sounds

        this.setupBackgroundMusic();
        this.setupButtonSounds();
    }

    setupBackgroundMusic() {
        // play audio with user interaction (autoplay doesnt work)
        document.body.addEventListener('click', () => {
            this.bgMusic.play();
        }, { once: true });
    }

    setupButtonSounds() {
        const allButtons = [
            ...document.querySelectorAll('.menuButton'),
            ...document.querySelectorAll('.menuButton1')
        ];
        
        allButtons.forEach(button => {
            // play sound hover with debounce
            button.addEventListener('mouseenter', () => {
                if (this.canPlayHover) {
                    this.hoverSound.currentTime = 0; 
                    this.hoverSound.play();
                    this.canPlayHover = false;
                    setTimeout(() => {
                        this.canPlayHover = true;
                    }, this.hoverCooldown);
                }
            });

            // play sound on click
            button.addEventListener('click', () => {
                this.clickSound.play();
            });
        });
    }
}

