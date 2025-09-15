//import { createCard } from "./ui";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzJmMzE3Y2MxMDQ5N2Q4YjI2MTI2M2Q2NTMyY2I1ZiIsIm5iZiI6MTc1NzQ4OTUwMi4yNzIsInN1YiI6IjY4YzEyOTVlMDI1MWZlZmZjZTk0ODUyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3DhZTY3n01UvQG1NdkKHogte9L6y6M8swTNVz8BM-xM",
  },
};

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

async function fetchPopularMovies() {
  try {
    const res = await fetch(API_URL, options);
    const data = await res.json();
    const moviesList = document.getElementById("movies");
    data.results.forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = `${movie.title} (${movie.release_date})`;
      moviesList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching popular movies:", err);
  }
}

//const searchBtn = document.getElementById("searchBtn");
//const closeBtn = document.getElementById("closeBtn");
//const dialog = document.getElementById("dialog");
//const resultsList = document.getElementById("results");

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchText = event.target.search.value;
  //here we need to call an api to fetch film with that name and return

  try {
    // const res = search2(searchText).then((results)=>{});
    const res = await search(searchText);
    console.log(res);

    if (res && res.forEach) {
      res.forEach((element) => {
        console.log("Movie Title", element.original_title);
      });
    } else {
      console.log("No results");
    }
  } catch (error) {
    console.log(error);
  }
});

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

/*
searchBtn.addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return alert("Please enter a search term");

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=1`,
      {
        headers: { accept: "application/json" },
      }
    );

    const data = await res.json();
    resultsList.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      resultsList.innerHTML = "<li>No results found</li>";
    } else {
      data.results.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} (${movie.release_date || "N/A"})`;
        resultsList.appendChild(li);
      });
    }

    dialog.style.display = "block";
  } catch (err) {
    console.error("Error fetching search results:", err);
    resultsList.innerHTML = "<li>Error fetching results</li>";
    dialog.style.display = "block";
  }
});
*/
// closeBtn.addEventListener("click", () => {
//   dialog.style.display = "none";
// });

function addToFavourites(movie) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (favourites.some((fav) => fav.id === movie.id)) {
    alert("Movie is already in favourites!");
    return;
  }

  favourites.push(movie);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  alert(`${movie.title} added to favourites!`);
}

//const favBtn = document.createElement("button");
//favBtn.textContent = "Add to Favourites";
const addToFavourite = document.querySelector("#addToFavourite");
addToFavourite.addEventListener("click", () => addToFavourites(movie));
//movieContainer.appendChild(favBtn);

const journal = document.getElementById("journal");
const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

favourites.forEach((movie) => {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  movieDiv.appendChild(img);

  const details = document.createElement("div");
  details.classList.add("movie-details");
  details.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview || "No description available."}</p>
    <textarea placeholder="Add personal note">${movie.note || ""}</textarea>
  `;

  const textarea = details.querySelector("textarea");
  textarea.addEventListener("change", () => {
    movie.note = textarea.value;
    localStorage.setItem("favourites", JSON.stringify(favourites));
  });

  movieDiv.appendChild(details);
  journal.appendChild(movieDiv);
});

const cards_container = document.querySelector("cards_container");

const createCard = (movie) => {
  const card = `
    <div class="card bg-base-100 w-60 shadow-sm">
    <figure class="px-3 pt-3">
    <img
    src=${movie.poster_path}
    alt="Shoes"
    class="rounded-xl"
    />
    </figure>
    <div class="card-body items-center text-center">
    <h2 class="card-title">${movie.title}</h2>
    <p>
    ${movie.overview}
    </p>
    <div class="card-actions">
    <button id="addToFavourite" class="btn btn-primary">
    Add to favourite
    </button>
    </div>
    </div>
    `;

  cards_container.appendChild(card);
  //cards_container.innerHTML = card;
};
