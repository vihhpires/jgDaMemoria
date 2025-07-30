const cardsArray = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cards = [...cardsArray, ...cardsArray]; // pares
cards = cards.sort(() => 0.5 - Math.random()); // embaralhar

let cont = 0;
const contElemento = document.getElementById('cont')

const começar = document.getElementById('comeco')
let tempo = 0; //tempo em seg.
let funcao = false; //se o time está funcionando
let intervaloID = 0; //iden. do intervalo para limpar

const gameBoard = document.getElementById('game-board');
let firstCard = null;   
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

if (gameBoard) {
  cards.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.innerText = ''; // Oculto por padrão
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

function exibeTempo() {
  let min = parseInt(tempo / 60); //os minutos
  let seg = tempo % 60;  //os segundos
  let smin = min.toString().padStart(2, '0');
  let sseg = seg.toString().padStart(2, '0');

  let tempoTela = smin + ':' + sseg; // variavel para deixar no estilo cronometro
  document.querySelector(".cronometro").value = tempoTela;
  tempo++;

  if (matchedPairs === cardsArray.length) {
    funcao = true;
    clearInterval(intervaloID);


  }

}


const jogar = document.querySelector('.joga');
if (jogar) {
  jogar.addEventListener('click', () => {
    location.href = 'tel-jogo.html';
  })
}



function temporizar(t) {
  if (funcao == false) {
    função = true;
    tempo = t;
    intervaloID = setInterval(exibeTempo, 1000)// 1000 equivale a 1 seg.
  }
}

começar.addEventListener('click', () => {
  temporizar(0);
  console.log("Botão 'Começar' clicado!");

  começar.disabled = true;

  // vai chamar todo o elemento card 
  const todosCard = document.querySelectorAll('.card');

  //uma função aonde vai mostrar os icon dos cards
  todosCard.forEach(card => {
    card.innerText = card.dataset.icon; //pega o oculto e revela os icones do card
    card.classList.add('reveled-temp');
  });

  // esconde de novo os icon
  setTimeout(() => {
    todosCard.forEach(card => {
      card.innerText = '';
      card.classList.remove('reveled-temp');
    });


    // esconde os icones depois de 3 seg
  }, 2000);

})



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

    cont++;
    contElemento.textContent = cont;

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

        const tempoFinal = tempo;
        const tempoFormatado = document.querySelector(".cronometro").value;

        // salva tempo e tentativas finais da partida
        localStorage.setItem('movimentosFinais', cont);
        localStorage.setItem('tempoFinal', tempoFormatado);

        // salva recorde de tempo, se for menor
        const tempoRecordeSalvo = localStorage.getItem('recordeTempo');
        if (!tempoRecordeSalvo || tempoFinal < parseInt(tempoRecordeSalvo)) {
          localStorage.setItem('recordeTempo', tempoFinal);
          localStorage.setItem('recordeTempoFormatado', tempoFormatado);
        }

        // salva recorde de movimentos, se for menor
        const movimentosRecordeSalvo = localStorage.getItem('recordeMovimentos');
        if (!movimentosRecordeSalvo || cont < parseInt(movimentosRecordeSalvo)) {
          localStorage.setItem('recordeMovimentos', cont);
        }

        let vitoria = new Audio("victorytone.mp3");
        vitoria.play();
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


function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

