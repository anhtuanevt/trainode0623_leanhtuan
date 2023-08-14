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

$('.changeOrdering').click(function (e) { 
    e.preventDefault();
    let val = $(this).val();
    let id = $(this).data('id');
    let prefix = $(this).data('prefix');
    let link = `${prefix}/change-ordering/${id}/${val}`
    console.log(val, id, link);
    
    $.ajax({
        type: "get",
        url: link,
        dataType: "json",
        success: function (response) {
            console.log('response');
        }
    });
});
