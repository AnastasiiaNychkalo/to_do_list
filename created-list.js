const newListNameInput = document.getElementById('created-list__input-list');
const addListNameBtn = document.getElementById('created-list__new-list');
const listName = document.getElementById('list_name');

addListNameBtn.addEventListener('click', function () {
    const newOptionValue = newListNameInput.value;

    if (newOptionValue.trim()) {
        const formattedValue = newOptionValue.charAt(0).toUpperCase() + newOptionValue.slice(1);

        const newOption = document.createElement('option');
        newOption.value = formattedValue;
        newOption.textContent = formattedValue;

        listName.appendChild(newOption);

        newListNameInput.value = '';
    }
});
