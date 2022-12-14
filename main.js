define("IRound", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Logger", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Logger = void 0;
    class Logger {
        constructor(logBox, checkbox) {
            this.messageTemplate = `
    <p class="log_message"><span class="log_message_time">[{time}]</span> {text}</p>
    `;
            this.logBox = logBox;
            this.checkbox = checkbox;
            if (!Logger.created) {
                Logger.instance = this;
                Logger.created = true;
            }
            else {
                Logger.instance.log("ERROR: Instance of logger already created!");
            }
        }
        log(message) {
            const d = new Date();
            let p = document.createElement("p");
            p.classList.add(".log_message");
            p.innerHTML = `
            <span class="log_message_time">[${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}]</span> ${message}
        `;
            const flag = this.logBox.scrollTop == this.logBox.scrollHeight;
            console.log(this.logBox.scrollTop, this.logBox.scrollHeight);
            this.logBox.appendChild(p);
            if (this.checkbox.checked)
                this.logBox.scrollTop = this.logBox.scrollHeight;
        }
    }
    exports.Logger = Logger;
    Logger.created = false;
});
define("RoundBase", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RoundBase = void 0;
    class RoundBase {
        constructor(name, taskDescription, time, scorePerWord, teamTask) {
            this.roundDiv = null;
            this.roundControlDiv = null;
            this.name = name;
            this.taskDescription = taskDescription;
            this.time = time;
            this.scorePerWord = scorePerWord;
            this.teamTask = teamTask;
        }
        start(roundDiv, roundControlDiv) {
            this.roundDiv = roundDiv;
            this.roundControlDiv = roundControlDiv;
        }
        clear() {
            if (this.roundDiv != null)
                this.roundDiv.innerHTML = "";
            if (this.roundControlDiv != null)
                this.roundControlDiv.innerHTML = "";
        }
    }
    exports.RoundBase = RoundBase;
});
define("Round0", ["require", "exports", "RoundBase"], function (require, exports, RoundBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round0 = void 0;
    class Round0 extends RoundBase_1.RoundBase {
        start(roundDiv, roundControlDiv) {
            super.start(roundDiv, roundControlDiv);
            roundDiv.innerHTML = "";
            roundControlDiv.innerHTML = "";
            roundDiv.innerHTML = `
            <div class="logo-animation"> 
                <img src="./media/images/cr_2.png" />
                <h1>???????? - ????????????????</h1>
            </div>
        `;
        }
    }
    exports.Round0 = Round0;
});
define("Round1", ["require", "exports", "Logger", "RoundBase"], function (require, exports, Logger_1, RoundBase_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round1 = void 0;
    class Round1 extends RoundBase_2.RoundBase {
        constructor() {
            super(...arguments);
            this.round = null;
        }
        set Round(round) {
            this.round = round;
        }
        start(roundDiv, roundControlDiv) {
            super.start(roundDiv, roundControlDiv);
            if (this.round == null) {
                Logger_1.Logger.instance.log("ERROR: No round specified!");
                return;
            }
            roundDiv.innerHTML = `
            <p class="round_info name">${this.round.name}</p>
            <p class="round_info task">??????????????: <br/ >${this.round.taskDescription}</p>
            <p class="round_info time">??????????: <br/ >${this.round.time} ????????????</p>
            <p class="round_info score">?????????????????? ?????????????????????? ??????????: <br/ >${this.round.scorePerWord} ????????????</p>
            <p class="round_info team_task">???????????? ??????????????: <br/ >${this.round.teamTask}</p>
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
                }, t + 2000 + (p.classList.contains("team_task") ? 1000 : 0));
                t += 2500;
            });
        }
    }
    exports.Round1 = Round1;
});
define("Round2", ["require", "exports", "RoundBase"], function (require, exports, RoundBase_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round2 = void 0;
    class Round2 extends RoundBase_3.RoundBase {
        start(roundDiv, roundControlDiv) {
            super.start(roundDiv, roundControlDiv);
            class Card {
                constructor(word, points) {
                    this.word = word;
                    this.points = points;
                }
            }
            class Category {
                constructor(name, cards) {
                    this.name = name;
                    this.cards = cards;
                }
            }
            const categories = [
                new Category("????????????", [
                    new Card("????????????", 10),
                    new Card("?????????????????????? ????????????????", 20),
                    new Card("Smth _ 1", 30),
                ]),
                new Category("??????????????", [
                    new Card("??????????????", 10),
                    new Card("smth - 2", 20),
                    new Card("smth - 3", 30),
                ]),
                new Category("??????????????", [
                    new Card("???????????????? ??????????", 10),
                    new Card("????????", 20),
                    new Card("SMTH - 4", 30),
                ]),
            ];
            roundDiv.innerHTML = "";
            roundControlDiv.innerHTML = "";
            roundControlDiv.innerHTML = `
            <h3>Round 2</h3>
            <p>Team 1 score: <span id="team_1_score">0</span></p>
            <p>Team 2 score: <span id="team_2_score">0</span></p>
        `;
            const team_1_score = roundControlDiv.querySelector("#team_1_score");
            const team_2_score = roundControlDiv.querySelector("#team_2_score");
            if (team_1_score == null || team_2_score == null)
                return;
            let id_round = 1;
            let id_round_control = 1;
            categories.forEach(category => {
                const rowRound = document.createElement("div");
                rowRound.classList.add("category");
                rowRound.innerHTML += `
                <div class="card category-name">
                    ${category.name}
                </div>
            `;
                category.cards.forEach(card => {
                    rowRound.innerHTML += `
                <div id="card_id_${id_round++}" class="card">
                    <span class="points">${card.points}</span>
                    <span class="word">${card.word}</span>
                </div>
            `;
                });
                roundDiv.appendChild(rowRound);
                const rowControlRound = document.createElement("div");
                rowControlRound.classList.add("category");
                rowControlRound.innerHTML += `
                <div class="card category-name">
                    ${category.name}
                </div>
            `;
                category.cards.forEach(card => {
                    rowControlRound.innerHTML += `
                <div id="card_id_${id_round_control++}" class="card">
                    <span class="points">${card.points}</span>
                    <span class="word">${card.word}</span>
                </div>
            `;
                });
                roundControlDiv.appendChild(rowControlRound);
            });
            roundControlDiv.innerHTML += `
            <button class="word_answer_button correct">correct</button>
            <button class="word_answer_button skip">skip</button>
            <button class="word_answer_button incorrect">incorrect</button>
        `;
            roundDiv.innerHTML += `
            <div class="card_word_view">
                <p class="category-info"><span class="category"></span>: <span class="score"></span><p>
                <p class="word"></p>
            </div>
        `;
            const cardWordView = roundDiv.querySelector(".card_word_view");
            const cardWordView_category = cardWordView === null || cardWordView === void 0 ? void 0 : cardWordView.querySelector(".category");
            const cardWordView_score = cardWordView === null || cardWordView === void 0 ? void 0 : cardWordView.querySelector(".score");
            const cardWordView_word = cardWordView === null || cardWordView === void 0 ? void 0 : cardWordView.querySelector(".word");
            if (cardWordView == null ||
                cardWordView_category == null ||
                cardWordView_score == null ||
                cardWordView_word == null)
                return;
            let current_card_id = 0;
            let current_card;
            roundControlDiv.querySelectorAll(".card:not(.category-name)").forEach(btn => {
                btn.addEventListener("click", () => {
                    const _id = parseInt(btn.id.replace("card_id_", ""));
                    const card = roundDiv.querySelector(`#card_id_${_id}.card`);
                    if (card == null)
                        return;
                    // card.classList.toggle("shown");
                    console.log(0);
                    let ___id = 0;
                    console.log(categories.length);
                    for (let i = 0; i < categories.length; ++i) {
                        console.log("===> ", categories[i].cards.length);
                        for (let j = 0; j < categories[i].cards.length; ++j) {
                            ___id++;
                            console.log("ID: ", ___id);
                            if (___id == _id) {
                                console.log(1);
                                cardWordView_category.innerHTML = categories[i].name;
                                cardWordView_score.innerHTML = categories[i].cards[j].points.toString();
                                cardWordView_word.innerHTML = categories[i].cards[j].word;
                                cardWordView.classList.add("active");
                            }
                        }
                    }
                    current_card_id = _id;
                    current_card = card;
                });
            });
            roundControlDiv.querySelectorAll(".word_answer_button").forEach(btn => {
                btn.addEventListener("click", () => {
                    var _a, _b, _c;
                    if (current_card_id != 0) {
                        // const cardWordView = roundDiv.querySelector(".card_word_view");
                        if (btn.classList.contains("correct")) {
                            current_card.classList.remove("correct");
                            current_card.classList.remove("skip");
                            current_card.classList.remove("incorrect");
                            current_card.classList.add("correct");
                            cardWordView.classList.add("correct");
                            (_a = roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)) === null || _a === void 0 ? void 0 : _a.classList.add("correct");
                        }
                        else if (btn.classList.contains("skip")) {
                            current_card.classList.remove("correct");
                            current_card.classList.remove("skip");
                            current_card.classList.remove("incorrect");
                            current_card.classList.add("skip");
                            cardWordView.classList.add("skip");
                            (_b = roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)) === null || _b === void 0 ? void 0 : _b.classList.add("skip");
                        }
                        else if (btn.classList.contains("incorrect")) {
                            current_card.classList.remove("correct");
                            current_card.classList.remove("skip");
                            current_card.classList.remove("incorrect");
                            current_card.classList.add("incorrect");
                            cardWordView.classList.add("incorrect");
                            (_c = roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)) === null || _c === void 0 ? void 0 : _c.classList.add("incorrect");
                        }
                        setTimeout(() => {
                            cardWordView.classList.remove("active");
                        }, 200);
                        setTimeout(() => {
                            cardWordView.classList.remove("correct");
                            cardWordView.classList.remove("skip");
                            cardWordView.classList.remove("incorrect");
                        }, 1000);
                    }
                });
            });
        }
    }
    exports.Round2 = Round2;
});
define("Round6", ["require", "exports", "Logger", "RoundBase"], function (require, exports, Logger_2, RoundBase_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round6 = void 0;
    class Round6 extends RoundBase_4.RoundBase {
        constructor() {
            super(...arguments);
            this.words = [
                "",
                "????????????????????",
                "",
                "??????????",
                "",
                "????????????????????",
                ""
            ];
        }
        start(roundDiv, roundControlDiv) {
            var _a, _b;
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
                Logger_2.Logger.instance.log("ERROR: no word block found!");
                return;
            }
            let index = 0;
            const get_word_info = (index) => {
                const is_empty = this.words[index] == "";
                return `(${index + 1}/${this.words.length}|${is_empty ? "-" : (index + 1) / 2}/${(this.words.length - 1) / 2})${is_empty ? "(empty)" : this.words[index]}`;
            };
            (_a = roundControlDiv.querySelector(".next")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                word.classList.add("hidden");
                setTimeout(() => {
                    setTimeout(() => {
                        word.classList.remove("hidden");
                    }, 500);
                    if (index + 1 < this.words.length) {
                        word.innerHTML = this.words[++index];
                        word_info.innerHTML = get_word_info(index);
                    }
                    else {
                        word.innerHTML = "";
                        word_info.innerHTML = "(out of array bounds)";
                    }
                }, 500);
            });
            (_b = roundControlDiv.querySelector(".previous")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                word.classList.add("hidden");
                setTimeout(() => {
                    setTimeout(() => {
                        word.classList.remove("hidden");
                    }, 500);
                    if (index - 1 >= 0) {
                        word.innerHTML = this.words[--index];
                        word_info.innerHTML = get_word_info(index);
                    }
                    else {
                        word.innerHTML = "";
                        word_info.innerHTML = "(out of array bounds)";
                    }
                }, 500);
            });
        }
    }
    exports.Round6 = Round6;
});
define("main", ["require", "exports", "Logger", "Round0", "Round1", "Round2", "Round6"], function (require, exports, Logger_3, Round0_1, Round1_1, Round2_1, Round6_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const main = () => {
        const startButton = document.querySelector("#start_button");
        if (startButton == null)
            return;
        let lastRound = null;
        const rounds = {
            0: new Round0_1.Round0("Logo", "", 0, [], ""),
            1: new Round1_1.Round1("", "", 0, [], ""),
            2: new Round0_1.Round0("????????????????", "", 0, [], ""),
            4: new Round2_1.Round2("???????????????????????? ??????????", "5 ?????? ???? 5 ????????", 90, [10, 15, 20, 25, 30], "?????????????? ???????????????????? ???? ??????????????, ???? ?????? ??????, ???????? ???? ?????????????????? ??????????"),
            6: new Round6_1.Round6("??????????????", "", 0, [], ""),
        };
        startButton.addEventListener("click", () => {
            var _a;
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
                    if (val == null)
                        return;
                    const roundNumber = parseInt(val);
                    console.log(roundNumber);
                    const roundControlDiv = document.querySelector(".roundControl");
                    // const roundDiv = gameWindow?.document.querySelector(".round");
                    if (roundControlDiv == null)
                        return;
                    let roundDiv;
                    if (lastRound !== null)
                        lastRound.clear();
                    switch (roundNumber) {
                        case 0:
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_0");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[0];
                            lastRound.start(roundDiv, roundControlDiv);
                            // round_0(roundDiv, roundControlDiv);
                            break;
                        case 1:
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_1");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[1];
                            lastRound.Round = rounds[2];
                            lastRound.start(roundDiv, roundControlDiv);
                            break;
                        case 2:
                            // round_2(roundDiv, roundControlDiv);
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_2");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[2];
                            lastRound.start(roundDiv, roundControlDiv);
                            break;
                        case 3:
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_1");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[1];
                            lastRound.Round = rounds[4];
                            lastRound.start(roundDiv, roundControlDiv);
                            break;
                        case 4:
                            // round_2(roundDiv, roundControlDiv);
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_4");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[4];
                            lastRound.start(roundDiv, roundControlDiv);
                            break;
                        case 5:
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_1");
                            if (roundDiv == null)
                                return;
                            lastRound = rounds[1];
                            lastRound.Round = rounds[6];
                            lastRound.start(roundDiv, roundControlDiv);
                            break;
                        case 6:
                            // round_2(roundDiv, roundControlDiv);
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_6");
                            if (roundDiv == null)
                                return;
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
            (_a = document.querySelector("#reload_button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.close();
                location.reload();
            });
        });
    };
    const lll = document.querySelector(".log");
    const lllc = document.querySelector(".log_autoscroll");
    if (lll && lllc) {
        new Logger_3.Logger(lll, lllc);
        // document.querySelector(".TEST")?.addEventListener("click", () => {
        //     Logger.logger.log("ASdasd");
        // });
    }
    else {
        console.log("CAN'T CREATE LOGGER INSTANCE!");
    }
    main();
});
