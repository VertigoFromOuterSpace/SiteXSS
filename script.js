document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o XSS Refletido (Busca)
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResult = document.getElementById('search-result');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        const query = searchInput.value;
        
        // VULNERABILIDADE: A entrada do usuário é inserida diretamente no HTML.
        // Isso permite que tags <script> ou outros vetores sejam executados.
        searchResult.innerHTML = `Exibindo resultados para: ${query}`;
        
        // Limpa o campo após o uso para facilitar novos testes
        searchInput.value = '';
    });


    // Lógica para o XSS Armazenado (Comentários)
    const commentForm = document.getElementById('comment-form');
    const usernameInput = document.getElementById('username-input');
    const commentInput = document.getElementById('comment-input');
    const commentsSection = document.getElementById('comments-section');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const commentText = commentInput.value;

        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        
        // VULNERABILIDADE: O nome e o comentário são inseridos diretamente no HTML
        // de um novo elemento, que é então adicionado à página.
        newComment.innerHTML = `<strong>${username}:</strong> ${commentText}`;

        commentsSection.appendChild(newComment);

        // Limpa os campos do formulário
        usernameInput.value = '';
        commentInput.value = '';
    });


    // Lógica para o XSS Baseado em DOM (Ferramenta de Rede)
    const networkForm = document.getElementById('network-form');
    const networkInput = document.getElementById('network-input');
    const networkResult = document.getElementById('network-result');

    networkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const target = networkInput.value;

        const output = `
Iniciando ping simulado para ${target}...

Resposta de ${target}: bytes=32 tempo<1ms TTL=128
Resposta de ${target}: bytes=32 tempo<1ms TTL=128
Resposta de ${target}: bytes=32 tempo<1ms TTL=128

Ping finalizado.
        `;
        
        // VULNERABILIDADE: A entrada do usuário é lida e escrita de volta no DOM
        // puramente pelo lado do cliente (JavaScript), tornando-se um vetor de DOM XSS.
        networkResult.innerHTML = output;
        
        networkInput.value = '';
    });

});