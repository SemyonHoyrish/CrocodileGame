import { Round2 } from "./Round2";

const round_0 = (roundDiv: Element, controlRoundDiv: Element): void => {
    roundDiv.innerHTML = "";
    controlRoundDiv.innerHTML = "";

    roundDiv.innerHTML = `
        <div class="logo-animation"> 
            <img src="./media/images/crocodile-transparent-png.png" />
            <h1>Игра - крокодил</h1>
        </div>
    `;

}

const main = () => {

    const startButton = document.querySelector("#start_button");

    if (startButton == null) return;

    startButton.addEventListener("click", () => {
        var gameWindow = window.open("", "", "width=1000,height=600");
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

        <div class="round"></div>

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
                const roundDiv = gameWindow?.document.querySelector(".round");
                if (roundDiv == null) return;
                if (roundControlDiv == null) return;

                switch (roundNumber) {
                    case 0:
                        round_0(roundDiv, roundControlDiv);
                        break;

                    case 2:
                        // round_2(roundDiv, roundControlDiv);
                        new Round2().start(roundDiv, roundControlDiv);
                        break;

                    default:
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


