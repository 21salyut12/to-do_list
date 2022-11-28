const text = document.getElementById("text")
const addTaskBtn = document.getElementById("add-task-btn")
const saveToDoBtn = document.getElementById("save-todo-btn")
const listBox = document.getElementById("listBox")
const saveIndex = document.getElementById("saveIndex")
let todoArr = []

//Event listener for the button that adds a task
addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let todo = localStorage.getItem("todo")
    if (todo === null) {
        todoArr = []
    } else {
        todoArr = JSON.parse(todo)
    }
    todoArr.push(text.value)
    text.value = ""
    localStorage.setItem("todo", JSON.stringify(todoArr))
    displayTodo()
})

saveToDoBtn.addEventListener("click", () => {
    let todo = localStorage.getItem("todo")
    todoArr = JSON.parse(todo)
    let id = saveIndex.value
    todoArr[id] = text.value
    addTaskBtn.style.display = "block"
    saveToDoBtn.style.display = "none"
    text.value = ""
    localStorage.setItem("todo", JSON.stringify(todoArr))
    displayTodo()
})

// Function for displaying a task
function displayTodo() {
    let todo = localStorage.getItem("todo")
    if (todo === null) {
        todoArr = []
    } else {
        todoArr = JSON.parse(todo)
    }
    let htmlCode = ""
    todoArr.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-4 items-center'>
            <p class='w-full text-grey-darkest'>${list}</p>
            <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
            <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
            </div>`
    });
    listBox.innerHTML = htmlCode
}

function edit(ind) {
    saveIndex.value = ind
    let todo = localStorage.getItem("todo")
    todoArr = JSON.parse(todo)
    text.value = todoArr[ind]
    addTaskBtn.style.display = "none"
    saveToDoBtn.style.display = "block"
}

function deleteTodo(ind) {
    let todo = localStorage.getItem("todo")
    todoArr = JSON.parse(todo)
    todoArr.splice(ind, 1)
    localStorage.setItem("todo", JSON.stringify(todoArr))
    displayTodo()
}