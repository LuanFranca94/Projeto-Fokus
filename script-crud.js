const addTarefaBt = document.querySelector('.app__button--add-task');
const formulario = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');

addTarefaBt.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
});

const listaDeTarefas = [];

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefas = {
        descricao: textArea.value 
    }
    listaDeTarefas.push(tarefas);
    localStorage.setItem('tarefas', JSON.stringify(listaDeTarefas));
});