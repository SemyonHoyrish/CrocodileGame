import { IRound } from "./IRound";
import { Logger } from "./Logger";
import { Round0 } from "./Round0";
import { Round1 } from "./Round1";
import { Round2 } from "./Round2";
import { Round6 } from "./Round6";

const main = () => {

    const startButton = document.querySelector("#start_button");

    if (startButton == null) return;

    let lastRound: IRound | null = null;

    const rounds = {
        0: new Round0("Logo", "", 0, [], ""),
        1: new Round1("", "", 0, [], ""),
        2: new Round0("РАЗМИНКА", "", 0, [], ""),
        4: new Round2("Тематический раунд", "5 тем по 5 слов", 90, [10, 15, 20, 25, 30], "Команды показывают по очереди, до тех пор, пока не исчерпают время"),
        6: new Round6("СЛОЖНЫЙ", "", 0, [], ""),

    };

    startButton.addEventListener("click", () => {
        var gameWindow = window.open("", "", "width=1920,height=1080;fullscreen=1");
        if (gameWindow == null) {
            console.log("ERROR: cant open window");
            return;
        }

        gameWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="./styles/style.css">
            <title>Crocodile game</title>
        </head>

        <body id="gameWindowBody">

        <div class="round_0"></div>
        <div class="round_1"></div>
        <div class="round_2"></div>
        <div class="round_4"></div>
        <div class="round_6"></div>

        </body>
        </html>
        `);

        const startRoundButtons = document.querySelectorAll(".start_round_button");

        startRoundButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const val = btn.getAttribute("value");
                if (val == null) return;
                const roundNumber = parseInt(val);
                console.log(roundNumber);

                const roundControlDiv = document.querySelector(".roundControl");
                // const roundDiv = gameWindow?.document.querySelector(".round");
                if (roundControlDiv == null) return;
                let roundDiv;

                if (lastRound !== null)
                    lastRound.clear();

                switch (roundNumber) {
                    case 0:
                        roundDiv = gameWindow?.document.querySelector(".round_0");
                        if (roundDiv == null) return;
                        lastRound = rounds[0];
                        lastRound.start(roundDiv, roundControlDiv);
                        // round_0(roundDiv, roundControlDiv);
                        break;

                    case 1:
                        roundDiv = gameWindow?.document.querySelector(".round_1");
                        if (roundDiv == null) return;
                        lastRound = rounds[1];
                        (<Round1>lastRound).Round = rounds[2];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;

                    case 2:
                        // round_2(roundDiv, roundControlDiv);
                        roundDiv = gameWindow?.document.querySelector(".round_2");
                        if (roundDiv == null) return;
                        lastRound = rounds[2];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;

                    case 3:
                        roundDiv = gameWindow?.document.querySelector(".round_1");
                        if (roundDiv == null) return;
                        lastRound = rounds[1];
                        (<Round1>lastRound).Round = rounds[4];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;
                    
                    case 4:
                        // round_2(roundDiv, roundControlDiv);
                        roundDiv = gameWindow?.document.querySelector(".round_4");
                        if (roundDiv == null) return;
                        lastRound = rounds[4];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;

                    case 5:
                        roundDiv = gameWindow?.document.querySelector(".round_1");
                        if (roundDiv == null) return;
                        lastRound = rounds[1];
                        (<Round1>lastRound).Round = rounds[6];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;

                    case 6:
                        // round_2(roundDiv, roundControlDiv);
                        roundDiv = gameWindow?.document.querySelector(".round_6");
                        if (roundDiv == null) return;
                        lastRound = rounds[6];
                        lastRound.start(roundDiv, roundControlDiv);
                        break;

                    default:
                        lastRound = null;
                        break;
                }
            });
        });

        //debug
        // (() => {
        //     const roundControlDiv = document.querySelector(".roundControl");
        //     const roundDiv = gameWindow?.document.querySelector(".round");
        //     if (roundDiv == null) return;
        //     if (roundControlDiv == null) return;
        //     round_2(roundDiv, roundControlDiv);
        // })


        // reload button
        document.querySelector("#reload_button")?.addEventListener("click", () => {
            gameWindow?.close();
            location.reload();
        });

    });

}

const lll = document.querySelector(".log");
const lllc = document.querySelector(".log_autoscroll");
if (lll && lllc) {
    new Logger(lll, lllc);
    // document.querySelector(".TEST")?.addEventListener("click", () => {
    //     Logger.logger.log("ASdasd");
    // });
} else {
    console.log("CAN'T CREATE LOGGER INSTANCE!");
}

main();


