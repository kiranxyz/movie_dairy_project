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

export { createCard };
