async function tes() {
    const id = window.location.pathname.split('/').pop();

    const response = await fetch(`/api/movie/${id}`);
    const data = await response.json();

    const movie = data.movie;

    const detail = document.getElementById('detail')

    detail.innerHTML = `
        <img src="${movie.image_url}" alt="${movie.title}">
        <div class = 'wrap'>
            <div class='info'>
                <h1>${movie.title}</h1>
                <div class='atas'>
                    <h3>Year: ${movie.year}, </h3>
                    <h3>Rating: ${movie.rating}, </h3>
                    <h3>Genre: ${movie.genre_text}</h3>
                </div>
                <p>${movie.overview}</p>
            </div>
        </div>
    `;

    data.recommendation.forEach(i => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${i.image_url}" alt="${i.title}">
            <h2>${i.title}</h2>
            <p>${i.year}</p>
            <p>Rating: ${i.rating}</p>
        `;

        card.onclick = () => {
            window.location.href = `/page/${i.movie_id}`;
        };

        document.getElementById('recommendations').appendChild(card);
    });
}

tes();