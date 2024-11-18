const url = "https://diego-bonani.github.io/AP2-DevWeb/"

const login = () => {
    const texto = document.getElementById("entrada-senha").value;
    if (hex_md5(texto) === '10044e5fd1a8702a6fb1f172f10f0371'){
        localStorage.setItem('Logado', 'sim');
        window.location = `${url}home.html`;
    }
    else{
        alert("voce errou a senha!!!");
    }
}

const montaPagina = () => {
    const container_entrada = document.createElement('div');
    container_entrada.id = `container-entrada`;

    const container_titulo = document.createElement('div');
    container_titulo.id = `container-titulo`;
    const titulo = document.createElement('h1');
    const paragrafo = document.createElement('p');
    titulo.innerHTML = `Atletas do Botafogo em 2024-1`;
    paragrafo.innerHTML = `Criado com objetivos exclusivamente didáticos para a disciplina Desenvolvimento Web do Ibmec Rio.`;
    container_titulo.appendChild(titulo);
    container_titulo.appendChild(paragrafo);

    const fake_form = document.createElement('div');
    fake_form.id = `fake-form`;
    const input = document.createElement('input');
    const button = document.createElement('button');
    const texto = document.createElement('p');
    input.id = `entrada-senha`;
    input.type = `text`;
    input.placeholder = `Informe a senha`;
    fake_form.appendChild(input);
    button.innerHTML = `Entrar`;
    button.id = `botao-entrada`;
    fake_form.appendChild(button);
    texto.innerHTML = `Efetue login com a senha: LIBERTADORES`;
    fake_form.appendChild(texto);
    
    container_entrada.appendChild(container_titulo);
    container_entrada.appendChild(fake_form);

    return container_entrada;
}
document.body.appendChild(montaPagina());
document.getElementById('botao-entrada').onclick = login;
