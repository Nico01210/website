window.addEventListener('DOMContentLoaded', () => {
  // === VARIABLES GLOBALES ===
  const board = document.getElementById('game-board');
  const difficultySelect = document.getElementById('difficulty');
  let flippedCards = [];
  let matchedCards = [];
  let attemptsLeft = 0;
  let totalPairs = 0;
  let gameId = '';

  const maxAttemptsByLevel = {
    5: 10,   // Facile
    15: 25,  // Moyen
    25: 30   // Difficile
  };

  function generateGameId() {
    return 'GAME-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  function updateGameInfo(levelValue) {
    const levelMap = {
      5: 'Facile',
      15: 'Moyen',
      25: 'Difficile'
    };

    document.getElementById('level-name').textContent = levelMap[levelValue];
    document.getElementById('game-id').textContent = gameId;
    document.getElementById('pair-count').textContent = totalPairs;
    document.getElementById('attempts-left').textContent = attemptsLeft;
  }

  function resetGame() {
    flippedCards = [];
    matchedCards = [];
    board.innerHTML = '';
    gameId = generateGameId();
    setupGame();
  }

  async function fetchRandomPokemon(pairCount) {
    const ids = new Set();
    while (ids.size < pairCount) {
      const id = Math.floor(Math.random() * 150) + 1;
      ids.add(id);
    }

    const promises = [...ids].map(id =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );

    const pokemons = await Promise.all(promises);
    return pokemons.map(p => ({
      id: p.id,
      name: p.name,
      image: p.sprites.front_default
    }));
  }

  function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = pokemon.id;

    const img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name;

    card.appendChild(img);
    card.addEventListener('click', () => handleCardClick(card));
    return card;
  }

  function handleCardClick(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
      return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstId = first.dataset.id;
      const secondId = second.dataset.id;

      if (firstId === secondId) {
        first.classList.add('matched');
        second.classList.add('matched');
        matchedCards.push(firstId);
        flippedCards = [];

        if (matchedCards.length === totalPairs) {
          setTimeout(() => {
            alert("Bravo ! Tu as gagné !");
            resetGame();
          }, 500);
        }
      } else {
        attemptsLeft--;
        document.getElementById('attempts-left').textContent = attemptsLeft;

        setTimeout(() => {
          first.classList.remove('flipped');
          second.classList.remove('flipped');
          flippedCards = [];
        }, 1000);

        if (attemptsLeft <= 0) {
          setTimeout(() => {
            alert("Désolé, vous avez perdu...");
            resetGame();
          }, 1000);
        }
      }
    }
  }

  async function setupGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCards = [];

    const pairCount = parseInt(difficultySelect.value);
    totalPairs = pairCount;
    attemptsLeft = maxAttemptsByLevel[pairCount];
    gameId = generateGameId();

    const pokemons = await fetchRandomPokemon(pairCount);
    const cardsData = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5);

    cardsData.forEach(pokemon => {
      const card = createCard(pokemon);
      board.appendChild(card);
    });

    adjustGridLayout(pairCount);
    updateGameInfo(pairCount);
  }

  function adjustGridLayout(pairCount) {
    const totalCards = pairCount * 2;

    if (totalCards <= 10) {
      board.style.gridTemplateColumns = 'repeat(4, 100px)';
    } else if (totalCards <= 30) {
      board.style.gridTemplateColumns = 'repeat(6, 100px)';
    } else {
      board.style.gridTemplateColumns = 'repeat(8, 100px)';
    }
  }

  if (difficultySelect) {
    difficultySelect.addEventListener('change', setupGame);
    setupGame();
  }

  // === DropDown simple ===
  const dropdownBtn = document.getElementById("dropdownBtn");
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
      const dropdownContent = document.getElementById("myDropdown");
      dropdownContent?.classList.toggle("show");
    });
  }
    // === Gestion des posts/feed ===
    const postForm = document.getElementById('postForm');
    const feed = document.getElementById('feed');
  
    if (postForm && feed) {
      postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const article = document.createElement('article');
        article.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        feed.prepend(article);
        postForm.reset();
      });
    }

      // === Galerie dynamique ===
  const photoForm = document.getElementById('photoForm');
  const galerieMini = document.getElementById('galerie_mini');

  if (photoForm && galerieMini) {
    photoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const fileInput = document.getElementById('image');
      const titleInput = document.getElementById('titre');
      const file = fileInput.files[0];
      const title = titleInput.value;

      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const li = document.createElement('li');
          li.innerHTML = `
            <a href="#" class="miniature" data-img="${event.target.result}" data-title="${title}">
              <img src="${event.target.result}" alt="${title}">
            </a>
            <button class="delete-btn">Supprimer</button>
          `;
          galerieMini.appendChild(li);
          photoForm.reset();
        };
        reader.readAsDataURL(file);
      }
    });

    galerieMini.addEventListener('click', function(e) {
      // Supprimer une image
      if (e.target.classList.contains('delete-btn')) {
        e.preventDefault();
        const li = e.target.closest('li');
        if (li) li.remove();
        return;
      }
      // Afficher la grande photo
      const miniature = e.target.closest('.miniature');
      if (miniature) {
        e.preventDefault();
        const bigPict = document.getElementById('big_pict');
        const photoTitle = document.getElementById('photo-title');
        const photoBlock = document.getElementById('photo');
        if (bigPict && photoTitle && photoBlock) {
          bigPict.src = miniature.dataset.img;
          bigPict.alt = miniature.dataset.title;
          photoTitle.textContent = miniature.dataset.title;
          photoBlock.style.display = 'block';
        }
      }
    });
  }
});