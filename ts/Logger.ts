export class Logger {

    static logger: Logger;
    private static created: boolean = false;
    
    private logBox: Element;
    private checkbox: Element;
    private readonly messageTemplate: string = `
    <p class="log_message"><span class="log_message_time">[{time}]</span> {text}</p>
    `;

    constructor(logBox: Element, checkbox: Element) {
        this.logBox = logBox;
        this.checkbox = checkbox;

        if(!Logger.created) {
            Logger.logger = this;
            Logger.created = true;
        }
        else {
            Logger.logger.log("ERROR: Instance of logger already created!");
        }
    }

    log(message: string): void {
        const d = new Date();
        
        let p = document.createElement("p");
        p.classList.add(".log_message");
        p.innerHTML = `
            <span class="log_message_time">[${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}]</span> ${message}
        `;

        const flag: boolean = this.logBox.scrollTop == this.logBox.scrollHeight;
        console.log(this.logBox.scrollTop, this.logBox.scrollHeight)

        this.logBox.appendChild(p);

        if ((<HTMLInputElement>this.checkbox).checked)
            this.logBox.scrollTop = this.logBox.scrollHeight;

    }

}