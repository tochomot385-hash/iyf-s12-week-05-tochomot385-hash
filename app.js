// Week 5 - To-Do List
let tasks = [];
let currentFilter = "all";
let nextId = 1;

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const itemsLeftEl = document.querySelector("#items-left");
const clearBtn = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

function render() {
  list.innerHTML = "";
  const filtered = tasks.filter((t) => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (task.completed) li.classList.add("completed");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text; // textContent, never innerHTML

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.textContent = "Delete";
    delBtn.dataset.action = "delete";

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  const left = tasks.filter((t) => !t.completed).length;
  itemsLeftEl.textContent = left === 1 ? "1 item left" : `${left} items left`;
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return; // refuse empty / spaces-only
  tasks.push({ id: nextId++, text: trimmed, completed: false });
  render();
}

// Add with button OR Enter - form submit handles both
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stops page reload
  addTask(input.value);
  input.value = "";
  input.focus();
});

// EVENT DELEGATION: ONE listener on the list
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (e.target.dataset.action === "delete") {
    tasks = tasks.filter((t) => t.id !== id);
    render();
    return;
  }
  // Click task = toggle complete
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = !task.completed;
  render();
});

// Bonus: Double-click to edit
list.addEventListener("dblclick", (e) => {
  const span = e.target.closest(".task-text");
  if (!span) return;
  const li = span.closest("li");
  const id = Number(li.dataset.id);
  const task = tasks.find((t) => t.id === id);
  const editInput = document.createElement("input");
  editInput.classList.add("edit-input");
  editInput.value = task.text;
  li.replaceChild(editInput, span);
  editInput.focus();

  const save = () => {
    const val = editInput.value.trim();
    if (val) task.text = val;
    render();
  };
  const cancel = () => render();
  editInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") save();
    if (ev.key === "Escape") cancel();
  });
  editInput.addEventListener("blur", save);
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.completed);
  render();
});

render();