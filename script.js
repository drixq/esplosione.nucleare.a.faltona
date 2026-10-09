let dialogueStep = 0;

const dialogues = [
    "eilà donzella, ho fame!",

    "ma che sgradevole che sono stato… mi scuso per i miei modi, pulzella.",

    "il mio nome è benjamin… vengo dal lussemburgo e sono un cavallo di altissima classe…",

    "comunque… mi duole un po’ il pancino. le dispiacerebbe aiutarmi? ho appena fatto lucidare ad albert i miei zoccoli… non vorrei rovinare il suo splendido lavoro!"
];


function startGame() {
    dialogueStep = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "flex";

    document.getElementById("dialogue").textContent = dialogues[0];
}


function nextDialogue() {
    dialogueStep++;

    if (dialogueStep < dialogues.length) {
        document.getElementById("dialogue").textContent =
            dialogues[dialogueStep];
    } else {
        // Per ora fermiamo i dialoghi all'ultima frase.
        dialogueStep = dialogues.length - 1;
    }
}
