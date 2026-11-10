# Tochomot - Week 05 Project
## DOM Manipulation - Interactive To-Do List

## Live Demo
https://tochomot385-hash.github.io/iyf-s12-week-05-tochomot385-hash/

## Features
- Add task with button or Enter, refuses empty tasks
- Click to complete / undo, Delete button per task
- Filter All / Active / Completed, Clear Completed
- Bonus: double-click to edit, Enter saves, Escape cancels
- Practice tasks 9.1-10.4 in dom-practice.html

## Technologies
- HTML, CSS, JavaScript DOM, Git & GitHub

## What I Learned
- Delegation let new tasks work without new listeners. I first added a listener to every task, so new tasks didn't respond. With ONE listener on the <ul>, every new task works because the click bubbles up and I check e.target.
- textContent stopped <b>hi</b> becoming bold. When I used innerHTML, a task called <b>hi</b> became bold. With textContent it shows as plain text, which is safe.
- I must use preventDefault() on form submit, otherwise the page reloads and my tasks array is wiped.

## Challenges Faced
- Page kept reloading on Add. Fixed with e.preventDefault().
- Delete button was also toggling complete. Fixed by checking dataset.action === "delete" first and returning.