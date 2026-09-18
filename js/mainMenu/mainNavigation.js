let menuButtonsHTML = null; 

function newGame() {
    const menuContent = document.getElementById("menuContent");
    menuButtonsHTML = menuContent.innerHTML;

    menuContent.innerHTML = `
        <p class="nightText">Start a new game?</p>
        <button class="menuButton" onclick="confirmNewGame()">
            <img class="arrow arrowYes" src="static/miscellaneous/hover.png">
            Yes
        </button>
        <button class="menuButton" onclick="cancelNewGame()">
            <img class="arrow arrowNo" src="static/miscellaneous/hover.png">
            No
        </button>
    `;

    audio.setupButtonSounds();
}

function confirmNewGame() {
    showHelpWantedPoster(1);
}

function cancelNewGame() {
    const menuContent = document.getElementById("menuContent");
    menuContent.innerHTML = menuButtonsHTML; 
    audio.setupButtonSounds(); 
}

function cont() {
    // TODO: Implement continue functionality
}


function showHelpWantedPoster(night) {
    const transition = document.createElement('div');
    transition.className = 'helpWantedPoster';
    document.getElementById("mainMenuBg").style.background = '#000';
    document.getElementById("mainMenuBg").style.backgroundImage = 'none';
    document.getElementById("mainMenuBg").innerHTML = '';
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.style.opacity = '1';
        document.getElementById("menuContent").innerHTML = '';

   }, 1000);
    setTimeout(() => {
        showNightInfo(transition, night);
    }, 6000);
}

function showNightInfo(container, night) {
        container.innerHTML = '';
        container.className = 'helpWantedPoster nightInfoContainer';

        const timeDisplay = document.createElement('h1');
        timeDisplay.textContent = '12:00 AM';
        timeDisplay.className = 'nightTimeDisplay';

        const nightDisplay = document.createElement('h2');
        nightDisplay.textContent = `Night ${night}`;
        nightDisplay.className = 'nightNumberDisplay';

        const staticOverlay = document.createElement('img');
        staticOverlay.src = 'static/miscellaneous/blipFlash.gif';
        staticOverlay.className = 'nightStaticOverlay';

        container.appendChild(timeDisplay);
        container.appendChild(nightDisplay);
        container.appendChild(staticOverlay);

        setTimeout(() => {
            staticOverlay.style.opacity = '0';
        }, 400)
        
        const nightAudio = new Audio("sounds/userInteraction/cameraBlip.wav");  
        nightAudio.volume = 0.7;
        nightAudio.play();

        setTimeout(() => {
            window.location.replace('../screens/officeView.html');
        }, 2000)
}