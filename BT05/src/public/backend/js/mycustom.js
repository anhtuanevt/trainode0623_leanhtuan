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