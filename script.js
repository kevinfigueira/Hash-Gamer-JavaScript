//============INITIAL DATA==============
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;

reset();

//====================EVENTS============== 
//SELECIONANDO O BOTÃO RESERTAR
document.querySelector('.reset').addEventListener('click', reset);

//SELECIONANDO TODOS OS QUADRADOS DO TABULEIRO e ADD UM EVENT DE CLICK
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


//===========================FUNCTIONS=====================
function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = player;
        renderSquare();
        togglePLayer(); // Função para alternar o jogador
    }

}

//FUNÇÃO RESETAR
function reset(){
    warning = '';
    finished = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true

    renderSquare();// Reseta o tabuleiro
    renderInfo();//Mostra a vez do jogador e reseta o vencedor
}
//FUNÇÃO P/ LIMPAR o TABULEIRO E PREENCHER OS VALORES
function renderSquare(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        if(square[i] !== ''){
            item.innerHTML = square[i];
        }else{
            item.innerHTML = '';
        }
    }

    checkGamer(); // funçao para verificar quem ganhou/empatou
}

//FUNÇÃO p/ JOGAR OS VALORES DE PLAYER, RESULTADO e a VEZ
function renderInfo(){
    document.querySelector('.playerNext').innerHTML = player;
    document.querySelector('.winner-player').innerHTML = warning;
    let scoreX = document.querySelector('.score-boardX');
    let scoreO = document.querySelector('.score-boardO');
    let x = document.querySelector('.x');
    let o = document.querySelector('.o');

    if(player === 'x'){
        scoreX.style.borderBottom = '2px solid Cyan';
        scoreO.style.borderBottom = '';
        x.style.color = 'white';
        o.style.color = '';
    }else{
        scoreX.style.borderBottom = '';
        scoreO.style.borderBottom = '2px solid Cyan';
        o.style.color = 'white';
        x.style.color = '';
    }
}

//FUNÇÃO PARA ALTERNAR O JOGADOR
function togglePLayer(){
    player = (player === 'x') ? 'o' : 'x';
     renderInfo();
}

//FUNÇÃO PARA VERIFICAR QUEM GANHOU OU EMPATOU
function checkGamer(){
    if(checkWinnerIs('x')) {
        warning = 'X';
        playing = false;
    }else if(checkWinnerIs('o')){
        warning = 'O';
        playing = false;
    }else if(checkDraw()){
        warning = 'Empatou';
        playing = false;
    }
   
}

//FUNÇÃO DE QUEM GANHOU
function checkWinnerIs(player){
    let possibility = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let pItem in possibility){
        let pArray = possibility[pItem].split(',');//a1, a2, a3
        let hasWon = pArray.every( option => square[option] === player);
        if(hasWon){
            return true;
        }
    }

    return false;
}


//FUNÇÃO DE EMPATE
function checkDraw(){
    for(let i in square){
        if(square[i] === ''){
            return false;
        }
    }

    return true;
}
