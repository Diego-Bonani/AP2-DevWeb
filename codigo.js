
const url = 'https://botafogo-atletas.mange.li/2024-1/';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const pega_json = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const montaPagina = () => {

    const header = document.createElement('header');
    const titulo = document.createElement('h1');
    titulo.innerHTML = `Atletas Botafogo 2024-1`;
    const sair = document.createElement('button');
    sair.id = `sair`;
    sair.innerHTML = `Sair`;
    header.appendChild(titulo);
    header.appendChild(sair);

    const barra_escolhas = document.createElement('div');
    barra_escolhas.id = `barra-escolhas`;
    const masculino = document.createElement('button');
    masculino.value = `masculino`;
    masculino.id = `masculino`;
    masculino.innerHTML = `Masculino`;
    const feminino = document.createElement('button');
    feminino.value = `feminino`;
    feminino.id = `feminino`;
    feminino.innerHTML = `Feminino`;
    const all = document.createElement('button');
    all.value = `all`;
    all.id = `all`;
    all.innerHTML = `Elenco Completo`;
    barra_escolhas.appendChild(masculino);
    barra_escolhas.appendChild(feminino);
    barra_escolhas.appendChild(all);

    const select = document.createElement('select');
    select.id = `select-plantel`;
    const option0 = document.createElement('option');
    option0.innerHTML = `Escolha o elenco`;
    option0.disabled = true;
    option0.selected = true;
    const option1 = document.createElement('option');
    option1.value = `masculino`;
    option1.innerHTML = `Masculino`;
    const option2 = document.createElement('option');
    option2.value = `feminino`;
    option2.innerHTML = `Feminino`;
    const option3 = document.createElement('option');
    option3.value = `all`;
    option3.innerHTML = `Elenco Completo`;
    select.appendChild(option0);
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    const container_pesquisa = document.createElement('div');
    container_pesquisa.id = `container-pesquisa`;
    const input_pesquisa = document.createElement('input');
    input_pesquisa.type = 'search';
    input_pesquisa.placeholder = 'BUSQUE POR NOME';
    input_pesquisa.id = 'input-pesquisa';
    input_pesquisa.value = '';
    container_pesquisa.appendChild(input_pesquisa);

    document.body.appendChild(header);
    document.body.appendChild(barra_escolhas);
    document.body.appendChild(select);
    document.body.appendChild(container_pesquisa);

    return;
};

montaPagina();
const container_jogadores = document.createElement('div');
container_jogadores.id = 'container-jogadores';
document.body.appendChild(container_jogadores)

montaCard = (jogador) => {
    const card = document.createElement('article');
    card.className = `card-jogador`;
    const imagem = document.createElement('img');
    imagem.src = jogador.imagem;
    const saiba_mais = document.createElement('h3');
    saiba_mais.innerHTML = `Saiba mais`;
    const nome = document.createElement('h2');
    nome.innerHTML = jogador.nome;
    card.appendChild(imagem);
    card.appendChild(saiba_mais);
    card.appendChild(nome);

    card.onclick = manipulaClick;

    card.dataset.id = jogador.id;

    return card;
}

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    window.location = url;
}

