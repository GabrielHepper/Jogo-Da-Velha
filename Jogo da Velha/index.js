// Define o jogador padrão como DOTA.
let currentPlayer = 'DOTA';

// Status do jogo quando iniciado.
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Função para colocar a marca, no caso, DOTA ou LOL.
function placeMark(cell) {
    // Pega o índice do bloco com base no ID, e converte para um número.
    const index = parseInt(cell.id.replace('block', '')) - 1;

    // Verifica se o bloco está vazio e se o jogo ainda está ativo.
    if (gameBoard[index] === '' && gameActive) {
        // Coloca a marca.
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;

        // Um if para verificar o resultado, empate ou vitória.
        if (checkWin()) {
            displayResult(`${currentPlayer} wins!`);
        } else if (!gameBoard.includes('')) {
            displayResult(`It's a tie!`);
        } else {
            // Muda para o outro jogador.
            currentPlayer = currentPlayer === 'DOTA' ? 'LOL' : 'DOTA';
        }
    }
}

// Função para verificar se há uma vitória com base nos padrões.
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Verifica se algum padrão de vitória foi concluído.
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

// Função para exibir o resultado do jogo em um dialog e reiniciar o jogo.
function displayResult(message) {
    document.getElementById('dialog-message').innerText = message;
    document.getElementById('result-dialog').style.display = 'block';
    
    // Aguarda 3 segundos antes de fechar o dialog e reiniciar o jogo.
    setTimeout(() => {
        closeModal();
        resetGame();
    }, 3000);
}

// Função para fechar o dialog do resultado.
function closeModal() {
    document.getElementById('result-dialog').style.display = 'none';
}

// Função para reiniciar o jogo.
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'DOTA';
    gameActive = true;

    // Limpa o conteúdo de todos os blocos no tabuleiro.
    document.querySelectorAll('.block').forEach(cell => {
        cell.innerText = '';
    });
}
