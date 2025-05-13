window.addEventListener('DOMContentLoaded', () => {
  const formPhoto = document.getElementById('photoForm');
  const galerieMini = document.getElementById("galerie_mini");
  const photo = document.getElementById("photo");
  const bigPict = document.getElementById("big_pict");
  const photoTitle = document.getElementById("photo-title");
  const btnRetour = document.getElementById("btn-retour");

  if (formPhoto) {
    formPhoto.addEventListener('submit', function (e) {
      e.preventDefault();

      const imageFile = document.getElementById('image').files[0];
      const titre = document.getElementById('titre').value.trim();

      if (!imageFile || !titre) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const imageURL = URL.createObjectURL(imageFile);
      const imageElement = document.createElement('img');
      imageElement.src = imageURL;
      imageElement.alt = titre;
      imageElement.title = titre;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Supprimer";
      deleteButton.className = "delete-btn";

      const linkElement = document.createElement('a');
      linkElement.href = imageURL;
      linkElement.title = titre;
      linkElement.appendChild(imageElement);
      linkElement.appendChild(deleteButton);

      const liElement = document.createElement('li');
      liElement.appendChild(linkElement);

      galerieMini.appendChild(liElement);
      formPhoto.reset();
    });
  }

  if (galerieMini) {
    galerieMini.addEventListener('click', (e) => {
      const target = e.target;

      if (target.tagName === 'IMG') {
        e.preventDefault();
        const grandeImage = target.parentElement.getAttribute("href");
        const titre = target.alt || "Photo";
        bigPict.src = grandeImage;
        photoTitle.textContent = titre;
        galerieMini.classList.add("hidden");
        photo.style.display = "block";
      }

      if (target.classList.contains('delete-btn')) {
        e.preventDefault();
        const li = target.closest("li");
        if (li) {
          li.remove();
        }
      }
    });
  }

  if (btnRetour && photo && galerieMini) {
    btnRetour.addEventListener("click", () => {
      photo.style.display = "none";
      galerieMini.style.display = "grid";
    });
  }

  // === GESTION FORMULAIRE ARTICLE ===
  const postForm = document.getElementById('postForm');
  const feed = document.getElementById('feed'); // 🟢 le bon conteneur pour afficher les articles

  if (postForm && feed) {
    postForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('title').value.trim();
      const content = document.getElementById('content').value.trim();

      if (!title || !content) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const article = document.createElement('article');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');

      h3.textContent = title;
      p.textContent = content;

      article.appendChild(h3);
      article.appendChild(p);

      // Ajouter l'article EN DESSOUS (ou utilise prepend si tu veux l'avoir en haut)
      feed.appendChild(article);

      postForm.reset();
    });
  }
});
// DropDown //
function myFunction() {
  const dropdownContent = document.getElementById("myDropdown");
  dropdownContent.classList.toggle("show");
}
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const marqueeContent = document.querySelector("ul.marquee-content");

  const displayed = parseInt(getComputedStyle(root).getPropertyValue("--marquee-elements-displayed"), 10);
  const totalElements = marqueeContent.children.length;

  // Définir dynamiquement le nombre d'éléments
  root.style.setProperty("--marquee-elements", totalElements);

  // Cloner les premiers éléments pour effet infini
  for (let i = 0; i < displayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }
});
const board = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = [];

async function fetchRandomPokemon(count = 6) {
  const ids = [];
  while (ids.length < count) {
    const id = Math.floor(Math.random() * 150) + 1; // first-gen
    if (!ids.includes(id)) ids.push(id);
  }

  const promises = ids.map(id =>
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
  if (
    flippedCards.length >= 2 ||
    flippedCards.includes(card) ||
    card.classList.contains('matched')
  ) return;

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

      if (matchedCards.length === 6) {
        setTimeout(() => alert("Bravo ! Tu as gagné !"), 300);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}

async function setupGame() {
  const pokemons = await fetchRandomPokemon(6);
  const cardsData = [...pokemons, ...pokemons].sort(() => Math.random() - 0.5);

  cardsData.forEach(pokemon => {
    const card = createCard(pokemon);
    board.appendChild(card);
  });
}

setupGame();