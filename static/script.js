async function tes() {
    const response = await fetch('/list');
    const data = await response.json();

    data.forEach(i =>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src= '${i.image_url}' alt = '${i.title}'>
            <h2>${i.title}</h2>
            <p>${i.year}</p>
            <p>Rating: ${i.rating}</p>
        `

        card.onclick = () => {
            window.location.href = `/page/${i.movie_id}`;
        }

        document.getElementById('movie').appendChild(card);
    })
  
}

tes()

