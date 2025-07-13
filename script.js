const cardsArray = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [...cardsArray, ...cardsArray]; // pares
cards = cards.sort(() => 0.5 - Math.random()); // embaralhar

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

cards.forEach((icon, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.icon = icon;
  card.dataset.index = index;
  card.innerText = ''; // Oculto por padrão
  card.addEventListener('click', handleCardClick);
  gameBoard.appendChild(card);
});


function handleCardClick(e) {
  const clicked = e.target;
  if (lockBoard || clicked.classList.contains('revealed')) return;

  clicked.innerText = clicked.dataset.icon;
  clicked.classList.add('revealed');

  if (!firstCard) {
    firstCard = clicked;
  } else {
    secondCard = clicked;
    lockBoard = true;
    let error;
    error = new Audio("sons/daf-error.mp3");
    error.play();

    if (firstCard.dataset.icon === secondCard.dataset.icon) {
      matchedPairs++;
      resetSelection();
      error.pause();
      let acerto;
      acerto = new Audio("sons/acertou-pergunta.mp3");
      acerto.play();
      if (matchedPairs === cardsArray.length) {
        window.location.href = "tel-vitoria.html";
        let vitoria;
        vitoria = new Audio("victorytone.mp3");
        vitoria.autoplay();
      }
    } else {
      setTimeout(() => {
        firstCard.innerText = '';
        secondCard.innerText = '';
        firstCard.classList.remove('revealed');
        secondCard.classList.remove('revealed');
        resetSelection();
      }, 800);
    }
  }
}

const btn = document.querySelector('#reseta');
btn.addEventListener("click", () => {
  location.reload()
})

let cont = 0;
let podeContar = true;
let clicked = cards
const contarElement = document.getElementById('cont');

document.addEventListener('click', () =>{
  if (clicked){
    cont++;
    contarElement.textContent = cont;
    podeContar = true;
   } else{
    podeContar = false;
   }
 })




function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
