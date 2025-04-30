const express = require('express');
const fs = require('fs/promises');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(express.json());
app.use(cors({origin: "*"}))

// Função para ordenar profissionais
function ordenarProfissionais(profissionais, ordenacao) {
    return profissionais.sort((a, b) => {
        if (ordenacao === "avaliacao") {
            return b.avaliacao - a.avaliacao;
        } else if (ordenacao === "preco") {
            return a.valor_por_consulta - b.valor_por_consulta;
        }
        return 0;
    });
}

// Rota principal para buscar profissionais
app.post('/profissionais', async (req, res) => {
    const { categoria, ordenacao } = req.body;

    if (!categoria || !ordenacao) {
        return res.status(400).json({ error: "Os parâmetros 'categoria' e 'ordenacao' são obrigatórios." });
    }

    try {
        // Carrega o JSON dos profissionais
        const data = await fs.readFile('profissionais.json', 'utf-8');
        const profissionaisData = JSON.parse(data);

        const profissionais = profissionaisData.profissionais[categoria];

        if (!profissionais) {
            return res.status(404).json({ error: `Categoria '${categoria}' não encontrada.` });
        }

        // Ordena os profissionais com base na escolha
        const profissionaisOrdenados = ordenarProfissionais(profissionais, ordenacao);

        return res.json({ profissionais: profissionaisOrdenados });
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
