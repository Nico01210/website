const API_KEY = 'aqBQTina7u7FJhmA9HBnufH1u5XJtHXY'; // Ta clé AccuWeather
const ville = 'Genève';

function afficherMeteo() {
  const urlLocation = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${ville}`;

  fetch(urlLocation)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const locationKey = data[0].Key;
        const villeNom = data[0].LocalizedName;

        // Étape 2 : récupérer les conditions météo
        const urlMeteo = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&language=fr-fr&details=true`;

        fetch(urlMeteo)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              const temp = data[0].Temperature.Metric.Value;
              const desc = data[0].WeatherText;
              const iconNumber = data[0].WeatherIcon.toString().padStart(2, '0'); // format 01, 02...
              const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;

              document.getElementById("resultat").innerHTML = `
                <div class="carte-meteo">
                  <h2>${villeNom}</h2>
                  <img src="${iconUrl}" alt="${desc}" />
                  <p><strong>${temp}°C</strong></p>
                  <p>${desc}</p>
                </div>
              `;
            } else {
              document.getElementById("resultat").textContent = "Données météo non disponibles.";
            }
          });
      } else {
        document.getElementById("resultat").textContent = "Ville non trouvée.";
      }
    })
    .catch(error => {
      console.error("Erreur :", error);
      document.getElementById("resultat").textContent = "Erreur lors de la récupération des données météo.";
    });
}

window.onload = afficherMeteo;