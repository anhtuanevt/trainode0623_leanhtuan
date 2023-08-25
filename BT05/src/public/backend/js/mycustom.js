
const deleteItem = (link) => {
    
    let result = confirm('Bạn muốn xóa phần tử này ?')
    if (result) {
        $.get(link,
            function (data, textStatus, jqXHR) {
                if (data) {
                    window.location.reload();
                }
            },
            "JSON"
        );
    }
}

const changeStatus = (link, linkPrefix) => {
    $.ajax({
        type: "get",
        url: link,
        dataType: "json",
        success: function (response) {
            const { data, id, currentStatus } = response
            let link = `${linkPrefix}/change-status/${id}/${currentStatus}`
            if (data) {
                let parent = $(`#change-status-${id}`)
                let statusClass = 'fas fa-check'
                let classColor = 'success'

                if(currentStatus == 'inactive') {
                    statusClass ="fas fa-times"
                    classColor = 'danger'
                }

                let xhtml = `<a href="javascript:changeStatus('${link}', '${linkPrefix}')" class="rounded-circle btn btn-sm btn-${classColor}"><i class="${statusClass}"></i></a>`
                parent.html(xhtml)
                alertify.success('Thay doi status thanh cong');
            }
        }
    });
}

const deleteMulti = (linkPrefix) =>{
    let cid = [];
    let link = `${linkPrefix}/delete-multi`;
    $("input[type='checkbox'][name='cid']:checked").each(function () {
        cid.push($(this).val());
    }); 

    if (cid.length !== 0) {
        const confirmed = window.confirm("Are you sure you want to delete the selected items?");
        if (confirmed) {
            $.ajax({
            type: "POST", 
            url: link, 
            data: JSON.stringify(cid), 
            contentType: "application/json", 
            dataType: "json", 
            success: function (response) {
                console.log('success', response); 
                if(response){
                    window.location.reload()
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('error', textStatus); 
                }
            });
        }
    } else {
         window.alert("Please select items");
    }
}

const changeMultipleStatus = (linkPrefix, status) => {
    let link = `${linkPrefix}/change-multi-status/${status}`;
    let cid = [];
    $("input[type='checkbox'][name='cid']:checked").each(function () {
        cid.push($(this).val());
    }); 
    if (cid.length != 0) {
        $.ajax({
        type: "POST", 
        url: link, 
        data: { cid: JSON.stringify(cid) },
        dataType: "json", 
        success: function (response) {
            console.log('success', response); 
            if(response){
                window.location.reload()
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('error', textStatus); 
        }
    });
    } else {
         window.alert("Please select items");
    }
    
};


$(document).ready(function () {
    
    $('.changeOrdering').click(function (e) {
        e.preventDefault();
        let ordering = $(this).val();
        let id = $(this).data('id');
        let prefix = $(this).data('prefix');
        let link = `${prefix}/change-ordering/${id}/${ordering}`
        
        $.ajax({
            type: "get",
            url: link,
            dataType: "json",
            success: function (response) {
                console.log(response)
            }
        });
    });

    // ======== show / hide dropdown status ==========/
    let dropdown = $(".dropdown-menu");
    $("#change-status-drp").click(function (e) {
        e.preventDefault();
        if (dropdown.length > 0) {
            dropdown.toggle();
        }
    });

    $(document).mousedown(function (e) {
        if (!$(e.target).hasClass("btn-info") && !$(e.target).hasClass("dropdown-menu")) {
            if (!$(e.target).hasClass("dropdown-item")) {
                dropdown.hide();
            } else {
                $(".dropdown-item").click(function (e) {
                    e.preventDefault();
                    dropdown.hide
                })
            }
        }
    });

    // ======== check/uncheck check box ==========/
    $("input[type='checkbox']").change(function () {
        if ($(this).is(':checked')) {
            console.log("Checkbox is checked.");
        } else {
            console.log("Checkbox is unchecked.");
        }
    });

    
    $("#check-all").change(function () {
        let isChecked = $(this).prop("checked");
        $("input[type='checkbox'][name='cid']").prop("checked", isChecked);
    })

    // active menu
    activeMenuOnClick('#category-list', '/admin/category/status')
    activeMenuOnClick('#category-form', '/admin/category/form');
    activeMenuOnClick('#article-list', '/admin/article/status')
    activeMenuOnClick('#article-form', '/admin/article/form')

    initializeCKEditor();
})
const showAlertCustom = (message, statusCode = "success") =>{
    switch (statusCode) {
        case success:
             alertify.success(message)
            break;
        
        case warning:
             alertify.success(message)
            break;
        default:

            break;
    }
}

const activeMenuOnClick = (menu, pathUrl) => {
    let currentURL = window.location.pathname;
    if (currentURL.includes(pathUrl)) {
        $(menu).addClass('bg-primary');
        console.log('Active class added');
    }
}

function initializeCKEditor() {
    ClassicEditor
        .create(document.querySelector('#editor'))
        // .then(editor => {
        //     editor.setData('<%= item.description %>');
        // })
        .catch(error => {
            console.error(error);
        });
}
