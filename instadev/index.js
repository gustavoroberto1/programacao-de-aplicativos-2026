// BD
var posts = [
    {
        id: 1,
        user: {
            nickname: 'gustavoroberto1',
            local: 'Tijucas - SC',
            profileImg: 'https://github.com/gustavoroberto1.png'
        },
        image: 'https://picsum.photos/seed/programacao/600/600',
        legend: "Lorem ipsum dolor, sit amet consectetur adipisicing eli",
        likes: 0,
        isLike: false,
        data: "2026-09-28T19:24:00",
        comments: [
            {
                id: 1,
                username: "pedrinhdasilva",
                text: "Bahhh que legal!!",
                data: "2026-09-28T20:24:00"
            }
        ]
    }
]

// FUNÇÕES JS
const feed = document.getElementById("feed");
const botaoAbrir = document.getElementById("botaoAbrirModal");
const botaoFechar = document.getElementById("botaoFecharModal");
const modal = document.getElementById("modalPost");

botaoAbrir.addEventListener("click", () => {
    modal.classList.remove("hidden")
})

botaoFechar.addEventListener("click", () => {
    modal.classList.add("hidden");
})


function renderPosts() {
    feed.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {
        var article = document.createElement("article");

        var commentsHTML = "";
        for (var comment of posts[i].comments) {
            commentsHTML += `
                <p class="comment">
                    <strong>${comment.username}</strong>
                    ${comment.text}
                </p>
            `;
        }

        article.innerHTML = `
            <header class="post-header">
                <div class="post-user">
                    <img src="${posts[i].user.profileImg}">

                    <div>
                        <strong><a href="">${posts[i].user.nickname}</a></strong>
                        <span>${posts[i].user.local}</span>
                    </div>
                </div>

                <button class="more">•••</button>
                </header>
                <img class="post-image" src="${posts[i].image}">
                <div class="post-actions">
                    <div>
                        <button>♡</button>
                        <button>○</button>
                        <button>➤</button>
                    </div>
                    <button>▱</button>
                </div>
                <div class="post-info">
                    <strong>${posts[i].likes} curtidas</strong>

                    <p>
                        <strong>${posts[i].user.nickname}</strong>
                        ${posts[i].legend}
                    </p>

                    <a href="#">Ver todos os 7 comentários</a>

                    ${commentsHTML}

                    <span class="post-date">Há 2 horas</span>
                </div>

        `;

        feed.appendChild(article);
    }
}

renderPosts();
