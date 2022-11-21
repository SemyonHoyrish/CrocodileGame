import { IRound } from "./IRound";
import { RoundBase } from "./RoundBase";

export class Round0 extends RoundBase {


    start(roundDiv: Element, roundControlDiv: Element): void {
        super.start(roundDiv, roundControlDiv);

        roundDiv.innerHTML = "";
        roundControlDiv.innerHTML = "";

        roundDiv.innerHTML = `
            <div class="logo-animation"> 
                <img src="./media/images/crocodile-transparent-png.png" />
                <h1>Игра - крокодил</h1>
            </div>
        `;

    }
    
}