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


const articles = [
    {
        title: "La météo à Paris aujourd'hui",
        content: "Aujourd'hui, le temps à Paris est ensoleillé avec quelques nuages. La température est de 25°C.",
        author: "Météo France"
    },
    {
        title: "Un ciel nuageux sur Lyon",
        content: "Les nuages recouvrent Lyon aujourd'hui. La température est de 18°C avec quelques averses possibles.",
        author: "Météo Lyon"
    },
    {
        title: "Tempête en Bretagne",
        content: "Une forte tempête est attendue en Bretagne avec des rafales de vent pouvant atteindre 90 km/h.",
        author: "Météo Bretagne"
    },
    {
        title: "Chaleur sur Marseille",
        content: "Marseille connaît une chaleur écrasante avec des températures autour de 30°C.",
        author: "Météo Marseille"
    },
    {
        title: "Météo en Corse : une belle journée",
        content: "Le temps est idéal en Corse aujourd'hui avec un ciel dégagé et 22°C au thermomètre.",
        author: "Météo Corse"
    }
];

// Fonction pour créer un post
function createPost(title, content, author) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <p><em>Publié par: ${author}</em></p>
    `;
    
    return postDiv;
}

// Fonction pour générer un feed avec exactement 4 posts aléatoires
function generateRandomPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = ""; // Efface les anciens posts

    // Générer exactement 4 posts aléatoires
    for (let i = 0; i < 4; i++) {
        const randomArticle = articles[Math.floor(Math.random() * articles.length)];
        const newPost = createPost(randomArticle.title, randomArticle.content, randomArticle.author);
        feed.appendChild(newPost);
    }
}

// Attacher l'événement au bouton "Actualiser"
document.getElementById("actualiserBtn").addEventListener("click", generateRandomPosts);

// Initialiser le feed dès le chargement de la page
window.onload = generateRandomPosts;
function demanderMeteo() {
    // Le code pour demander la météo ici
    console.log("La fonction demanderMeteo a été appelée");
    // Place ici ton appel AJAX ou fetch pour récupérer la météo
}