//import { createCard } from "./ui";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzJmMzE3Y2MxMDQ5N2Q4YjI2MTI2M2Q2NTMyY2I1ZiIsIm5iZiI6MTc1NzQ4OTUwMi4yNzIsInN1YiI6IjY4YzEyOTVlMDI1MWZlZmZjZTk0ODUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3DhZTY3n01UvQG1NdkKHogte9L6y6M8swTNVz8BM-xM",
  },
};
const cardsContainer = document.querySelector("#cards-container");
const favContainer = document.querySelector("#fav-container");
const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

// # fetch movies to display on scree when page load
async function fetchMovies() {
  try {
    const res = await fetch(API_URL, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchText = event.target.search.value;
  try {
    const results = await search(searchText);
    let cardHtml = "";

    if (results && results.forEach) {
      cardsContainer.innerHTML = "";
      results.forEach((movie) => {
        cardHtml = createCardHTML(movie);
        createCard(cardHtml, true);
      });
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.log(error);
  }
});

// # Search movie by any string
const search = async (searchText) => {
  if (!searchText) return alert("Please enter a search term");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchText
      )}&include_adult=false&language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      console.log("soemthing went wrong while fetching api");
    }

    const data = await response.json();
    // console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// # Add to Favourites
function addToFavourites(movie) {
  let favourites = JSON.parse(localStorage.getItem("favMovie")) || [];

  if (favourites.some((fav) => fav.id === movie.id)) {
    alert("Movie is already in favourites!");
    return;
  }

  favourites.push(movie);
  localStorage.setItem("favMovie", JSON.stringify(favourites));
  alert(`${movie.title} added to favourites!`);
}

// # load favourite movies from localstorage
const loadFromStorage = () => {
  const favourites = JSON.parse(localStorage.getItem("favMovie")) || [];
  let favMovie = "";
  //console.log(favourites);
  favourites.forEach((movie) => {
    favMovie = createFavCardHTML(movie);
    createFavCard(favMovie);
    //localStorage.setItem("favourites", JSON.stringify(favourites));
  });
};

// # create html for favourite movies
const createFavCardHTML = (movie) => {
  return `<div class="flex bg-base-100 w-70 md:w-auto rounded-2xl shadow-sm pb-2">
            <figure class="px-3 pt-3">
              <img
              class="w-20 h-15 rounded-xl"
              src=${imageBaseUrl}${movie.poster_path}
              alt=${movie.title}
              class="rounded-xl"
              />
            </figure>
            <div class="felx flex-col justify-between">
              <h2 class="font-bold mt-1">${movie.title}</h2>
              <div class="">
                <button
                id="removeMovie"
                class="border border-purple-200 px-2 rounded-lg text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 mt-3"
                >
                Remove from list
              </button>
            </div>
          </div>
        </div>`;
};

const createFavCard = (favMovieCard) => {
  favContainer.innerHTML += favMovieCard;
};

// # Load movie list on window load event
window.addEventListener("load", async () => {
  console.log("Page has been loaded");
  let cardHtml = "";

  // # calling default Api to load movies
  const movies = await fetchMovies();
  movies.forEach((movie) => {
    //console.log(movie);
    cardHtml = createCardHTML(movie);
    createCard(cardHtml, false);
    //createFavCardHTML(cardHtml, false);
  });

  // # load fav movies from localstorage if there are any
  loadFromStorage();
});

// # creat card html with movie info
const createCardHTML = (movie) => {
  const posterUrl = "https://image.tmdb.org/t/p/w200";
  //console.log(`${a}${movie.poster_path}`);
  return `<div class="card bg-base-100 w-60 shadow-sm">
    <figure class="px-3 pt-3">
    <img
    src=${posterUrl}${movie.poster_path}
    alt=${movie.title}
    class="rounded-xl"
    />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${movie.title}</h2>
    <p>
    ${movie.overview}
    </p>
    <div class="card-actions">
    <button class="btn btn-primary addToFavourite" data-movie-id="${movie.id}">
    Add to favourite
    </button>
    </div>
    </div>
    `;
};

// # Add default or searched movie card to the interface
const createCard = (cards, isSearch) => {
  if (!isSearch) {
    cardsContainer.innerHTML += cards;
  } else {
    cardsContainer.innerHTML += cards;
  }
};

// # add event listeners to all addToFavourite buttons
const btns = document.querySelectorAll(".addToFavourite");
console.log(btns);

document.querySelectorAll(".addToFavourite").forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button);
    //addToFavourites(movie);
  });
});

// # set footer with current year
document.querySelector(
  "#copyright"
).textContent = `Copyright © ${new Date().getFullYear()} - All right reserved`;
