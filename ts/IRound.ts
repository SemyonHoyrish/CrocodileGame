export interface IRound {

    name: string;
    taskDescription: string;
    time: number;
    scorePerWord: number[];
    teamTask: string;

    start(roundDiv: Element, roundControlDiv: Element): void;
    clear(): void;
}
