function getJson() {
    fetch('src/database/profissionais.json') 
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Status: ${res.status}`);
            }
            return res.json(); 
        })
        .then((data) => {
            console.log("Dados carregados:", data); 
            const psiquiatrasOrdenados = ordenarPsiquiatras(data.psiquiatras);  
            exibirRanking(psiquiatrasOrdenados);  g
        })
        .catch((error) => {
            console.error('Erro ao buscar o JSON:', error); 
        });
}

function ordenarPsiquiatras(psiquiatras) {
    return psiquiatras.sort((a, b) => {
        if (b.experiencia !== a.experiencia) {
            return b.experiencia - a.experiencia;  
        }
        return b.avaliacao - a.avaliacao;  
    });
}

function exibirRanking(psiquiatras) {
    console.log("Ranking dos Psiquiatras:");
    psiquiatras.forEach((psiquiatra, index) => {
        console.log(`#${index + 1} - ${psiquiatra.nome} | Experiência: ${psiquiatra.experiencia} anos | Avaliação: ${psiquiatra.avaliacao}`);
    });
}
