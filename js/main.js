// DOM-Elements 

const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
}
checkEmptyList()

tasks.forEach(function(task){
    renderTask(task)
})

form.addEventListener('submit', addTask)
//deleting task
tasksList.addEventListener('click', deleteTask)
// done task event listener
tasksList.addEventListener('click', doneTask)

function deleteTask(event){
    if (event.target.dataset.action !== 'delete') return;

        const parentNode = event.target.closest('li')

        const id = parentNode.id

        // const index = tasks.findIndex(function(task){
        //     console.log(task)
        //     if(task.id ==  id){
        //         return true
        //     }
        // })
        // console.log(index)

        // tasks.splice(index, 1)

        tasks = tasks.filter(function(task){
             if (task.id == id){
                return false
             }else{
                return true
             }
        })
        saveToLocalStorage()
        parentNode.remove()
        checkEmptyList()
}

function doneTask(event){
    if(event.target.dataset.action !== 'done') return

        const parentNode = event.target.closest('.list-group-item');

        const id = parentNode.id;

        const task = tasks.find(function(task){
            if (task.id === +id){
                return true
            }
        })
        task.done = !task.done
        saveToLocalStorage()


        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')
}

function addTask(event) {
    event.preventDefault()
    const taskText = taskInput.value
    

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)
    saveToLocalStorage()

    // Creating CSS - class
    const cssClass = newTask.done ? "task-title task-title--done" : "task-title"


    // Create new task
    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`

    // Filling task into ul
    tasksList.insertAdjacentHTML("beforeend", taskHTML)

    taskInput.value = ''
    taskInput.focus()
    checkEmptyList()
}

function checkEmptyList(){
    if (tasks.length == 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <i class="fa-solid fa-broom mt-3" id="logo_empty"></i>
        <div class="empty-list__title">Список дел пуст</div>
    </li>`
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length>0){
        const emptyListElem = document.querySelector('#emptyList')
        emptyListElem ? emptyListElem.remove() : null
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    // Creating CSS - class
    const cssClass = task.done ? "task-title task-title--done" : "task-title"


    // Create new task
    const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`

    // Filling task into ul
    tasksList.insertAdjacentHTML("beforeend", taskHTML)
}