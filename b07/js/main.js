ADD_TASK_BTN.addEventListener('click', function () {
    handleToggleForm(!open_form);
})

SUBMIT.addEventListener('click', function () {
    addNewRow();
    deleteRow()
})

deleteRow();