const listNameGet = document.getElementById('list_name');
const todoListGet = document.getElementById('todo-list');
const inputFieldGet = document.querySelector('.to-do-items');
const addButtonGet = document.querySelector('.plus-btn');

// Отримуємо поточний вибраний список з LocalStorage
const selectedList = localStorage.getItem('selectedList') || 'option1';

// Встановлюємо вибраний список
listNameGet.value = selectedList;

// Функція для відображення завдань на основі вибраного списку
function displayTasks(selectedList) {
  todoListGet.innerHTML = ''; // Очищуємо список перед відображенням нових завдань
  
  // Отримуємо дані з LocalStorage для вибраного списку
  const tasks = JSON.parse(localStorage.getItem(selectedList)) || [];

  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input class="check-mark" type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">-</button>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      // Видалення завдання із списку і оновлення LocalStorage
      tasks.splice(tasks.indexOf(task), 1);
      localStorage.setItem(selectedList, JSON.stringify(tasks));
      listItem.remove();
    });

    // Додаємо обробник події для checkbox
    const checkbox = listItem.querySelector('.check-mark');
    const span = listItem.querySelector('span');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      span.style.textDecoration = task.completed ? 'line-through' : 'none';
      // Оновлюємо LocalStorage після відмітки завдання як виконаного
      localStorage.setItem(selectedList, JSON.stringify(tasks));
    });

    todoList.appendChild(listItem);
  });
}

// Оновлюємо список завдань при виборі іншого списку
listNameGet.addEventListener('change', () => {
  const selectedOption = listNameGet.value;
  localStorage.setItem('selectedList', selectedOption);
  displayTasks(selectedOption);
});

// Оновлюємо список завдань при завантаженні сторінки
displayTasks(selectedList);

// Додаємо нове завдання при натисканні на кнопку
addButtonGet.addEventListener('click', () => {
  const inputValue = inputFieldGet.value.trim();

  if (inputValue) {
    // Отримуємо дані з LocalStorage для поточного списку
    const tasks = JSON.parse(localStorage.getItem(selectedList)) || [];
    const newTask = { text: inputValue, completed: false };
    tasks.push(newTask);
    
    // Оновлюємо LocalStorage з новим завданням
    localStorage.setItem(selectedList, JSON.stringify(tasks));

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input class="check-mark" type="checkbox">
      <span>${inputValue}</span>
      <button class="delete-btn">-</button>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      // Видалення завдання із списку і оновлення LocalStorage
      tasks.splice(tasks.indexOf(newTask), 1);
      localStorage.setItem(selectedList, JSON.stringify(tasks));
      listItem.remove();
    });

    // Додаємо обробник події для checkbox
    const checkbox = listItem.querySelector('.check-mark');
    const span = listItem.querySelector('span');
    checkbox.addEventListener('change', () => {
      newTask.completed = checkbox.checked;
      span.style.textDecoration = newTask.completed ? 'line-through' : 'none';
      // Оновлюємо LocalStorage після відмітки завдання як виконаного
      localStorage.setItem(selectedList, JSON.stringify(tasks));
    });

    todoListGet.appendChild(listItem);
    inputFieldGet.value = '';
  }
});
