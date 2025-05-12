document.addEventListener('DOMContentLoaded', () => {

  // Données de mock pour les articles météo
  const exemplesArticles = [
    { titre: "Chaleur record à Marseille", contenu: "Aujourd'hui, la ville a battu son record de température." },
    { titre: "Pluie persistante à Nantes", contenu: "Les habitants attendent toujours une éclaircie." },
    { titre: "Neige à Grenoble", contenu: "La station de ski a ouvert ses pistes plus tôt cette année." },
    { titre: "Vent violent à Lille", contenu: "Des rafales atteignent 90 km/h ce matin." },
    { titre: "Temps calme à Toulouse", contenu: "Le soleil est au rendez-vous pour toute la semaine." },
    { titre: "Orages à Lyon", contenu: "De gros orages sont attendus dans l'après-midi." }
  ];

  // Fonction pour afficher 4 articles aléatoires
  function genererArticles() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // On vide le feed

    const articlesAleatoires = exemplesArticles
      .sort(() => 0.5 - Math.random()) // Mélange aléatoire
      .slice(0, 4); // On prend 4 articles

    articlesAleatoires.forEach(article => {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <h2 style="text-align:center;">${article.titre}</h2>
        <p>${article.contenu}</p>
      `;
      feed.appendChild(post);
    });
  }

  // Fonction pour gérer l'ajout d'un article dans le feed
  const formArticle = document.getElementById('postForm');
  formArticle.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && content) {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
      document.getElementById('feed').prepend(post); // Ajoute l'article en haut du feed
      formArticle.reset(); // Vide les champs
    } else {
      alert("Veuillez remplir tous les champs de l'article !");
    }
  });

  // Fonction pour gérer l'ajout d'une image dans la galerie
  const formPhoto = document.getElementById('photoForm');
  formPhoto.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const imageFile = document.getElementById('image').files[0]; // Récupère le fichier image
    const titre = document.getElementById('titre').value.trim(); // Récupère le titre de l'image

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

    // Créer un nouvel élément <li> pour cette image
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    linkElement.href = imageURL; // Lien vers l'image en taille réelle
    linkElement.title = titre;
    linkElement.appendChild(imageElement);

    // Ajouter l'image à la galerie
    liElement.appendChild(linkElement);
    document.getElementById('galerie_mini').appendChild(liElement);

    // Réinitialiser le formulaire
    formPhoto.reset();
  });

  // Affichage de l'image en grand
  const galerieMini = document.getElementById("galerie_mini");
  const photo = document.getElementById("photo");
  const bigPict = document.getElementById("big_pict");
  const photoTitle = document.getElementById("photo-title");
  const btnRetour = document.getElementById("btn-retour");

  // Fonction pour afficher la grande image au clic
  galerieMini.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const grandeImage = e.target.parentElement.getAttribute("href");
      const titre = e.target.alt || "Photo";

      // Afficher la grande image
      bigPict.src = grandeImage;
      photoTitle.textContent = titre;

      // Cacher miniatures, afficher grande image
      galerieMini.style.display = "none";
      photo.style.display = "block";
    }
  });

  // Bouton retour pour revenir aux miniatures
  btnRetour.addEventListener("click", () => {
    photo.style.display = "none";
    galerieMini.style.display = "grid";
  });

  // Générer les articles aléatoires au chargement de la page
  genererArticles();
});
