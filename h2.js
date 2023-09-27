const dynamicHeading = document.getElementById('dynamic-heading');

listName.addEventListener('change', function () {
    const selectedOption = listName.options[listName.selectedIndex];

    dynamicHeading.textContent = selectedOption.textContent;
});
