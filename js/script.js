// constanta untuk menampung array 
const todos = [];

// event costume
const RENDER_EVENT = 'event-todo';

// listener event costum render_event akan melakukan console.log sementara
document.addEventListener(RENDER_EVENT, function(){
    console.log(todos);

    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';


    const completedTodoList = document.getElementById('completed-todos')
    completedTodoList.innerHTML= '';

    for(const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if(!todoItem.isComplated){
        uncompletedTODOList.append(todoElement);
        }else{
            completedTodoList.append(todoElement);
        }
    }
});

// listener html DOMContentLoaded untuk tampil data ketika load dom atau parsing data dan sudah menjadi dom
document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById('form');
     // listener submit supaya ketika klik tombol submit tidak refresh dan data sementara tidak hilang
    submitForm.addEventListener('submit', function(event){
        event.preventDefault();
    // untuk menambahkan todo baru
        addTodo();
    })
})

// untuk memasukan object kedalam array
function generateToObject (id, task, timeStamp , isComplated) {
    return{
        id,
        task,
        timeStamp,
        isComplated
    }
}

// function untuk id di generate dari date javascript supaya unix
function generateId(){
    
    return + new Date();
}

// function untk menambahkan todo baru data dari input title dan date
function addTodo(){
    const textTodo = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    const generateID = generateId();
    const todoObject = generateToObject(generateID, textTodo, timeStamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId){
    for (const todoItem of todos){
        if(todoItem.id === todoId) {
            return todoItem;
        }
    }
    return null;
}

function findTodoIndex(todoId){
    for(const index in todos){
        if (todos[index].id === todoId){
            return index;
        }
    }

    return -1
}

function addTaskToCompleted (todoId){
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isComplated = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeTaskFromCompleted (todoId) {
    const todoTarget = findTodoIndex(todoId)

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoTaskFromCompleted(todoId){
    const todoTarget = findTodo(todoId);

    if (todoTarget === null) return;

    todoTarget.isComplated = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeTodo(todoObject){
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timeStamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo${todoObject.id}`);


    if(todoObject.isComplated){
        
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function(){
            undoTaskFromCompleted(todoObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function(){
            removeTaskFromCompleted(todoObject.id);
        });

        container.append(undoButton, trashButton);
    }else{
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function(){
            addTaskToCompleted(todoObject.id);
        });

        container.append(checkButton);
    }

    return container;
}


