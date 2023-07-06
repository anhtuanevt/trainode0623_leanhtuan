const handleToggleForm = (isOpen = false) => {
    let color = 'red'
    let text = 'Close Task'
    if (!isOpen) {
        FORM_SUBMIT.style.display = 'none'
        color = '#5bc0de';
        text= 'Add Task';
    } else {
        FORM_SUBMIT.style.display = 'inline'
    }
    ADD_TASK_BTN.style.backgroundColor = color;
    ADD_TASK_BTN.textContent = text;
    open_form = isOpen
}


const addNewRow = () => {
    let xhtml = '';
    let task_name = TASK_NAME.value;
    let level = LEVEL.value;
    let backgroundColor = '#777'

    task_name = task_name.trim();
    if (task_name !== '') {
        data.push([task_name, level]);
    }
    
    for (let i = 0; i < data.length; i++){
        let task_name = data[i][0];
        let level = data[i][1];

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

        xhtml += `<tr>
            <td class="text-center">${i + 1}</td>
            <td>${task_name}</td>
            <td class="text-center"><span class="label label-danger" style="background-color: ${backgroundColor}">${level}</span></td>
            <td>
                <button type="button" class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
            </td>
        </tr>`
    }
    BODY.innerHTML = xhtml;
}

const deleteRow = () => {
    let DELETE_BUTTON = document.querySelectorAll('.btn-danger');
    DELETE_BUTTON.forEach((button) => {
        button.addEventListener('click', (event) => {
            const row = event.target.closest('tr');
            row.remove();
        });
    })
}