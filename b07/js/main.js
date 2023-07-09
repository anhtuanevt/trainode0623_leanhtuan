ELEMENT_ADD_TASK_BTN.addEventListener('click', function () {
    handleToggleForm(!open_form);
    focusOnTextBox()
})


ELEMENT_SUBMIT.addEventListener('click', function() {
    if (!isUpdate) {
        handleAddNewList()
    }
    isUpdate = false;
})
    
ELEMENT_CANCEL_FROM.addEventListener('click', () => cleanForm())

const handleDelete = (id) => {
    showConfirmModal('Confirmation', 'Are you sure you want to delete this item?', function (result) {
        if (result) {
            data = data.filter((item) => {
                return item.id != id;
            })
            saveLocalStorage(data)
            showData(data)
        } 
    })
}

const handleEdit = (id) => {
    let item = data.find(item => item.id == id);
    handleToggleForm(true);
    ELEMENT_TASK_NAME.value = item.name;
    ELEMENT_LEVEL.value = item.level;
    focusOnTextBox()
    handelUpdate(id)
    isUpdate = true;
}

ELEMENT_GO_BTN.addEventListener('click', () => {
    data = getLocalStorage();
    let value = ELEMENT_SEARCH_TXT.value;
    let newData = handleSearchItem(data, value).length ? handleSearchItem(data, value): [];
    showData(newData);
})

const handleSorting = (label) => {
    ELEMENT_DROPDOWN_LABEL.textContent = label;
    let newData = sortByName(label);
    showData(newData);
}

data = getLocalStorage();
showData(data)