const listName = document.getElementById('list_name');
const newListInput = document.getElementById('created-list__input-list');
const newListButton = document.getElementById('created-list__new-list');

// При завантаженні сторінки відтворюємо збережені значення
window.addEventListener('load', () => {
  const selectValues = JSON.parse(localStorage.getItem('selectValues')) || [];
  selectValues.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    listName.appendChild(option);
  });
});

newListButton.addEventListener('click', () => {
  const newListName = newListInput.value.trim();

  if (newListName) {
    const formattedListName = newListName.charAt(0).toUpperCase() + newListName.slice(1);

    const newOption = document.createElement('option');
    newOption.value = formattedListName;
    newOption.textContent = formattedListName;

    listName.appendChild(newOption);

    newListInput.value = '';

    // Зберігаємо новий елемент option в LocalStorage
    const selectValues = JSON.parse(localStorage.getItem('selectValues')) || [];
    selectValues.push(formattedListName);
    localStorage.setItem('selectValues', JSON.stringify(selectValues));

    // Створюємо новий список завдань у LocalStorage
    const newTasks = [];
    saveTasks(formattedListName, newTasks);

    // Оновлюємо список завдань для нового списку
    displayTasks(formattedListName);

    // Встановлюємо новий список як вибраний
    updateSelectedList(formattedListName);
  }
});
