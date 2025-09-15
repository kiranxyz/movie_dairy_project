const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
const ACCESS_TOKEN = "You_token";

async function fetchPopularMovies() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: "Bearer ${ACCESS_TOKEN}",
        accept: "application/json",
      },
    });
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

const searchBtn = document.getElementById("searchBtn");
const closeBtn = document.getElementById("closeBtn");
const dialog = document.getElementById("dialog");
const resultsList = document.getElementById("results");

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

closeBtn.addEventListener("click", () => {
  dialog.style.display = "none";
});

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

const favBtn = document.createElement("button");
favBtn.textContent = "Add to Favourites";
favBtn.addEventListener("click", () => addToFavourites(movie));
movieContainer.appendChild(favBtn);

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
