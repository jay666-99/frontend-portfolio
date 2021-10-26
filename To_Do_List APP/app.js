'use strict'
function Todo(id, content, isDone) {
    this.id = id;
    this.content = content;
    this.isDone = isDone;
};

// Declare a controller
function TodoController() {
    this.todoList = [];
    this.id = 1;
    this.ENTER_KEY = 13;
    this.todoInput = document.getElementById('newTodo');
    this.todoListView = document.getElementById('todoListView');
};

TodoController.prototype = {
 // Get to localstorage
    getTodoFromLocalstorage: function (key) {
        var todoList = JSON.parse(localStorage.getItem(key)) || [];
    return todoList;
},

// set into localstorage
    setTodoLocalstorage: function (key) {
        localStorage.setItem('todoList', JSON.stringify(key));
    },

    handleTodoItem: function (value) {
        this.isDone = false;    
    var mainArray = todoController.getTodoFromLocalstorage('todoList');
    this.id = todoController.idLargestOfLocal(mainArray) + 1;
    var todoItem = new Todo(this.id, value, this.isDone);
    return todoItem;
},

// find id last in array at localstorage
    idLargestOfLocal: function (mainArray) {
        var lengthArr = mainArray.length;
    if (lengthArr !== 0) {
        return mainArray[lengthArr - 1].id;
    } else {
        return 0;
}
    return lastId;
},

    addNewTodo: function (todo, list) {
    list.push(todo);
    todoController.setTodoLocalstorage(list);
    return todo;
  },
    setAttributes: function (element, attrs) {
    for (var key in attrs) {
    element.setAttribute(key, attrs[key]);
        }
},

 //Create new checkbox input element
    checkboxView: function (todoId) {
        var inpCheckbox = document.createElement('input');
        this.setAttributes(inpCheckbox, { type: 'checkbox', class: 'itemList', id: todoId });
//event check for input checkbox
    inpCheckbox.addEventListener('click', function (e) {
//get list array from localStorage
    var list = todoController.getTodoFromLocalstorage('todoList');
    var id = e.target.getAttribute('id');
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == id) {
    list[i].isDone = e.target.checked;
        }
    }
//save list todo to localStorage
    todoController.setTodoLocalstorage(list);
        todoController.countItem();
    });
return inpCheckbox;
},

// Create new lable element
    createLableView: function (todo) {
        var lbContent = document.createElement('label');
        this.setAttributes(lbContent, { value: todo.content, class: 'labelContent ' });
        lbContent.innerHTML = todo.content;
    return lbContent;
    },

// Create new li element
    initTodoITem: function (todo) {
        var item = document.createElement('li');
        item.setAttribute('class', 'todoItem')
    return item;
},

