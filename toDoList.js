const todoList = document.getElementById('todo-list');
const inputField = document.querySelector('.container-to-do__items');
const addButton = document.querySelector('.container-to-do__plus-btn');
const createdList = document.querySelector('.created-list');

// Функція для отримання інформації про завдання з LocalStorage для певного списку
function getTasks(selectedList) {
  const tasksKey = `tasks_${selectedList}`;
  return JSON.parse(localStorage.getItem(tasksKey)) || [];
}

// Функція для збереження інформації про завдання в LocalStorage для певного списку
function saveTasks(selectedList, tasks) {
  const tasksKey = `tasks_${selectedList}`;
  localStorage.setItem(tasksKey, JSON.stringify(tasks));
}

// Функція для відображення завдань
function displayTasks(selectedList) {
  const tasks = getTasks(selectedList);
  todoList.innerHTML = '';

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input class="check-mark" type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">-</button>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      const index = tasks.indexOf(task);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(selectedList, tasks);
        listItem.remove();
      }
    });

    const checkbox = listItem.querySelector('.check-mark');
    const span = listItem.querySelector('span');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      span.style.textDecoration = task.completed ? 'line-through' : 'none';
      saveTasks(selectedList, tasks);
    });

    todoList.appendChild(listItem);
  });
}

// Встановлюємо вибраний список з LocalStorage
const selectedList = localStorage.getItem('selectedList') || 'option1';
listName.value = selectedList;

// Оновлюємо список завдань при виборі іншого списку
listName.addEventListener('change', () => {
  const selectedOption = listName.value;
  localStorage.setItem('selectedList', selectedOption);
  displayTasks(selectedOption);
});

// Оновлюємо список завдань при завантаженні сторінки
displayTasks(selectedList);

// Додаємо нове завдання при натисканні на кнопку
addButton.addEventListener('click', () => {
  const inputValue = inputField.value.trim();
  if (inputValue) {
    const tasks = getTasks(selectedList);
    const newTask = { text: inputValue, completed: false };
    tasks.push(newTask);
    saveTasks(selectedList, tasks);

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input class="check-mark" type="checkbox">
      <span>${inputValue}</span>
      <button class="delete-btn">-</button>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      const index = tasks.indexOf(newTask);
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasks(selectedList, tasks);
        listItem.remove();
      }
    });

    const checkbox = listItem.querySelector('.check-mark');
    const span = listItem.querySelector('span');
    checkbox.addEventListener('change', () => {
      newTask.completed = checkbox.checked;
      span.style.textDecoration = newTask.completed ? 'line-through' : 'none';
      saveTasks(selectedList, tasks);
    });

    todoList.appendChild(listItem);
    inputField.value = '';
  }
});
