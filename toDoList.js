const todoList = document.getElementById('todo-list');
const inputField = document.querySelector('.to-do-items');
const addButton = document.querySelector('.plus-btn');

addButton.addEventListener('click', () => {
  const inputValue = inputField.value.trim();

  if (inputValue) {
    const listItem = document.createElement('li');
    listItem.id = "list";
    listItem.innerHTML = `
      <input class="check-mark" type="checkbox">
      <span>${inputValue}</span>
      <button class="delete-btn">-</button>
    `;

    const deleteButton = listItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      listItem.remove();
    });

     // Додаємо обробник події для checkbox
     const checkbox = listItem.querySelector('.check-mark');
     const span = listItem.querySelector('span');
     checkbox.addEventListener('change', () => {
       if (checkbox.checked) {
         span.style.textDecoration = 'line-through';
       } else {
         span.style.textDecoration = 'none';
       }
     });

    todoList.appendChild(listItem);
    inputField.value = '';
  }
});
