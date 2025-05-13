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
