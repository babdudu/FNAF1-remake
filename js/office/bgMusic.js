class BackgroundMusic {
    constructor() {
        this.bgMusic = document.getElementById('bgMusic');
        this.bgMusic.volume = 0.5;
        this.stopped = false;

        this.setupBackgroundMusic();
    }

    setupBackgroundMusic() {
        // play audio with user interaction (autoplay doesnt work)
        document.body.addEventListener('click', () => {
            if (!this.stopped) {
                this.bgMusic.play();
            }
        }, { once: true });
    }

    stop() {
        this.stopped = true;
        this.bgMusic.pause();
    }
}

