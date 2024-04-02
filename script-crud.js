//CAPTURA DE ELEMENTOS E CLASSES PARA CRIAÇÃO DE VARIÁVEIS PARA ADICIONAR NOVAS TAREFAS
const addTarefaBt = document.querySelector('.app__button--add-task');
const formulario = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list'); 
const cancelarBt = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
let tarefaSelecionada = null;
let liTarefaSelecionada = null;
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');
//--------------------------------------------------------------------------------------

//BOTÃO QUE VAI REALIZAR O EVENTO DE ADD UMA NOVA TAREFA ATRAVÉS DO CLICK
//TOGGLE VAI FAZER COM QUE APAREÇA A LISTA DE FORMULARIO DE TAREFAS QUE ANTES TAVA ESCONDIDA
addTarefaBt.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
});
//-----------------------------------------------------------------------------------------

//COMO A LISTA DE TAREFAS É UM OBJETO JS, EU PRECISO USAR O JSON.parse PARA QUE NÃO OCORRA ERRO
let listaDeTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
//----------------------------------------------------------------------------------------------

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
}

//FUNÇÃO PARA CRIAR UM ELEMENTO HTML QUE VAI ARMAZENAR NOVAS TAREFAS
function criarElementoTarefa (tarefas) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefas.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');

    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?");
        console.log("Nova descrição da tarefa: ", novaDescricao);
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefas.descricao = novaDescricao;
            atualizarTarefas();
        }
    }

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', '/imagens/edit.png');

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if (tarefas.completa) {
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            });
                if (tarefaSelecionada == tarefas) {
                    paragrafoDescricaoTarefa.textContent = '';
                    tarefaSelecionada = null;
                    liTarefaSelecionada = null;
                    return
                }
                tarefaSelecionada = tarefas
                liTarefaSelecionada = li
                paragrafoDescricaoTarefa.textContent = tarefas.descricao
                li.classList.add('app__section-task-list-item-active')
        }
    }
    return li;
}
//------------------------------------------------------------------------------------------
//BOTÃO QUE VAI REALIZAR O ENVIO DO FORMULÁRIO DA NOVA TAREFA A SER REALIZADA
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefas = {
        descricao: textArea.value 
    }
    listaDeTarefas.push(tarefas);
    const elementoTarefa = criarElementoTarefa(tarefas);
    ulTarefas.append(elementoTarefa);
    //localStorage para armazenar o formulário no servidor local 
    //JSON.stringify para transformar em string qualquer coisa que tiver dentro da variável
    atualizarTarefas();
    textArea.value = '';
    formulario.classList.add('hidden');
});

cancelarBt.onclick = () => {
    textArea.value = '';
    formulario.classList.add('hidden');
}

//---------------------------------------------------------------------------------------------
//VARIÁVEL QUE VAI GUARDAR AS TAREFAS A SEREM REALIZADAS NUMA LISTA 
listaDeTarefas.forEach(tarefas => {
    const elementoTarefa = criarElementoTarefa(tarefas);
    ulTarefas.append(elementoTarefa);
});
//---------------------------------------------------------------------------------------------

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true;
        atualizarTarefas()
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    listaDeTarefas = somenteCompletas ? listaDeTarefas.filter(tarefas => !tarefas.completa) : []
    atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);