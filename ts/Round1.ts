import { IRound } from "./IRound";
import { Logger } from "./Logger";
import { RoundBase } from "./RoundBase";

export class Round1 extends RoundBase {

    private round: IRound | null = null;

    set Round(round: IRound) {
        this.round = round;
    }

    start(roundDiv: Element, roundControlDiv: Element): void {
        super.start(roundDiv, roundControlDiv);

        if (this.round == null) {
            Logger.logger.log("ERROR: No round specified!");
            return;
        }

        roundDiv.innerHTML = `
            <p class="round_info name">${this.round.name}</p>
            <p class="round_info task">Задания: <br/ >${this.round.taskDescription}</p>
            <p class="round_info time">Время: <br/ >${this.round.time} секунд</p>
            <p class="round_info score">Стоимость отгаданного слова: <br/ >${this.round.scorePerWord} баллов</p>
            <p class="round_info team_task">Задача команды: <br/ >${this.round.teamTask}</p>
        `;

        let t = 0;
        roundDiv.querySelectorAll(".round_info").forEach(p => {
            console.log(p);
            t += 1000;
            setTimeout(() => {
                p.classList.add("show");
            }, t);
            setTimeout(() => {
                p.classList.add("hide");
            }, t + 2000 + ( p.classList.contains("team_task") ? 1000 : 0 ));
            t += 2500;
        });

    }
    
}