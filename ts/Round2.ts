import { IRound } from "./IRound";
import { RoundBase } from "./RoundBase";

export class Round2 extends RoundBase {


    start(roundDiv: Element, roundControlDiv: Element): void {

        super.start(roundDiv, roundControlDiv);
        
        class Card {
            word: string;
            points: number;
    
            constructor(word: string, points: number) {
                this.word = word;
                this.points = points;
            }
        }
    
        class Category {
            name: string;
            cards: Card[];
    
            constructor(name: string, cards: Card[]) {
                this.name = name;
                this.cards = cards;
            }
    
        }
    
    
        const categories: Category[] = [
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
        if (team_1_score == null || team_2_score == null) return;
    
        let id_round: number = 1;
        let id_round_control: number = 1;
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
        const cardWordView_category = cardWordView?.querySelector(".category");
        const cardWordView_score = cardWordView?.querySelector(".score");
        const cardWordView_word = cardWordView?.querySelector(".word");
        if (cardWordView == null ||
            cardWordView_category == null ||
            cardWordView_score == null ||
            cardWordView_word == null) return;
    
        let current_card_id: number = 0;
        let current_card: Element;
        roundControlDiv.querySelectorAll(".card:not(.category-name)").forEach(btn => {
            btn.addEventListener("click", () => {
                const _id: number = parseInt(btn.id.replace("card_id_", ""));
                const card = roundDiv.querySelector(`#card_id_${_id}.card`);
                if (card == null) return;
                // card.classList.toggle("shown");
    
                console.log(0);
                let ___id = 0;
                console.log(categories.length);
                
                for(let i = 0; i < categories.length; ++i) {
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
                if (current_card_id != 0) {

                    // const cardWordView = roundDiv.querySelector(".card_word_view");
    
                    if (btn.classList.contains("correct")) {
                        current_card.classList.remove("correct");
                        current_card.classList.remove("skip");
                        current_card.classList.remove("incorrect");
                        
                        current_card.classList.add("correct");
                        cardWordView.classList.add("correct");
                        roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)?.classList.add("correct");
                    } else if (btn.classList.contains("skip")) {
                        current_card.classList.remove("correct");
                        current_card.classList.remove("skip");
                        current_card.classList.remove("incorrect");
                        
                        current_card.classList.add("skip");
                        cardWordView.classList.add("skip");
                        roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)?.classList.add("skip");
                    } else if (btn.classList.contains("incorrect")) {
                        current_card.classList.remove("correct");
                        current_card.classList.remove("skip");
                        current_card.classList.remove("incorrect");
                        
                        current_card.classList.add("incorrect");
                        cardWordView.classList.add("incorrect");
                        roundControlDiv.querySelector(`#card_id_${current_card_id}.card`)?.classList.add("incorrect");
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
