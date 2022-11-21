define("IRound", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Round0", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round0 = void 0;
    class Round0 {
        constructor() {
            this.roundDiv = null;
            this.roundControlDiv = null;
        }
        start(roundDiv, roundControlDiv) {
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
        clear() {
            if (this.roundDiv != null)
                this.roundDiv.innerHTML = "";
            if (this.roundControlDiv != null)
                this.roundControlDiv.innerHTML = "";
        }
    }
    exports.Round0 = Round0;
});
define("Round2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Round2 = void 0;
    class Round2 {
        constructor() {
            this.roundDiv = null;
            this.roundControlDiv = null;
        }
        start(roundDiv, roundControlDiv) {
            this.roundDiv = roundDiv;
            this.roundControlDiv = roundControlDiv;
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
                new Category("Оружие", [
                    new Card("Кинжал", 10),
                    new Card("Снайперская винтовка", 20),
                    new Card("Smth _ 1", 30),
                ]),
                new Category("Деревня", [
                    new Card("Сеновал", 10),
                    new Card("smth - 2", 20),
                    new Card("smth - 3", 30),
                ]),
                new Category("Острова", [
                    new Card("Огненная земля", 10),
                    new Card("Куба", 20),
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
                            current_card.classList.add("correct");
                            cardWordView.classList.add("correct");
                            (_a = roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)) === null || _a === void 0 ? void 0 : _a.classList.add("correct");
                        }
                        else if (btn.classList.contains("skip")) {
                            current_card.classList.add("skip");
                            cardWordView.classList.add("skip");
                            (_b = roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)) === null || _b === void 0 ? void 0 : _b.classList.add("skip");
                        }
                        else if (btn.classList.contains("incorrect")) {
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
        clear() {
            if (this.roundDiv != null)
                this.roundDiv.innerHTML = "";
            if (this.roundControlDiv != null)
                this.roundControlDiv.innerHTML = "";
        }
    }
    exports.Round2 = Round2;
});
define("main", ["require", "exports", "Round0", "Round2"], function (require, exports, Round0_1, Round2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const main = () => {
        const startButton = document.querySelector("#start_button");
        if (startButton == null)
            return;
        let lastRound = null;
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

        <div class="round_0"></div>
        <div class="round_2"></div>

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
                            lastRound = new Round0_1.Round0();
                            lastRound.start(roundDiv, roundControlDiv);
                            // round_0(roundDiv, roundControlDiv);
                            break;
                        case 2:
                            // round_2(roundDiv, roundControlDiv);
                            roundDiv = gameWindow === null || gameWindow === void 0 ? void 0 : gameWindow.document.querySelector(".round_2");
                            if (roundDiv == null)
                                return;
                            lastRound = new Round2_1.Round2();
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
    main();
});
