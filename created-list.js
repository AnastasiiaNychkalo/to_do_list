// Додаємо новий список при натисканні на кнопку "New To Do List"
const listName = document.getElementById('list_name');
const newListInput = document.getElementById('created-list__input-list');
const newListButton = document.getElementById('created-list__new-list');

newListButton.addEventListener('click', () => {
  const newListName = newListInput.value.trim();

  if (newListName) {
    const formattedListName = newListName.charAt(0).toUpperCase() + newListName.slice(1);

    const newOption = document.createElement('option');
    newOption.value = formattedListName;
    newOption.textContent = formattedListName;

    listName.appendChild(newOption);

    newListInput.value = '';

    // Створюємо новий список завдань у LocalStorage
    const newTasks = [];
    saveTasks(formattedListName, newTasks);

    // Оновлюємо список завдань для нового списку
    displayTasks(formattedListName);

    // Встановлюємо новий список як вибраний
    listName.value = formattedListName;
    localStorage.setItem('selectedList', formattedListName);
  }
});