//Create new input edit element
    editInputView: function (todo) {
//get array from localStorage
    var list = todoController.getTodoFromLocalstorage('todoList');
    var inputEdit = document.createElement('input');
    this.setAttributes(inputEdit, {
id: todo.id,
class: 'edit',
value: todo.content,
type: 'text',
});
inputEdit.focus();

//event onkeyup get value edit form inputEdit
    inputEdit.onkeypress = function (e) {
        if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) {
    todoController.handleTodoUpdate(e); 
     }
};
return inputEdit;
},
    handleTodoUpdate: function (event) {
        var list = todoController.getTodoFromLocalstorage('todoList');
        var inputEdit = event.target;
        var todoItem = new Todo(inputEdit.id, inputEdit.value, false);
            todoController.updateTodoEdit(todoItem, list);
       var editing = document.querySelector('.editing');
        editing.classList.remove('editing');
        todoController.renderTodo();
},
//update todo edit
    updateTodoEdit: function (todo, list) {
    for (var i = 0; i < list.length; i++) {
    if (list[i].id == todo.id) {
    list[i].content = todo.content;
    todoController.setTodoLocalstorage(list);   
        break;
        }
}
return todo;
},
//get item todo from event get value edit
    removeButtonView: function (todo) {
    var btnRemove = document.createElement('button');
    this.setAttributes(btnRemove, { class: 'remove', id: todo.id });
//event click mouse into btnRemove a item todo
    btnRemove.addEventListener('click', function (e) {
    var id = e.target.getAttribute('id');
    todoController.removeTodo(id);
    todoController.renderTodo();
    todoController.countItem();
});
return btnRemove;
},
// object render to view 
    todoView: function (todo) {
        var item = this.initTodoITem(todo);//create node li
        var inpCheckbox = this.checkboxView(todo.id),//create node input checkbox
    lbContent = this.createLableView(todo),//create node lable
    inputEdit = this.editInputView(todo),//create node input edit
    btnRemove = this.removeButtonView(todo);//create node button remove item todo
//item append each element
    item.appendChild(inpCheckbox);
    item.appendChild(lbContent);
    item.appendChild(inputEdit);
    item.appendChild(btnRemove);
//ul append each item
    document.querySelector('#todoListView').appendChild(item);
//return node li contain inpCheckbox, lbContent, inputEdit, btnRemove
    return item;
},
// list array get from localStorage
    removeTodo: function (id, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
    for (var i = 0; i < list.length; i++)  {
    if (list[i].id == id) {
        list.splice(i, 1);
        break;
    }
}
    todoController.setTodoLocalstorage(list);
},
    countItem: function (index, list) {
        list = todoController.getTodoFromLocalstorage('todoList');
        index = 0;
    for (var i = 0; i < list.length; i++) {
    if (!list[i].isDone) {
        index++;
    }
}
document.getElementById('todoCount').innerHTML = index;
    },
    events: function () {
// Event add todo
        todoController.todoInput.onkeyup = function (event) {
    if (event.which == todoController.ENTER_KEY || event.keyCode == todoController.ENTER_KEY) {
//get from localStorage
    var todoList = todoController.getTodoFromLocalstorage('todoList');
//attach value for todo
    var todoItem = todoController.handleTodoItem(todoController.todoInput.value);
//add new a Todo
    var todo = todoController.addNewTodo(todoItem, todoList);
//Execute display to UI
        todoController.todoView(todo);
//clear input
        todoController.todoInput.value = '';
        todoController.countItem();
    }
};
//event check all checkbox in list item
    var list = document.getElementsByClassName('itemList');
    var checkAll = document.getElementById('toggleInputAll');
        checkAll.addEventListener('change', function (e) {
    var check;
    for (var i = 0; i < list.length; i++) { 
        list[i].checked = this.checked;
        check = e.target.checked;
        todoController.checkAllTodo(check);
    }
todoController.countItem();
});

//Show all items
    var listWork = document.getElementsByClassName('todoItem');
    var showAllItem = document.getElementById('allWorks');
        showAllItem.addEventListener('click', function () {
    for (var i = 0; i < listWork.length; i++) {
        listWork[i].style.display = 'block';
    }
});
// Filter todo list with actived items
    var activeItem = document.getElementsByClassName('todoItem');
    var todoActive = document.getElementById('activedItems');
        todoActive.addEventListener('click', function () {
    for (var i = 0; i < list.length; i++) {
    if (!list[i].checked) {
        activeItem[i].style.display = 'block';
    } else {
        activeItem[i].style.display = 'none';
        }
    }
});

//Filter completed todo list
    var completeItem = document.getElementsByClassName('todoItem');
    var todoCompleted = document.getElementById('completedTodos');
        todoCompleted.addEventListener('click', function () {
    for (var i = 0; i < list.length; i++) {
    if (list[i].checked) {
        completeItem[i].style.display = 'block';
    } else {
        completeItem[i].style.display = 'none';
        }
    }
});

// Added event clear completed items for button
      var clearButton = document.getElementById('btnClear');
        clearButton.addEventListener('click', function () {
//get from localStorage
      var list = todoController.getTodoFromLocalstorage('todoList');
        todoController.clearCompleted(list);
        todoController.setTodoLocalstorage(list);
        todoController.renderTodo();
    });
},

 //get from localstorage
    clearCompleted: function (list) {
    while (list.find(({ isDone }) => isDone)) {
        list.splice(list.indexOf(list.find(({ isDone }) => isDone)), 1);
    }
},
    checkAllTodo: function (check, todoList) {
        todoList = todoController.getTodoFromLocalstorage('todoList');
    for (var i = 0; i < todoList.length; i++) {
        todoList[i].isDone = check;
        todoController.setTodoLocalstorage(todoList);
            }
},

// list array get from localStorage
    renderTodo: function () {
//get from localStorage
    var list = todoController.getTodoFromLocalstorage('todoList');
        todoController.removeElement();
    for (var i = 0; i < list.length; i++) {
    var element = todoController.todoView(list[i]);
    if (list[i].isDone) {
    element.classList.add('checked'); }
    }
},
    removeElement: function () {
    var todoListView = document.getElementById('todoListView');
    while (todoListView.hasChildNodes()) {
        todoListView.removeChild(todoListView.firstChild);
        } },
};
    //change class selected
    function changeClass(elem) {
    var a = document.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
        a[i].classList.remove('selected');
    };
    elem.classList.add('selected');
};

//todoController handle all action add, delete, edit, events
var todoController = new TodoController();
//todo create new object todo
var todo = new Todo();
todoController.events();
//render todo display to UI
todoController.renderTodo();
//count all item active
todoController.countItem();