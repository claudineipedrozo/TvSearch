const API_URL = 'https://api.tvmaze.com/search/shows?'
const $ = document.getElementById.bind(document)

document.addEventListener('DOMContentLoaded', function() {
    const favoritesArea = document.getElementById('favorites-area');
    const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];

    if (favorites.length === 0) {
        favoritesArea.innerHTML = '<p>Nenhum favorito adicionado.</p>';
        } else {
        favorites.forEach((show) => {
            printFavorite(show);

            localStorage.setItem('favorites', JSON.stringify(favorites))

        })
    }
})

const printFavorite = (show) => {
    const posterId = `poster-${show.id}`
    const titleId = `title-${show.id}`

    const favoriteCard = `
        <div class="favorite-card">
            <a href="/details.html?id=${show.id}">
                <img id="${posterId}" src="${show.imageUrl}" alt="${show.name}">
            </a>

            <a href="/details.html?id=${show.id}">
                <h3 id="${titleId}">${show.name}</h3>
            </a>

            <button onclick="removeFromFavorites(${show.id})">Remover dos Favoritos</button>
        </div>
    `;

    const favoritesArea = document.getElementById('favorites-area')
    favoritesArea.insertAdjacentHTML('beforeend', favoriteCard)
};

const removeFromFavorites = (showId) => {
    let favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []

    favorites = favorites.filter(show => show.id !== showId)

    localStorage.setItem('favorites', JSON.stringify(favorites))

    const favoriteCard = document.getElementById(`favorite-${showId}`)
    favoriteCard.parentNode.remove()

    if (favorites.length === 0) {
        const favoritesArea = document.getElementById('favorites-area')
        favoritesArea.innerHTML = '<p>Nenhum favorito adicionado.</p>'
    }
}



