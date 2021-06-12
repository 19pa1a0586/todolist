const intake = document.getElementById("intake");
const addTodo = document.querySelector("#add-todo");
const todoList = document.querySelector(".todo-list");
const filterItems = document.querySelector(".filter-items")


addTodo.addEventListener("click", addItem);
todoList.addEventListener("click", deleteCheck);
filterItems.addEventListener("click", filterList);
document.addEventListener("DOMContentLoaded", getItemsData);


function addItem(evt) {
    evt.preventDefault();

    if (evt.key === 13) {
        console.log("EE13");
    }

    if (intake.value) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("todo");

        const newLi = document.createElement("li");
        newLi.textContent = intake.value;
        newLi.classList.add("new-li");
        newDiv.appendChild(newLi);

        saveItemsData(intake.value);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        checkBtn.classList.add("check-btn");
        newDiv.appendChild(checkBtn);

        const delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fas fa-eraser"></i>';
        delBtn.classList.add("del-btn");
        newDiv.appendChild(delBtn);

        const itemsList = document.querySelector(".items-list");
        itemsList.appendChild(newDiv);

        intake.value = "";
    }
    else {
        alert("Please enter your item!!");
    }
}

function deleteCheck(evt) {
    const item = evt.target;
    if (item.classList[0] == "check-btn") {
        item.parentElement.classList.toggle("checked");
    }
    else if (item.classList[0] == "del-btn") {
        item.parentElement.classList.add("shakeMe");
        removeItemData(item.parentElement);
        item.parentElement.addEventListener("transitionend", () => {
            item.parentElement.remove();
        })
    }
}

function filterList(evt) {
    // console.log(todoList.children[0]["childNodes"])
    const liItems = todoList.children[0]["childNodes"];
    // evt.target.parentElement.classList.toggle("clicked");
    liItems.forEach(item => {
        const value = evt.target.value
        if (value === "all") {
            item.style.display = "flex";
        }
        else if (value === "completed") {
            if (item.classList.contains("checked")) {
                item.style.display = "flex";
            }
            else {
                item.style.display = "none";
            }
        }
        else if (value === "uncompleted") {
            if (!item.classList.contains("checked")) {
                item.style.display = "flex";
            }
            else {
                item.style.display = "none";
            }
        }
    })
}

function saveItemsData(item) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(item);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getItemsData(item) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("todo");

        const newLi = document.createElement("li");
        newLi.textContent = todo;
        newLi.classList.add("new-li");
        newDiv.appendChild(newLi);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';
        checkBtn.classList.add("check-btn");
        newDiv.appendChild(checkBtn);

        const delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fas fa-eraser"></i>';
        delBtn.classList.add("del-btn");
        newDiv.appendChild(delBtn);

        const itemsList = document.querySelector(".items-list");
        itemsList.appendChild(newDiv);
    })
}

function removeItemData(item) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(item.children[0].innerText);
    todos.splice(todos.indexOf(item.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
