const params = new URLSearchParams(window.location.search)
const id = params.get("id");

const url = 'https://botafogo-atletas.mange.li/2024-1/';

const pega_json = async(caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) {
            throw new Error(`Erro ao buscar dados na API: ${resposta.status} - ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        console.log("Dados do servidor: ", dados);

        return dados;
    } catch (error) {
        console.error("Erro  ao obter dados:",error);
        return null;
    }
}

const montaPagina = (dados) => {
    const body = document.body;
    body.innerHTML = "";

    const detalhes = document.createElement('article');
    detalhes.id = 'container-detalhes';

    const container_jogador = document.createElement('div');
    container_jogador.id = 'container-jogador';
    const imagem = document.createElement('img');
    imagem.src = dados.imagem;
    const nome = document.createElement('h1');
    nome.innerHTML = `${dados.nome}<br>${dados.posicao}`;
    container_jogador.appendChild(imagem);
    container_jogador.appendChild(nome);
    detalhes.appendChild(container_jogador);

    const container_descricao = document.createElement('div');
    container_descricao.id = 'container-descricao';
    const descricao = document.createElement('p');
    descricao.innerHTML = dados.detalhes;
    const informacoes = document.createElement('p');
    informacoes.innerHTML = `<strong>Jogos pelo botafogo:</strong> ${dados.n_jogos}<br><strong>Nascimento:</strong> ${dados.nascimento}<br><strong>Altura:</strong> ${dados.altura}<br><strong>Naturlidade:</strong> ${dados.naturalidade}`;
    container_descricao.appendChild(descricao);
    container_descricao.appendChild(informacoes);
    detalhes.appendChild(container_descricao);

    const voltar = document.createElement('a');
    voltar.id = 'botao-voltar-detalhes';
    voltar.href = 'home.html';
    voltar.innerHTML = `Voltar`;

    body.appendChild(detalhes);
    body.appendChild(voltar);
}

if (localStorage.getItem('Logado')){
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => {
            if(r === null){
                document.body.innerHTML = `<h1>Erro ao buscar dados na API</h1>`
                return;
            }
            else{
                montaPagina(r);
            }
        }
    );
}
else{
    document.body.innerHTML = `<h1>Você precisa estar logado</h1>`
}
