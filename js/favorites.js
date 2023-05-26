const API_URL = 'https://api.tvmaze.com/search/shows?'
const $ = document.getElementById.bind(document)

const query = $('query')

const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []


    fetch(API_URL + new URLSearchParams({ q: query })).then((response) =>
       // Converte a resposta do serviço para JSON
       response.json().then((favorites) => {
        
        $('favorites-area').innerHTML = ''
        
    if (favorites.length === 0) {
        $('not-found-message').style.display = 'block'
          return
        } 

        favorites.forEach((show) => {
            printFavorite(show)
        })
        
        
        favorites.forEach((f) => {
            const { show } = f
            const { id, name, image } = show

            const imageUrl = image ? image.medium : '/img/noimage.png'

            const newShow = {
                id,
                name,
                imageUrl,
            }

            printFavorite(newShow);

            localStorage.setItem('favorites', JSON.stringify(favorites))

        })
    
    })
)


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
    `

    const favoritesArea = document.getElementById('favorites-area')
    favoritesArea.insertAdjacentHTML('beforeend', favoriteCard)
}

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
