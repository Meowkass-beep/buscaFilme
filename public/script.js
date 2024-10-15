async function buscarFilmes() {
    const query = document.getElementById('busca-input').value;
    const url = `/api/filme?query=${encodeURIComponent(query)}`;

    try {
        const resposta = await fetch(url);
        const data = await resposta.json();

        if (data.error) {
            mostrarMensagemErro('Filme não encontrado.');
            return;
        }

        mostrarFilme(data);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        mostrarMensagemErro('Erro ao buscar filmes.');
    }
}

function mostrarFilme(filme) {
    const filmesDiv = document.getElementById('filmes');
    filmesDiv.innerHTML = '';
    filmesDiv.style.display = 'block';

    const filmeContainer = document.createElement('div');
    filmeContainer.classList.add('filme-container');

    const posterFilme = document.createElement('div');
    posterFilme.innerHTML = `<img src="${filme.Poster}" alt="Imagem do Filme" class="poster">`;
    posterFilme.classList.add('capa');

    const infoFilme = document.createElement('div');
    infoFilme.classList.add('info');
    infoFilme.innerHTML = `
        <h2>${filme.Title} (${filme.Year})</h2>
        <p>Diretor: ${filme.Director}</p>
        <p>Gênero: ${filme.Genre}</p>
        <p>Classificações:</p>
        <ul>
            ${filme.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
        </ul>
        <p>Resumo: ${filme.Plot}</p>
    `;

    filmeContainer.appendChild(posterFilme);
    filmeContainer.appendChild(infoFilme);
    filmesDiv.appendChild(filmeContainer);
}

function mostrarMensagemErro(mensagem) {
    const filmesDiv = document.getElementById('filmes');
    filmesDiv.innerHTML = `<p class="erro">${mensagem}</p>`;
    filmesDiv.style.display = 'block';
}
