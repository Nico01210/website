

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

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
  const form = document.getElementById('postForm');
  const feed = document.getElementById('feed');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && content) {
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `<h2>${title}</h2><p>${content}</p>`;

      feed.prepend(post); // ajoute en haut du feed

      form.reset(); // vide les champs
    }
  });