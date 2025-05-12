// Formulaire pour l'ajout d'image dans la galerie
const formAjoutImage = document.getElementById('form-ajout'); // Formulaire d'ajout d'image
const galleryMini = document.getElementById('galerie_mini'); // La galerie miniature pour ajouter l'image
const inputImage = document.getElementById('image'); // L'input de l'image
const inputTitre = document.getElementById('titre'); // L'input du titre

// Fonction pour gérer l'ajout de l'image à la galerie
formAjoutImage.addEventListener('submit', function (e) {
  e.preventDefault(); // Empêche la soumission du formulaire et le rechargement de la page

  const imageFile = inputImage.files[0]; // Récupère le fichier image
  const titre = inputTitre.value.trim(); // Récupère le titre de l'image
  
  // Vérifie que l'image et le titre sont remplis
  if (!imageFile || !titre) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  // Créer une nouvelle image pour la galerie
  const imageURL = URL.createObjectURL(imageFile); // Créer une URL temporaire pour l'image
  const imageElement = document.createElement('img');
  imageElement.src = imageURL;
  imageElement.alt = titre;
  imageElement.title = titre;

  // Créer un nouvel élément <li> pour cette image
  const liElement = document.createElement('li');
  const linkElement = document.createElement('a');
  linkElement.href = imageURL; // Lien vers l'image en taille réelle
  linkElement.title = titre;
  
  linkElement.appendChild(imageElement); // Ajouter l'image au lien
  liElement.appendChild(linkElement); // Ajouter le lien au <li>
  
  // Ajouter l'élément <li> à la galerie
  galleryMini.appendChild(liElement);
  
  // Réinitialiser le formulaire
  formAjoutImage.reset();
});

// Fonction pour afficher la grande image à partir de la miniature
const galerieMini = document.getElementById("galerie_mini");
const photo = document.getElementById("photo");
const bigPict = document.getElementById("big_pict");
const photoTitle = document.getElementById("photo-title");
const btnRetour = document.getElementById("btn-retour");

// Sélectionner les miniatures d'images et gérer le clic sur une image
galerieMini.addEventListener('click', function(e) {
  const img = e.target;

  // Si l'élément cliqué est une image
  if (img.tagName === 'IMG') {
    e.preventDefault();
    const grandeImage = img.parentElement.getAttribute("href") || img.src;
    const titre = img.alt || "Photo";

    // Afficher la grande image
    bigPict.src = grandeImage;
    photoTitle.textContent = titre;

    // Cacher les miniatures, afficher la grande image
    galerieMini.style.display = "none";
    photo.style.display = "block";
  }
});

// Bouton retour pour revenir à la galerie miniature
btnRetour.addEventListener("click", () => {
  photo.style.display = "none";
  galerieMini.style.display = "grid";
});

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
  feed.innerHTML = ''; // on vide le feed

  const articlesAleatoires = exemplesArticles
  .sort(() => 0.5 - Math.random()) // mélange aléatoire
  .slice(0, 4); // on prend 4 articles

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

// Gestionnaire pour le bouton "Actualiser"
document.getElementById('actualiserBtn').addEventListener('click', genererArticles);

// Lancer une première génération d’articles au chargement de la page
window.onload = genererArticles;

// Fonction pour afficher/masquer le menu déroulant
function myFunction() {
document.getElementById("myDropdown").classList.toggle("show");
}

// Fermer le menu déroulant si l'utilisateur clique en dehors
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
};