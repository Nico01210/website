const API_KEY = '52a6d0f520627aae9ba0ad684bd3b555';

function afficherMeteo(ville) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric&lang=fr`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Réponse API :", data);

      if (data.cod === 200) {
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        document.getElementById("resultat").innerHTML = `
          <div class="carte-meteo">
            <h2>${ville}</h2>
            <img src="${icon}" alt="${desc}" />
            <p><strong>${temp}°C</strong></p>
            <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
          </div>
        `;
      } else {
        document.getElementById("resultat").textContent =
          "Ville inconnue ou erreur : " + data.message;
      }
    })
    .catch(error => {
      console.error("Erreur réseau :", error);
      document.getElementById("resultat").textContent = "Erreur de connexion à l'API.";
    });
}

// Fonction appelée par le bouton
function demanderMeteo() {
  const ville = document.getElementById("ville-input").value.trim();
  if (ville !== "") {
    afficherMeteo(ville);
  } else {
    alert("Veuillez entrer un nom de ville.");
  }
}

// Affiche Genève par défaut au chargement
window.onload = () => afficherMeteo("Genève");