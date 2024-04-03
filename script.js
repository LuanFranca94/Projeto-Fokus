// CAPTURA DE ELEMENTOS E CLASSES DENTRO DE VARIÁVEIS
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const bannerImagem = document.querySelector('.app__image');
const textoTitle = document.querySelector('.app__title');
const timerNaTela = document.querySelector('#timer');
const iniciarOuPausarTxt = document.querySelector('#start-pause span');
const iconePlayPausa = document.querySelector('.app__card-primary-butto-icon');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio ('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFinalTimer = new Audio('/sons/beep.mp3');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
//------------------------------------------------------------------------------------

//DEIXAR MÚSICA TOCANDO SEM PARAR
musica.loop = true;
//-------------------------------

//VARIÁVEL QUE TROCA MÚSICA PARA TOCAR OU PAUSAR AO SELECIONAR O BOTÃO
musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});
//---------------------------------------------------------------------

//ADICIONANDO O EVENTO DE CADA BOTÃO
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});
//----------------------------------------

//MUDANDO A FOTO, TEXTO E FUNDO DO BOTÃO E PÁGINA
function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    bannerImagem.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            textoTitle.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        
        case 'descanso-curto':
            textoTitle.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`    
            break;

        case 'descanso-longo':
            textoTitle.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`  
            break;

        default:
            break;
    }
}
//---------------------------------------------------------------------------------------------

//CRIAÇÃO DA VARIÁVEL PARA CONTAGEM REGRESSIVA E GUARDANDO UMA FUNÇÃO DENTRO DELA 
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musicaFinalTimer.play()
        alert('Tempo Finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        iniciarOuPausarTxt.textContent = "Começar"
        iconePlayPausa.setAttribute('src', '/imagens/play_arrow.png');
        zerar()
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
//--------------------------------------------------------

//CRIAÇÃO DA FUNÇÃO QUE VAI INICIAR E PAUSAR O TIMER
function iniciarOuPausar() {
    if (intervaloId) {
        iniciarOuPausarTxt.textContent = "Começar"
        iconePlayPausa.setAttribute('src', '/imagens/play_arrow.png');
        musicaPause.play()
        zerar()
        return;
    } 
    iniciarOuPausarTxt.textContent = "Pausar";
    iconePlayPausa.setAttribute('src', '/imagens/pause.png');
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);

}
//-------------------------------------------------------------------

//CRIAÇÃO DA FUNÇÃO QUE VAI ZERAR O TIMER
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
//------------------------------------------

//CRIAÇÃO DA FUNÇÃO QUE MOSTRA O TIMER NA TELA
function mostrarTempo() {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000);
    const tempoEmMinutos = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timerNaTela.innerHTML = `${tempoEmMinutos}`;
}
//----------------------------------------------

//MOSTRAR O TEMPO NA TELA
mostrarTempo();
//------------------------

//EVENTO DE INICIAR E PAUSAR O TIMER 
startPauseBt.addEventListener('click', iniciarOuPausar);
//--------------------------------------------------------