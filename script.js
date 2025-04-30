function demanderMeteo() {
    const ville = document.getElementById('ville-input').value || 'Genève';
    const resultat = document.getElementById('resultat');
  
    // wttr.in propose une version PNG directement affichable sans CORS
    const imageUrl = `https://wttr.in/${ville}_0tqp_lang=fr.png`;
  
    const meteoHTML = `
      <div class="carte-meteo">
        <h2>Météo à ${ville}</h2>
        <img src="${imageUrl}" alt="Météo de ${ville}">
      </div>
    `;
  
    resultat.innerHTML = meteoHTML;
  }
  
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
        <h2>${article.titre}</h2>
        <p>${article.contenu}</p>
      `;
      feed.appendChild(post);
    });
  }
  
  // Gestionnaire pour le bouton "Actualiser"
  document.getElementById('actualiserBtn').addEventListener('click', genererArticles);
  
  // Lancer une première génération d’articles au chargement de la page
  window.onload = genererArticles;