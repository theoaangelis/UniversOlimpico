const fs = require('fs');
const csv = require('csv-parser');
const log = (x) => console.log(x)

//Área de definição das funções de resposta das questões

// 1 - Função que retorna qual equipe masculina ganhou a medalha olímpica de prata no ano escolhido 
// 
const questao1 = (dados,ano) => {
    const l1filtrada = dados.filter(x => x.Sport == "Basketball" && x.Sex == "M" && x.Year == ano && x.Medal == "Silver").map(x=>x.Team)
    const resultado1 = (l = l1filtrada) => {
        if (l[0] == "Spain") return "Espanha"
    else if (l[0] == "Serbia") return "Sérvia"
    else if (l[0] == "France") return "França"
    else if (l[0] == "Italy") return "Itália"
    else if (l[0] == "Yugoslavia") return "Iugoslávia"
    else if (l[0] == "Croatia") return "Croácia"
    else if (l[0] == "Soviet Union") return "União Soviética"
    }
    log (`O time a conquistar a medalha de prata no basquete masculino das Olimpíadas de ${ano} foi o de ${resultado1()}.`)
}

// 2 - Função que retorna o atleta masc ou fem que mais participou das olimpiadas pelo país escolhido 
const questao2 = (dados,pais,sexo) => {
    const contelem = (lista) => {
        const contagem = {};
        lista.forEach(elemento => {
            if (contagem[elemento]) {
                contagem[elemento]++;
            } else {
                contagem[elemento] = 1;
            }
        });
        const contagemOrdenada = Object.entries(contagem).sort((a, b) => b[1] - a[1]);
        return contagemOrdenada;
    }
    const lfiltrada2 = dados.filter(x => x.Sport == "Basketball" && x.Team == pais && x.Sex == sexo[0]).map(x=>x.Name)
    const resultado2 = contelem(lfiltrada2)
    const nome = (resultado2[0])[0]
    const quant = (resultado2[0])[1]
    const traduz = (p = pais) => {
        if (p == "Japan") return "Japão"
        else if (p == "United States") return "Estados Unidos"
        else if (p == "Brazil") return "Brasil"
        else if (p == "Italy") return "Itália"
        else if (p == "France") return "França"
    }
    log(`Atleta com mais participações representando ${traduz()} foi ${nome} com um total de ${(quant)} participações.`)
}


// Função que lê o arquivo CSV
const lerCSV = (caminhoArquivo) => {
    const dados = []
    fs.createReadStream(caminhoArquivo)
        .pipe(csv())
        .on('data', (linha) => dados.push(linha))
        .on('end', () =>  questao2(dados,"France","Masculino"))
        .on('error', (error) => {
            console.error(error);
        });
};
// Exemplo de uso das funções
lerCSV("athlete_events.csv")
