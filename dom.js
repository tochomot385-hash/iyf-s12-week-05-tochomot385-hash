const header = document.getElementById("main-header");
console.log("getElementById:", header);
const contents = document.getElementsByClassName("content");
console.log("getElementsByClassName:", contents);
const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs);
const firstLink = document.querySelector(".nav-link");
console.log("querySelector:", firstLink);
const allLinks = document.querySelectorAll(".nav-link");
console.log("querySelectorAll:", allLinks);
const h1 = document.querySelector("h1");
console.log("1. h1:", h1);
const allContents = document.querySelectorAll(".content");
console.log("2. All .content:", allContents);
const form = document.getElementById("contact-form");
console.log("3. Form:", form);
const emailInput = document.getElementById("email");
console.log("4. Email input:", emailInput);
const navListItems = document.querySelectorAll("nav li");
console.log("5. Nav li:", navListItems);
const firstNavLink = document.querySelector(".nav-link");
console.log("6. First nav-link:", firstNavLink);
const allParagraphs = document.querySelectorAll("p");
const lastParagraph = allParagraphs[allParagraphs.length - 1];
console.log("7. Last paragraph:", lastParagraph);

const nav = document.querySelector("nav");
console.log("nav parent:", nav.parentElement);
console.log("nav children:", nav.children);
console.log("nav first child:", nav.firstElementChild);
console.log("nav last child:", nav.lastElementChild);
const article = document.querySelector("article");
console.log("article next sibling:", article.nextElementSibling);
console.log("article previous sibling:", article.previousElementSibling);
const navLinks = nav.querySelectorAll("a");
console.log("navLinks inside nav:", navLinks);
const headerEl = document.getElementById("main-header");
console.log("Practice 1 - nav inside header:", headerEl.querySelector("nav"));
const parentLi = firstLink.parentElement;
console.log("Practice 2 - parent li:", parentLi);
console.log("Practice 3 - article next sibling:", article.nextElementSibling);
const ul = document.querySelector("ul");
console.log("Practice 4 - all li in ul:", ul.children);
const footer = document.querySelector("footer");
console.log("Practice 5 - body from footer:", footer.parentElement);

console.log("textContent:", h1.textContent);
console.log("innerText:", h1.innerText);
h1.textContent = "DOM Practice";
console.log("innerHTML:", article.innerHTML);
const userInput = `<img src="x" onerror="alert('hacked!')">`;
article.textContent = userInput; // Safe: shows as text, doesn't run
article.innerHTML = `<h2 class="title">Article Title</h2><p class="content">This is the first paragraph.</p><p class="content">This is the second paragraph.</p>`;
const link = document.querySelector(".nav-link");
console.log("getAttribute href:", link.getAttribute("href"));
console.log("href property:", link.href);
link.setAttribute("href", "https://developer.mozilla.org");
console.log("has target?", link.hasAttribute("target"));
link.removeAttribute("target");
link.dataset.id = "123";
link.dataset.category = "tech";
console.log(link.dataset.id, link.dataset.category);
const container = document.querySelector(".container");
container.style.backgroundColor = "#f0f0f0";
container.style.padding = "30px";
container.style.borderRadius = "8px";
Object.assign(container.style, { backgroundColor: "#333", color: "white", padding: "20px" });

const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";
newParagraph.className = "content highlight";
article.appendChild(newParagraph);
const firstParagraph = article.querySelector("p");
article.insertBefore(newParagraph, firstParagraph);
article.prepend(newParagraph);
article.append(newParagraph);
const navItem = document.querySelector(".nav-link").parentElement;
const clone = navItem.cloneNode(true);
clone.querySelector("a").textContent = "New Link";
document.querySelector(".nav-list").appendChild(clone);
function addNavItem(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href; a.className = "nav-link"; a.textContent = text;
    li.appendChild(a);
    document.querySelector(".nav-list").appendChild(li);
}
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");
const tempPara = document.createElement("p");
tempPara.textContent = "Temp - will be removed";
article.appendChild(tempPara);
tempPara.remove();
const navList = document.querySelector(".nav-list");
const lastNavLi = navList.querySelector("li:last-child");
if(lastNavLi) lastNavLi.parentElement.removeChild(lastNavLi);

