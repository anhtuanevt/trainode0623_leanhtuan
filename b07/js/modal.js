const handleToggleForm = (isOpen = false) => {
    let color = 'red'
    let text = 'Close Task'
    if (!isOpen) {
        ELEMENT_FORM_SUBMIT.style.display = 'none'
        color = '#5bc0de';
        text= 'Add Task';
    } else {
        ELEMENT_FORM_SUBMIT.style.display = 'inline'
    }
    ELEMENT_ADD_TASK_BTN.style.backgroundColor = color;
    ELEMENT_ADD_TASK_BTN.textContent = text;
    open_form = isOpen
}

const randomId = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}

const showBackgroundColor = (level) => {
    let backgroundColor = '#777'
    switch (level) {
        case 'small':
            backgroundColor = '#777';
            break;
        case 'medium':
            backgroundColor = '#5bc0de';
            break;
        case 'high':
            backgroundColor = '#d9534f';
            break;
        default:
            backgroundColor = '#777';
    }
    return backgroundColor;
}

const showData = (data) => {
    let xHtml = '';
    
    data.map((item ,index) => {
        xHtml += `<tr>
                    <td class="text-center">${index + 1}</td>
                    <td>${item.name}</td>
                    <td class="text-center"><span class="label label-danger" style="background-color: ${showBackgroundColor(item.level)}">${item.level}</span></td>
                    <td>
                        <button type="button" onclick = "handleEdit('${item.id}')" class="btn btn-warning">Edit</button>
                        <button type="button" onclick = "handleDelete('${item.id}')" class="btn btn-danger">Delete</button>
                    </td>
                </tr>`
    })
    ELEMENT_BODY.innerHTML = xHtml;
}

const cleanForm = () => {
    ELEMENT_TASK_NAME.value = '';
    ELEMENT_LEVEL.value = 'small';
    
}

const saveLocalStorage = (data) => {
    let jsonData = JSON.stringify(data);
    localStorage.setItem(KEY_LOCAL, jsonData);
}

const getLocalStorage = () => {
    let jsonData = localStorage.getItem(KEY_LOCAL) ? localStorage.getItem(KEY_LOCAL): '[]'
    return JSON.parse(jsonData)
}

const handelUpdate = (id) => {
    let isEventBound = false;
    const handelUpdate = () => {
    if (!isEventBound) {
        let name = ELEMENT_TASK_NAME.value;
        let level = ELEMENT_LEVEL.value;
        let itemIndex = data.findIndex(item => item.id == id);
        if (itemIndex !== -1) {
            data[itemIndex].name = name;
            data[itemIndex].level = level;
        }
        cleanForm();
        saveLocalStorage(data);
        showData(data);
        isEventBound = true;
    }
};
    ELEMENT_SUBMIT.addEventListener("click", handelUpdate);
}


const handleAddNewList = () => {
    let name = ELEMENT_TASK_NAME.value;
    let level = ELEMENT_LEVEL.value;
    let id = randomId();
    if (name != '') {
        data.push({ id, name, level })
    } else {
        ELEMENT_ERROR_MSG.textContent = 'Please input value';
    }
    saveLocalStorage(data);
    showData(data)
    cleanForm()
}

const focusOnTextBox = () => {
    ELEMENT_TASK_NAME.focus();
}


const showConfirmModal = (title, message, callback) => {
    confirmTitle.textContent = title;
    confirmText.textContent = message;

    confirmModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    confirmOK.onclick = function() {
    confirmModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    callback(true);
    };

    confirmCancel.onclick = function() {
    confirmModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    callback(false);
    };
}

const handleSearchItem = function(data, value) {
    let newData = data.filter(item => item.name == value)
    return newData
}

const sortByName = (sortBy) => {
    let newData = data;
    const levelOrder = { small: 1, medium: 2, high: 3 };
    switch (sortBy) {
        case 'Name ASC':
            newData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'Name DESC':
            newData.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'Level ASC':
            newData.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
            break;
        case 'Level DESC':
            newData.sort((a, b) => levelOrder[b.level] - levelOrder[a.level]);
            break;
        default: newData.sort((a, b) => a.name.localeCompare(b.name));
    }
    return newData
}




