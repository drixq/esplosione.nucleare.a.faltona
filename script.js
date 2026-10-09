let dialogueStep = 0;
let gameStarted = false;
let miniGameStarted = false;

const dialogues = [
    "eilà donzella, ho fame!",
    "ma che sgradevole che sono stato… mi scuso per i miei modi, pulzella.",
    "il mio nome è benjamin… vengo dal lussemburgo e sono un cavallo di altissima classe…",
    "comunque… mi duole un po’ il pancino. le dispiacerebbe aiutarmi? ho appena fatto lucidare ad albert i miei zoccoli… non vorrei rovinare il suo splendido lavoro!"
];

const objects = [
    { name: "mela", image: "cibo/mela.PNG", message: "hmm.. buona..", horse: "images/cavallo/cavallo dritto.PNG" },
    { name: "carota", image: "cibo/carota.PNG", message: "hmm carota", horse: "images/cavallo/cavallo dritto.PNG" },
    { name: "fieno", image: "cibo/fieno.PNG", message: "👀", horse: "images/cavallo/cavallo scioccato.PNG" },
    { name: "bomba", image: "cibo/bomba.PNG", message: "oh cacca", horse: "images/cavallo/esplosione.PNG" },
    { name: "matita", image: "cibo/matita.PNG", message: "ommioddio cosa hai fatto", horse: "images/cavallo/cavallo girato.PNG" },
    { name: "microfono", image: "cibo/mic.PNG", horse: "images/cavallo/cavallo dritto.PNG" },
    { name: "sigaretta", image: "cibo/siga.PNG", message: "io fumo SOLO sigari originari di cuba, non quello schifo. ", horse: "images/cavallo/cavallo arrabbiato.PNG" },
    { name: "torta", image: "cibo/torta.PNG", message: "buon compleanno cavallona tiamissimo!  ", horse: "images/cavallo/cavallo dritto.PNG" }
];

function startGame() {
    dialogueStep = 0;
    gameStarted = true;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";
    document.getElementById("dialogue").textContent = dialogues[0];
    document.getElementById("continue-text").style.display = "block";
}

function nextDialogue() {
    if (!gameStarted || miniGameStarted) return;

    if (dialogueStep < dialogues.length - 1) {
        dialogueStep++;
        document.getElementById("dialogue").textContent = dialogues[dialogueStep];
        document.getElementById("continue-text").style.display = "block";
    } else {
        document.getElementById("continue-text").style.display = "none";
        startPixelTransition();
    }
}

function startPixelTransition() {
    const transition = document.getElementById("pixel-transition");

    if (!transition) {
        showMiniGame();
        return;
    }

    transition.innerHTML = "";

    for (let i = 0; i < 96; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel-block";
        transition.appendChild(pixel);
    }

    const pixels = Array.from(transition.children);

    pixels.forEach((pixel, index) => {
        setTimeout(() => pixel.classList.add("active"), index * 12);
    });

    setTimeout(() => {
        showMiniGame();

        pixels.forEach((pixel, index) => {
            setTimeout(() => pixel.classList.remove("active"), index * 12);
        });
    }, 1400);
}

function showMiniGame() {
    miniGameStarted = true;

    const conversation = document.getElementById("conversation");
    const continueText = document.getElementById("continue-text");
    const gameScreen = document.getElementById("game-screen");

    conversation.innerHTML = `
        <img id="horse"
             src="images/cavallo/cavallo dritto.PNG"
             alt="Benjamin">
        <div id="dialogue-box">
            <p id="dialogue"> ho ancora fame...non mi faccia chiamare albert.</p>
        </div>
    `;

    const oldObjects = document.getElementById("object-menu");
    if (oldObjects) oldObjects.remove();

    const objectMenu = document.createElement("div");
    objectMenu.id = "object-menu";

    objects.forEach((object) => {
        const button = document.createElement("button");
        button.className = "object-button";
        button.type = "button";
        button.innerHTML = `
            <img src="${object.image}" alt="${object.name}">
        `;

        button.addEventListener("click", (event) => {
            event.stopPropagation();
            chooseObject(object);
        });

        objectMenu.appendChild(button);
    });

    gameScreen.appendChild(objectMenu);
    gameScreen.style.cursor = "default";

    continueText.style.display = "none";

    objectMenu.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

function chooseObject(object) {
    const dialogue = document.getElementById("dialogue");
    const horse = document.getElementById("horse");

    dialogue.textContent = object.message;
    horse.src = object.horse;
    horse.alt = "Benjamin";

    if (object.name === "torta") {
        dialogue.textContent = "buon compleanno cavallona tiamissimo";
        showBirthdayEnding();
    }

    if (object.name === "matita") {
        dialogue.textContent = "cosa hai fatto, che mostro...";
    }

    if (object.name === "microfono") {
        dialogue.textContent = "oh eilà, che canterino 👀";
    }
}

function showBirthdayEnding() {
    const menu = document.getElementById("object-menu");

    if (menu) {
        menu.innerHTML = `
            <div id="birthday-message">
                🎉 BUON COMPLEANNO AURORA! 🎉
                <p>da benjamin, il cavallo più elegante del lussemburgo</p>
            </div>
        `;
    }
}
