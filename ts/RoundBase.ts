import { IRound } from "./IRound";

export class RoundBase implements IRound {
    name: string;
    taskDescription: string;
    time: number;
    scorePerWord: number[];
    teamTask: string;

    private roundDiv: Element | null = null;
    private roundControlDiv: Element | null = null;

    constructor(name: string, taskDescription: string, time: number, scorePerWord: number[], teamTask: string) {
        this.name = name;
        this.taskDescription = taskDescription;
        this.time = time;
        this.scorePerWord = scorePerWord;
        this.teamTask = teamTask;
    }

    start(roundDiv: Element, roundControlDiv: Element): void {
        this.roundDiv = roundDiv;
        this.roundControlDiv = roundControlDiv;
    }

    clear(): void {
        if (this.roundDiv != null)
            this.roundDiv.innerHTML = "";
        
        if (this.roundControlDiv != null)
            this.roundControlDiv.innerHTML = "";
    }
    
}