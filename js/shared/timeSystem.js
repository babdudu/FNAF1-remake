
class TimeSystem {
    constructor(officeView) {
        this.officeView = officeView;
        this.timeDiv = document.getElementById('currentTime');
        this.currentTime = 1;
        this.timePerHour = 45000;
        this.elapsed = 0; // time elapsed in current hour
        this.lastTick = Date.now();
        this.isNightFinished = false;
        this.updateTime();
    }

    updateTime() {
        setTimeout(() => {
            const now = Date.now();

            // if paused, don't count time, just check again
            if (this.officeView.paused) {
                this.lastTick = now;
                this.updateTime();
                return;
            }

            // add time since last tick
            this.elapsed += now - this.lastTick;
            this.lastTick = now;
          
            // if enough time passed, advance hour
            if (this.elapsed >= this.timePerHour) {
                this.elapsed = 0;
                this.timeDiv.innerText = " " + this.currentTime + " AM ";
                this.timeDiv.style.marginLeft = '91%';

                // // TEST: trigger jumpscare at 1 AM
                // if (this.currentTime === 1) {
                //     playJumpscare('../static/jumpscares/bonnie.gif');
                //     return;
                // }

                this.currentTime++;

                if (this.currentTime > 6) {
                    this.nightFinished();
                    return;
                }
            }

            this.updateTime();
        }, 100);
    }

    reset() {
        this.currentTime = 1;
        this.elapsed = 0;
        this.lastTick = Date.now();
        this.isNightFinished = false;
        this.timeDiv.innerText = ' 12 AM ';
        this.timeDiv.style.marginLeft = '';
    }

    nightFinished() {
        this.isNightFinished = true;

        // if power is out, stop the power out audio first
        if (powerSystem.powerOut) {
            powerSystem.powerdownSound.pause();
            powerSystem.musicBoxSound.pause();
        }

        // stop all audio
        if (typeof audio !== 'undefined') {
            audio.stop();
        }
        if (typeof buttons !== 'undefined') {
            buttons.lightSound.pause();
            buttons.doorSound.pause();
        }

        const body = document.getElementById('officeView')
        body.innerHTML = ''

        // play chimes, then crowd sound after 8 seconds
        const chimes = new Audio('../sounds/ending/chimes 2.wav');
        const crowd = new Audio('../sounds/ending/CROWD_SMALL_CHIL_EC049202.wav');

        const playAudio = () => {
            chimes.play();
            setTimeout(() => {
                crowd.play();
            }, 8000);
        };

        // try to play, if it fails wait for click, if success, .then runs
        chimes.play().then(() => {
            setTimeout(() => {
                crowd.play();
            }, 8000);
        }).catch(() => {
            // audio locked, wait for user click
            document.body.addEventListener('click', playAudio, { once: true });
        });

        const transitionText = document.createElement('div');
        transitionText.id = 'transitionText';
        transitionText.className = 'transitionText';
        transitionText.innerHTML = '<span class="five">5</span><span class="six">6</span><span class="am">AM</span>';

        body.appendChild(transitionText);
    }
}