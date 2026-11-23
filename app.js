const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let currentFilter = "all";

function save(){ localStorage.setItem("todos", JSON.stringify(todos)); }

function createTodoElement(todo){
  const li = document.createElement("li");
  li.dataset.id = todo.id;
  if(todo.completed) li.classList.add("completed");
  const span = document.createElement("span");
  span.textContent = todo.text;
  const del = document.createElement("button");
  del.textContent = "✕";
  del.className = "delete-btn";
  del.dataset.action = "delete";
  li.append(span, del);
  return li;
}

function renderTodos(){
  todoList.innerHTML = "";
  const filtered = todos.filter(t =>
    currentFilter === "all" ? true :
    currentFilter === "active" ? !t.completed : t.completed
  );
  filtered.forEach(t => todoList.appendChild(createTodoElement(t)));
  updateStats();
}

function addTodo(text){
  todos.push({ id: Date.now(), text: text.trim(), completed: false });
  save(); renderTodos();
}

function toggleTodo(id){
  const t = todos.find(x => x.id === id);
  if(t) t.completed = !t.completed;
  save(); renderTodos();
}

function deleteTodo(id){
  todos = todos.filter(x => x.id !== id);
  save(); renderTodos();
}

function updateStats(){
  const left = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${left} item${left !== 1 ? "s" : ""} left`;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if(!input.value.trim()) return;
  addTodo(input.value);
  input.value = ""; input.focus();
});

todoList.addEventListener("click", e => {
  const li = e.target.closest("li");
  if(!li) return;
  const id = Number(li.dataset.id);
  if(e.target.dataset.action === "delete"){ deleteTodo(id); return; }
  toggleTodo(id);
});

todoList.addEventListener("dblclick", e => {
  const li = e.target.closest("li");
  if(!li) return;
  const id = Number(li.dataset.id);
  const todo = todos.find(x => x.id === id);
  const span = li.querySelector("span");
  const edit = document.createElement("input");
  edit.className = "edit-input"; edit.value = todo.text;
  span.replaceWith(edit); edit.focus();
  const saveEdit = () => { if(edit.value.trim()){ todo.text = edit.value.trim(); save(); } renderTodos(); };
  edit.addEventListener("keydown", ev => {
    if(ev.key === "Enter") saveEdit();
    if(ev.key === "Escape") renderTodos();
  });
  edit.addEventListener("blur", saveEdit);
});

filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  renderTodos();
}));

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter(t => !t.completed);
  save(); renderTodos();
});

renderTodos();