document.getElementById('masculino').onclick =function () { pega_json(`${url}masculino`).then(
    async (r) => {
        document.getElementById("container-jogadores").innerHTML = '';
        localStorage.setItem('elenco', 'masculino');
        const carregando = document.createElement('h2');
        carregando.innerHTML = `Carregando...`;
        carregando.id = `mensagem-carregando`;
        document.body.appendChild(carregando);
        await sleep(1000);
        document.getElementById("container-jogadores").innerHTML = '';
        r.forEach(
            (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
        )
        document.getElementById('mensagem-carregando').remove();
    }
);}

document.getElementById('feminino').onclick =function () { pega_json(`${url}feminino`).then(
    async (r) => {
        document.getElementById("container-jogadores").innerHTML = '';
        localStorage.setItem('elenco', 'feminino');
        const carregando = document.createElement('h2');
        carregando.innerHTML = `Carregando...`;
        carregando.id = `mensagem-carregando`;
        document.body.appendChild(carregando);
        await sleep(1000);
        r.forEach(
            (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
        )
        document.getElementById('mensagem-carregando').remove();
    }
);}

document.getElementById('all').onclick =function () { pega_json(`${url}all`).then(
    async (r) => {
        document.getElementById("container-jogadores").innerHTML = '';
        localStorage.setItem('elenco', 'all');
        const carregando = document.createElement('h2');
        carregando.innerHTML = `Carregando...`;
        carregando.id = `mensagem-carregando`;
        document.body.appendChild(carregando);
        await sleep(1000);
        r.forEach(
            (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
        )
        document.getElementById('mensagem-carregando').remove();
    }
);}


document.getElementById('select-plantel').onchange =function () {
    if(document.getElementById('select-plantel').value == 'masculino'){
        pega_json(`${url}masculino`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                localStorage.setItem('elenco', 'masculino');
                const carregando = document.createElement('h2');
                carregando.innerHTML = `Carregando...`;
                carregando.id = `mensagem-carregando`;
                document.body.appendChild(carregando);
                await sleep(1000);
                document.getElementById("container-jogadores").innerHTML = '';
                r.forEach(
                    (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
                )
                document.getElementById('mensagem-carregando').remove();
            }
        );
    }
    else if(document.getElementById('select-plantel').value == 'feminino'){
        pega_json(`${url}feminino`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                localStorage.setItem('elenco', 'feminino');
                const carregando = document.createElement('h2');
                carregando.innerHTML = `Carregando...`;
                carregando.id = `mensagem-carregando`;
                document.body.appendChild(carregando);
                await sleep(1000);
                r.forEach(
                    (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
                )
                document.getElementById('mensagem-carregando').remove();
            }
        );
    }
    else if(document.getElementById('select-plantel').value == 'all'){
        pega_json(`${url}all`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                localStorage.setItem('elenco', 'all');
                const carregando = document.createElement('h2');
                carregando.innerHTML = `Carregando...`;
                carregando.id = `mensagem-carregando`;
                document.body.appendChild(carregando);
                await sleep(1000);
                r.forEach(
                    (ele) => document.getElementById("container-jogadores").appendChild(montaCard(ele))
                )
                document.getElementById('mensagem-carregando').remove();
            }
        );
    }
}


document.getElementById('sair').onclick = function () {
    localStorage.removeItem('Logado');
    window.location = 'index.html';
}

document.getElementById('input-pesquisa').oninput = function () {
    if(localStorage.getItem('elenco') == 'masculino'){
        pega_json(`${url}masculino`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                r.forEach(
                    (ele) => {
                        if(ele.nome.toLowerCase().includes(document.getElementById('input-pesquisa').value.toLowerCase())){
                            document.getElementById("container-jogadores").appendChild(montaCard(ele))
                        }
                        else{
                            return;
                        }
                    }
                )
            }
        );
    }
    else if(localStorage.getItem('elenco') == 'feminino'){
        pega_json(`${url}feminino`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                r.forEach(
                    (ele) => {
                        if(ele.nome.toLowerCase().includes(document.getElementById('input-pesquisa').value.toLowerCase())){
                            document.getElementById("container-jogadores").appendChild(montaCard(ele))
                        }
                        else{
                            return;
                        }
                    }
                )
            }
        );
    }
    else if(localStorage.getItem('elenco') == 'all'){
        pega_json(`${url}all`).then(
            async (r) => {
                document.getElementById("container-jogadores").innerHTML = '';
                r.forEach(
                    (ele) => {
                        if(ele.nome.toLowerCase().includes(document.getElementById('input-pesquisa').value.toLowerCase())){
                            document.getElementById("container-jogadores").appendChild(montaCard(ele))
                        }
                        else{
                            return;
                        }
                    }
                )
            }
        );
    }
}
