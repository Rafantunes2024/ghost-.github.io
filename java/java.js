// Função para carregar os comentários do localStorage
function carregarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
    const listaComentarios = document.getElementById('comentarios-lista');
    listaComentarios.innerHTML = '<h2>Comentários:</h2>';

    comentarios.forEach(function(comentario) {
        const divComentario = document.createElement('div');
        divComentario.classList.add('comentario');

        const avatar = `https://www.gravatar.com/avatar/${md5(comentario.nome.toLowerCase().trim())}?d=identicon`; // Usando Gravatar para gerar um avatar
        const dataComentario = new Date().toLocaleString(); // Pegando data atual

        divComentario.innerHTML = `
            <img src="${avatar}" alt="Avatar">
            <div class="conteudo">
                <p class="nome">${comentario.nome}</p>
                <p class="texto">${comentario.texto}</p>
                <p class="data">${dataComentario}</p>
            </div>
        `;
        
        listaComentarios.appendChild(divComentario);
    });
}

// Função para criar hash MD5 (necessário para gerar o avatar do Gravatar)
function md5(string) {
    return string.split('').reduce(function(a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0).toString(16);
}

// Evento para enviar o comentário
document.getElementById('comentario-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const comentarioTexto = document.querySelector('textarea').value.trim();
    
    if (nome !== "" && comentarioTexto !== "") {
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push({ nome: nome, texto: comentarioTexto });
        localStorage.setItem('comentarios', JSON.stringify(comentarios));

        document.getElementById('nome').value = "";
        document.querySelector('textarea').value = "";

        carregarComentarios();
    }
});

// Carregar os comentários ao carregar a página
window.onload = function() {
    carregarComentarios();
};

// Carrossel de Imagens
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll('.logo-img');
    let currentSlide = 0;

    if (slides.length === 0) {
        console.error("Nenhuma imagem encontrada para o carrossel!");
        return;
    }

    // Inicializa a primeira imagem como visível
    slides[currentSlide].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 3000);
});

// Função para reiniciar/limpar os comentários carregados
function reiniciarComentarios() {
    // Limpa os comentários do localStorage
    localStorage.removeItem('comentarios');

    // Limpa a área de comentários da página
    const listaDeComentarios = document.getElementById("comentarios-lista");
    listaDeComentarios.innerHTML = '';
}

// Função para carregar os comentários
function carregarComentarios() {
    const listaDeComentarios = document.getElementById("comentarios-lista");

    // Verifica se já existe algum comentário salvo no localStorage
    let comentarios = JSON.parse(localStorage.getItem('comentarios'));

    // Se não houver comentários no localStorage, inicializa um array vazio
    if (!comentarios) {
        comentarios = [];
    }

    // Exibe os comentários
    comentarios.forEach(comentario => {
        const comentarioElement = document.createElement("div");
        comentarioElement.classList.add("comentario");

        comentarioElement.innerHTML = `
            <p><strong>${comentario.nome}:</strong> ${comentario.texto}</p>
        `;

        listaDeComentarios.appendChild(comentarioElement);
    });
}

// Função para adicionar um novo comentário
function adicionarComentario(nome, comentario) {
    // Verifica se há comentários armazenados no localStorage
    let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

    // Adiciona o novo comentário ao array
    comentarios.push({ nome: nome, texto: comentario });

    // Salva os comentários no localStorage
    localStorage.setItem('comentarios', JSON.stringify(comentarios));

    // Carrega os comentários novamente
    carregarComentarios();
}

// Lidar com o envio do formulário de comentários
document.getElementById("comentario-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtém o nome e o comentário digitado
    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;

    // Chama a função para adicionar o comentário
    adicionarComentario(nome, comentario);

    // Limpa o formulário
    document.getElementById("comentario-form").reset();
});

// Carregar os comentários ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarComentarios);
