async function getJson(event) {
    event.preventDefault(); 

    const select = document.getElementById("categoria");
    const escolha = select.value;
    const ordenacao = document.getElementById("ordenacao").value;

    try {
        const response = await fetch('src/database/profissionais.json');
        if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        const profissionais = data.profissionais[escolha];

        const profissionaisOrdenados = ordenarProfissionais(profissionais, ordenacao);
        exibirRanking(profissionaisOrdenados);
    } catch (error) {
        console.error('Erro ao buscar o JSON:', error);
    }
}

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

function exibirRanking(profissionais) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    profissionais.forEach((profissional, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <strong>#${index + 1} - ${profissional.nome}</strong><br>
            Avaliação: ${profissional.avaliacao} ⭐<br>
            Valor por consulta: R$ ${profissional.valor_por_consulta.toFixed(2)}
        `;
        resultado.appendChild(div);
    });
}