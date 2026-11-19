const jogos = [
    { nome: 'Minecraft', categoria: 'Aventura', descricao: 'Construa e explore mundos.', emoji: '⛏️', cor: '#276448' },
    { nome: 'Mario Kart', categoria: 'Corrida', descricao: 'Corridas com muita diversão.', emoji: '🏎️', cor: '#bf513c' },
    { nome: 'Stardew Valley', categoria: 'Aventura', descricao: 'Cuide da sua própria fazenda.', emoji: '🌻', cor: '#b7833c' },
    { nome: 'Among Us', categoria: 'Estratégia', descricao: 'Descubra quem é o impostor.', emoji: '👨‍🚀', cor: '#803d78' },
    { nome: 'Hollow Knight', categoria: 'Aventura', descricao: 'Explore um reino misterioso.', emoji: '🗡️', cor: '#354e86' },
    { nome: 'Rocket League', categoria: 'Corrida', descricao: 'Carros, futebol e velocidade.', emoji: '⚽', cor: '#266ca4' },
    { nome: 'Terraria', categoria: 'Aventura', descricao: 'Aventure-se e enfrente monstros.', emoji: '🌳', cor: '#3b8567' },
    { nome: 'Tetris', categoria: 'Estratégia', descricao: 'Encaixe as peças e faça pontos.', emoji: '🧩', cor: '#6651ad' }
];

const gradeJogos = document.querySelector("#grade-jogos");
const botoes = document.querySelectorAll('[data-categoria]');
const busca = document.querySelector("#busca");
const modal = document.getElementById("modalPost");
const botaoAbrir = document.getElementById("botaoAbrirModal");
const botaoFechar = document.querySelector("#botaoFecharModal");
const botaoPublicar = document.getElementById("botaoAdicionar");

let categoriaSelecionada = "Todos";


function mostrarJogos() {
    gradeJogos.innerHTML = "";

    jogos.forEach(jogo => {
        const nomeCombina = jogo.nome.toLowerCase().includes(busca.value.toLowerCase())
        const categoriaCombina = categoriaSelecionada === "Todos" || categoriaSelecionada === jogo.categoria;
        if (!categoriaCombina || !nomeCombina) {
            return;
        }

        gradeJogos.innerHTML += `
            <article class="card">
                <div class="capa" style="background: ${jogo.cor}">${jogo.emoji}</div>
                <div class="conteudo-card">
                    <h3>${jogo.nome}</h3>
                    <p>${jogo.descricao}</p>
                    <span>${jogo.categoria}</span>
                </div>
            </article>
        `;
    })
}

busca.addEventListener("input", mostrarJogos)

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        categoriaSelecionada = botao.dataset.categoria;
        botoes.forEach(item => item.classList.remove('ativo'))
        botao.classList.add("ativo");
        mostrarJogos();
    })
})

botaoAbrir.addEventListener("click", () => {
    modal.classList.remove("hidden")
})

botaoFechar.addEventListener("click", () => {
    modal.classList.add("hidden");
})

botaoPublicar.addEventListener("click", () => {
    // PEGAR INFORMAÇÕES QUE USUÁRIO DIGITOU
    var nome = document.getElementById("nome").value;
    var categoria = document.getElementById("categoria").value;
    var descricao = document.getElementById("descricao").value;
    var emoji = document.getElementById("emoji").value;
    var cor = document.getElementById("cor").value;

    // CRIAR A ESTRUTURA DE POST
    var novoJogo = {
        nome,
        categoria,
        descricao,
        emoji,
        cor,
    }


    // ADICIONANDO A LISTAGEM DE POSTS
    jogos.push(novoJogo); // ENVIO PARA SERVIDOR

    //RE-RENDERIZAR A TELA
    mostrarJogos();

    // FECHAR MODAL
    modal.classList.add("hidden");

    //LIMPAR CAMPOS MODAL
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("emoji").value = "";
    document.getElementById("cor").value = "";
})


mostrarJogos();
