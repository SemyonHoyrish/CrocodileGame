import { IRound } from "./IRound";
import { Round0 } from "./Round0";
import { Round2 } from "./Round2";

const main = () => {

    const startButton = document.querySelector("#start_button");

    if (startButton == null) return;

    let lastRound: IRound | null = null;

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

        <div class="round_0"></div>
        <div class="round_2"></div>

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
                        lastRound = new Round0();
                        lastRound.start(roundDiv, roundControlDiv);
                        // round_0(roundDiv, roundControlDiv);
                        break;

                    case 2:
                        // round_2(roundDiv, roundControlDiv);
                        roundDiv = gameWindow?.document.querySelector(".round_2");
                        if (roundDiv == null) return;
                        lastRound = new Round2();
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
main();


