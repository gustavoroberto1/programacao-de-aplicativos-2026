const produtos = [
    { id: 1, nome: "Headset Gamer", preco: 150, estoque: 0, emoji: "🎧" },
    { id: 2, nome: "Teclado Mecânico", preco: 250, estoque: 3, emoji: "⌨️" },
    { id: 3, nome: "Mouse Gamer", preco: 100, estoque: 10, emoji: "🖱️" },
    { id: 4, nome: "Controle Gamer", preco: 200, estoque: 6, emoji: "🎮" },
    { id: 5, nome: "Monitor Gamer", preco: 1200, estoque: 2, emoji: "🖥️" },
    { id: 6, nome: "Notebook", preco: 3500, estoque: 4, emoji: "💻" }
];

let carrinho = [];


function exibirProdutos() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "";

    for (let produto of produtos) {
        lista.innerHTML += `
           <div class="card-produto">
                <div class="produto-imagem">${produto.emoji}</div>
                <h3>${produto.nome}</h3>
                <p class="preco">${formatarPreco(produto.preco)}</p>
                <p class="estoque">Estoque: ${produto.estoque} unidades</p>
                <button class="btn-adicionar" onclick="adicionarItem(${produto.id})" ${produto.estoque === 0 ? "disabled" : ""}>
                    ${produto.estoque === 0 ? "Esgotado" : "Adicionar"}
                </button>
            </div>
        `;
    }
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function adicionarItem(id) {
    const produto = produtos.filter(produto => produto.id === id)[0];
    if (produto === null) return;

    // VALIDAÇÕES
    const item = carrinho.filter(item => item.id === id)[0];
    if (item === undefined) {
        carrinho.push({ id: produto.id, quantidade: 1 })
    } else {
        if (item.quantidade >= produto.estoque) {
            alert("Estoque insuficiente!")
            return;
        }
        item.quantidade++;
    }
    atualizarCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

function alterarQuantidade(id, quantidade) {
    const item = carrinho.filter(item => item.id === id)[0];
    const produto = produtos.filter(produto => produto.id === id)[0];

    const novaQuantidade = item.quantidade + quantidade;
    if (novaQuantidade <= 0) {
        removerItem(id);
        return;
    }

    if (novaQuantidade > produto.estoque) {
        alert("Estoque insuficiente!");

        return;
    }

    item.quantidade = novaQuantidade;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = `
            <div class="carrinho-vazio">
                <p>🛒</p>
                <p>Seu carrinho está vazio!</p>
            </div>
        `;
    }

    let total = 0;
    let quantidade = 0;

    for (item of carrinho) {
        const produto = produtos.filter(produto => produto.id === item.id)[0];

        const subtotal = item.quantidade * produto.preco;
        total += subtotal;
        quantidade += item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">
                <div class="item-info">
                    <h4>${produto.emoji} ${produto.nome}</h4>
                    <p>${formatarPreco(subtotal)}</p>

                    <div class="controles">
                        <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span>${item.quantidade}</span>
                        <button class="btn-quantidade" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>

                <button class="btn-remover" onclick="removerItem(${item.id})">🗑️</button>
            </div>
        `;
    }

    document.getElementById("contador-carrinho").textContent = quantidade;
    document.getElementById("total-carrinho").textContent = formatarPreco(total);
}

function finalizar() {
    if (carrinho.length === 0) {
        alert("O CAMARADA COMO TU FINALIZAR SE NÃO NADA NO CARRINHO!");
        return;
    }

    var confirmacao = confirm("DESEJA FINALIZAR A COMPRA?");
    if (confirmacao === false) {
        return;
    }

    for(var item of carrinho){
        const produto = produtos.filter(produto => produto.id === item.id)[0];
        produto.estoque -= item.quantidade;
    }

    carrinho = [];

    atualizarCarrinho();
    exibirProdutos();

    alert("SUA COMPRA FOI CONCLUIDA COM SUCESSO!!!! uhulll")
}


exibirProdutos();
atualizarCarrinho();

