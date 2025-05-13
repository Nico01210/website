window.addEventListener('DOMContentLoaded', () => {
  const formPhoto = document.getElementById('photoForm');
  const galerieMini = document.getElementById("galerie_mini");
  const photo = document.getElementById("photo");
  const bigPict = document.getElementById("big_pict");
  const photoTitle = document.getElementById("photo-title");
  const btnRetour = document.getElementById("btn-retour");

  // Gestion du formulaire
  formPhoto.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const imageFile = document.getElementById('image').files[0]; // Récupère le fichier image
    const titre = document.getElementById('titre').value.trim(); // Récupère le titre de l'image

    // Vérifie si les champs sont remplis
    if (!imageFile || !titre) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // Créer une URL temporaire pour l'image
    const imageURL = URL.createObjectURL(imageFile);
    const imageElement = document.createElement('img');
    imageElement.src = imageURL;
    imageElement.alt = titre;
    imageElement.title = titre;

    // Créer un nouvel élément <li> pour l'image
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    linkElement.href = imageURL; // Lien vers l'image en taille réelle
    linkElement.title = titre;
    linkElement.appendChild(imageElement);
    liElement.appendChild(linkElement);

    // Ajouter l'image à la galerie
    galerieMini.appendChild(liElement);

    // Réinitialiser le formulaire
    formPhoto.reset();
  });

  // Gestion de l'affichage de la grande image
  galerieMini.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const grandeImage = e.target.parentElement.getAttribute("href");
      const titre = e.target.alt || "Photo";

      // Affichage de la grande image
      bigPict.src = grandeImage;
      photoTitle.textContent = titre;

      // Cacher les miniatures et afficher la grande image
      galerieMini.style.display = "none";
      photo.style.display = "block";
    }
  });

  // Bouton retour pour revenir aux miniatures
  btnRetour.addEventListener("click", () => {
    photo.style.display = "none";
    galerieMini.style.display = "grid";
  });
});
