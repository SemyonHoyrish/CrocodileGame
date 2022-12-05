import { Logger } from "./Logger";
import { RoundBase } from "./RoundBase";

export class Round6 extends RoundBase {

    private words: string[] = [
        "",
        "Знакомство",
        "",
        "Ссора",
        "",
        "Забастовка",
        ""
    ];

    start(roundDiv: Element, roundControlDiv: Element): void {
        super.start(roundDiv, roundControlDiv);

        roundControlDiv.innerHTML = `
            <p class="word_info"></p>
            <button class="previous">previous</button>
            <button class="next">next</button>
        `;        

        roundDiv.innerHTML = `<p class="word"><p>`;


        const word = roundDiv.querySelector(".word");
        const word_info = roundControlDiv.querySelector(".word_info");
        if (word == null || word_info == null) {
            Logger.instance.log("ERROR: no word block found!");
            return;
        }

        let index = 0;

        const get_word_info = (index: number):string  => {
            const is_empty: boolean = this.words[index] == "";
            return `(${index+1}/${this.words.length}|${is_empty ? "-" : (index+1)/2}/${(this.words.length - 1)/2})${is_empty ? "(empty)" : this.words[index]}`;
        }
        
        roundControlDiv.querySelector(".next")?.addEventListener("click", () => {
            word.classList.add("hidden");
            setTimeout(() => {
                setTimeout(() => {
                    word.classList.remove("hidden");
                }, 500);
                if (index + 1 < this.words.length) {
                    word.innerHTML = this.words[++index];
                    word_info.innerHTML = get_word_info(index);
                } else {
                    word.innerHTML = "";
                    word_info.innerHTML = "(out of array bounds)";
                }
            }, 500);
        });
        roundControlDiv.querySelector(".previous")?.addEventListener("click", () => {
            word.classList.add("hidden");
            setTimeout(() => {
                setTimeout(() => {
                    word.classList.remove("hidden");
                }, 500);
                if (index - 1 >= 0) {
                    word.innerHTML = this.words[--index];
                    word_info.innerHTML = get_word_info(index);
                } else {
                    word.innerHTML = "";
                    word_info.innerHTML = "(out of array bounds)";
                }
            }, 500);
            
        });


    }

}