import "./style.css";
type TODO = {
  title: string;
  isChecked: boolean;
  id: number;
};
let todos: TODO[] = localStorage.todos?JSON.parse(localStorage.todos) as TODO[] : [];
const taskInput = document.getElementsByName("task")[0] as HTMLInputElement;
const form = document.getElementsByTagName("form")[0] as HTMLFormElement;
console.log(form);
form.onsubmit = (e: SubmitEvent): void => {
  e.preventDefault();
  if (!taskInput.value) return;
  let todo: TODO = {
    title: taskInput.value,
    isChecked: false,
    id: Math.round(Math.random() * 1000),
  };
  taskInput.value = "";
  todos.push(todo);
  localStorage.todos =JSON.stringify(todos);
  console.log("fired");
  console.log(todos);
  renderTodo(todos);
};
const renderTodo = (todos: TODO[]): void => {
  document.getElementsByClassName("todo-container")[0].innerHTML = "";
  todos.forEach((todo,i) => {
    const deleteButton = document.createElement("button") as HTMLButtonElement;
    deleteButton.innerText = "DELETE";
    deleteButton.className = "delete-btn"
    deleteButton.onclick = () => {
      if (todo.isChecked) {
        deleteTodo(todo.id);
      }
    };
    const checkButton = document.createElement("input") as HTMLInputElement;
    checkButton.type = "checkbox";
    if (todo.isChecked) {
      checkButton.checked = true;
    }
    checkButton.className = "check-box";
    checkButton.onchange = () => {
      todo.isChecked = checkButton.checked;
      console.log(todos);
    };
    const divBox = document.createElement("div") as HTMLDivElement;
    divBox.className = "todo";
    const pBox = document.createElement("p") as HTMLParagraphElement;
    pBox.className = "title";
    pBox.innerText = (i+1)+".  "+todo.title;
    const deleteAndCheckButtonBox = document.createElement(
      "div"
    ) as HTMLDivElement;
    deleteAndCheckButtonBox.className = "delete-check-button";
    deleteAndCheckButtonBox.append(checkButton);
    deleteAndCheckButtonBox.append(deleteButton);

    divBox.append(pBox);
    divBox.append(deleteAndCheckButtonBox);
    document.getElementsByClassName("todo-container")[0].append(divBox);
  });
};

const deleteTodo = (id: number) => {
  console.log({ id });
  todos = todos.filter((v) => {
    return v.id !== id;
  });
  console.log(todos);
  localStorage.todos =JSON.stringify(todos);
  renderTodo(todos);
};
renderTodo(todos);