import fetch from 'node-fetch';

async function filmesHandler(req, res) {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Parâmetros de busca não existem." });
    }

    const chaveApi = process.env.OMDB_API_KEY;
    const url = `http://www.omdbapi.com/?apikey=${chaveApi}&t=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "False") {
            return res.status(404).json({ error: data.Error });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
}

export default filmesHandler;
