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
            }
        }
    });
}


const changeMultiStatus = (linkPrefix, status) => {
    let link = `${linkPrefix}/multipleAction/${status}`;
    let cid = [];
    $("input[type='checkbox'][name='cid']:checked").each(function () {
        cid.push($(this).val());
    }); 

    $.ajax({
        type: "POST", 
        url: link, 
        data: JSON.stringify(cid), 
        contentType: "application/json", 
        dataType: "json", 
        success: function (response) {
            console.log('success', response); 
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('error', textStatus); 
        }
    });
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
                console.log(response);
            }
        });
    });

// ======== show / hide dropdown status ==========/
    let dropdown = $(".dropdown-menu");
    $(".btn-info").click(function (e) { 
        e.preventDefault();
        if (dropdown.length > 0) {
            dropdown.toggle();
        }
    });

    $(document).mousedown(function (e) {
        e.preventDefault();
        if (!$(e.target).hasClass("btn-info") && !$(e.target).hasClass("dropdown-menu")) {
            if(!$(e.target).hasClass("dropdown-item")){
                dropdown.hide();
            }else{
                $(".dropdown-item").click(function (e) { 
                    e.preventDefault();
                //    getListChecked();
                   dropdown.hide();
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

   
});



