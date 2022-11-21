import { IRound } from "./IRound";

export class Round0 implements IRound {

    private roundDiv: Element | null = null;
    private roundControlDiv: Element | null = null;

    start(roundDiv: Element, roundControlDiv: Element): void {
        this.roundDiv = roundDiv;
        this.roundControlDiv = roundControlDiv;

        roundDiv.innerHTML = "";
        roundControlDiv.innerHTML = "";

        roundDiv.innerHTML = `
            <div class="logo-animation"> 
                <img src="./media/images/crocodile-transparent-png.png" />
                <h1>Игра - крокодил</h1>
            </div>
        `;

    }
    
    clear(): void {
        if (this.roundDiv != null)
            this.roundDiv.innerHTML = "";
        
        if (this.roundControlDiv != null)
            this.roundControlDiv.innerHTML = "";
    }
    
}