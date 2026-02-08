// script.js
const apiKey = "e861f7632afffeb0abb2c2cc4d072385"; 
const apiUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
// Sélectionner les éléments
const modal = document.getElementById('modal');
const openModalBtn = document.querySelector('.account'); // Le lien "Créer un compte"
const closeModalBtn = document.getElementById('closeModal');// La croix pour fermer le modal

// Sélection des éléments
const profilButton = document.querySelector('.navbar-profil a.compte');
const modal1 = document.querySelector('.profil');
const closeModal = document.querySelector('.close');

// Ouvrir le modal
profilButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal1.style.display = 'flex'; // Affiche le modal
});

// Fermer le modal
closeModal.addEventListener('click', () => {
  modal1.style.display = 'none'; // Cache le modal
});

// Fermer le modal en cliquant à l'extérieur
window.addEventListener('click', (e) => {
  if (e.target === modal1) {
    modal1.style.display = 'none';
  }
});


// Afficher le modal quand on clique sur "Créer un compte"
openModalBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Empêche le lien de rediriger
  modal.style.display = 'block'; // Afficher le modal
});

// Fermer le modal quand on clique sur la croix
closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none'; // Cacher le modal
});

// Fermer le modal si l'utilisateur clique en dehors du contenu du modal
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Cacher le modal si on clique à l'extérieur
  }
});


// Fonction pour rechercher des films
function searchMovies(query) {
    fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error("Error fetching movies:", error));
}

// Fonction pour afficher les films populaires
function fetchPopularMovies() {
    fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error("Error fetching popular movies:", error));
}

// Fonction pour afficher les films
function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        movieDiv.innerHTML = `
            <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/200x300'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date || "N/A"}</p>
        `;
        moviesContainer.appendChild(movieDiv);
    });
}

// Écouteur pour la barre de recherche
document.getElementById("search").addEventListener("input", (event) => {
    const query = event.target.value;
    if (query) {
        searchMovies(query);
    } else {
        fetchPopularMovies();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "e861f7632afffeb0abb2c2cc4d072385"; // Remplacez avec votre clé TMDB
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR`;
  
    // Sélectionner l'élément où afficher les films
    const movieList = document.getElementById("movie-list");
  
    // Appeler l'API pour récupérer les films
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Parcourir les films et les ajouter à la liste
        data.results.slice(0, 25).forEach((movie) => {
          const listItem = document.createElement("li");
          listItem.textContent = movie.title;
          movieList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des films :", error);
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "Impossible de charger les films.";
        movieList.appendChild(errorMessage);
      });
  });
  
// Chargement initial des films populaires
fetchPopularMovies();