let count = 0;
const counterDiv = document.createElement("div");
counterDiv.innerHTML = `<h2>Counter: <span id="count">0</span></h2><button id="inc">+</button> <button id="dec">-</button> <button id="reset">Reset</button>`;
document.body.appendChild(counterDiv);
const countEl = document.getElementById("count");
document.getElementById("inc").addEventListener("click", () => { count++; countEl.textContent = count; });
document.getElementById("dec").addEventListener("click", () => { count = Math.max(0, count-1); countEl.textContent = count; });
document.getElementById("reset").addEventListener("click", () => { count = 0; countEl.textContent = count; });

document.addEventListener("click", (e) => {
  console.log("Target:", e.target, "Type:", e.type, "Pos:", e.clientX, e.clientY);
});
document.addEventListener("keydown", (e) => {
  console.log("Key:", e.key, "Code:", e.code, "Shift:", e.shiftKey, "Ctrl:", e.ctrlKey);
  if(e.ctrlKey && e.key.toLowerCase() === "s"){ e.preventDefault(); alert("Saved!"); }
  if(e.key === "Escape" && form) form.reset();
  if(e.ctrlKey && e.key === "Enter" && form) form.dispatchEvent(new Event("submit"));
});

const bubbleDiv = document.createElement("div");
bubbleDiv.innerHTML = `<div id="grandparent" style="padding:10px;border:1px solid red">Grandparent<div id="parent" style="padding:10px;border:1px solid blue">Parent<div id="child" style="padding:10px;border:1px solid green">Child - Click me</div></div></div>`;
document.body.appendChild(bubbleDiv);
["grandparent","parent","child"].forEach(id => {
  document.getElementById(id).addEventListener("click", () => console.log(id + " clicked"));
});
const demoUl = document.createElement("ul");
demoUl.innerHTML = `<li>Demo Task 1 <button>Delete</button></li><li>Demo Task 2 <button>Delete</button></li>`;
document.body.appendChild(demoUl);
demoUl.addEventListener("click", e => {
  const li = e.target.closest("li");
  if(!li) return;
  if(e.target.tagName === "BUTTON") li.remove();
  else li.classList.toggle("completed");
});

const nameInput = document.getElementById("name");
function showError(input, message){
  input.classList.add("error");
  let err = input.nextElementSibling;
  if(!err || !err.classList.contains("error-msg")){
    err = document.createElement("span"); err.className = "error-msg"; err.style.color = "red";
    input.after(err);
  }
  err.textContent = message;
}
function clearError(input){
  input.classList.remove("error");
  const err = input.nextElementSibling;
  if(err && err.classList.contains("error-msg")) err.remove();
}
if(form && nameInput){
  nameInput.addEventListener("input", e => {
    if(e.target.value.length < 2) showError(nameInput, "Name must be at least 2 characters");
    else clearError(nameInput);
  });
  emailInput.addEventListener("input", e => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    if(!ok) showError(emailInput, "Please enter a valid email");
    else clearError(emailInput);
  });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log("Form data:", data);
    if(data.name && data.name.length >= 2){
      alert("Form submitted successfully!");
      form.reset();
    }
  });
}

let paraCount = 0;
function colorChanger(){
  const c = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");
  document.querySelectorAll("h1,h2,h3").forEach(h => h.style.color = c);
}
function addParagraph(){
  paraCount++;
  const p = document.createElement("p");
  p.textContent = `New paragraph #${paraCount} `;
  const del = document.createElement("button");
  del.textContent = "Delete";
  del.addEventListener("click", () => p.remove());
  p.appendChild(del);
  document.body.appendChild(p);
}
function removeImages(){
  document.querySelectorAll("img").forEach(img => img.remove());
}
function copyContent(){
  const src = document.getElementById("source-div");
  const tgt = document.getElementById("target-div");
  if(src && tgt) tgt.innerHTML = src.innerHTML;
}
function darkModeToggle(){
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}
if(localStorage.getItem("dark") === "true") document.body.classList.add("dark");const
