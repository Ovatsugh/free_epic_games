axios.get('https://api.allorigins.win/get?url=' + encodeURIComponent('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions'))
    .then(response => {
        const freeGames = JSON.parse(response.data.contents).data.Catalog.searchStore.elements.filter(game => {
            return game.price.totalPrice.discountPrice === 0;
        });

        if (freeGames) {
            freeGames.forEach(game => {
                if (game.promotions?.promotionalOffers) {
                    const gameList = document.getElementById('game-list');
                    const gameTitle = game.title;
                    const gameImage = game.keyImages[0].url

                    const gameElement = document.createElement('div');
                    gameElement.classList.add('game');

                    const titleElement = document.createElement('div');
                    titleElement.classList.add('game-title');
                    titleElement.innerText = gameTitle;
                    gameElement.appendChild(titleElement);

                    const imageElement = document.createElement('img');
                    imageElement.src = gameImage;
                    gameElement.appendChild(imageElement);

                    gameList.appendChild(gameElement);
                }
            });
        } else {
            gameList.innerHTML = '⚠️ Sem jogos grátis no momento....';
        }
    })

let temaEscuro = false;

// Verifica se há um estado salvo no armazenamento local
if (localStorage.getItem('temaEscuro') !== null) {
  temaEscuro = localStorage.getItem('temaEscuro') === 'true';
}

// Aplica o tema atual à página
if (temaEscuro) {
  document.documentElement.classList.add('dark-mode');
} else {
  document.documentElement.classList.remove('dark-mode');
}

// Adiciona um ouvinte de evento ao ícone do tema para mudar o tema
const iconeTema = document.querySelector('.fa-moon');
iconeTema.addEventListener('click', () => {
  temaEscuro = !temaEscuro;
  if (temaEscuro) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
  // Salva o estado atual do tema no armazenamento local
  localStorage.setItem('temaEscuro', temaEscuro);
});