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

const showDropdown = (element, event) => {
    var dropdown = $(element);
    var clickedElement = event.target;

    dropdown.show();
    $(document).on("click", function (event) {
    if ((!dropdown.is(clickedElement)) || !$(".btn.btn-info").is(clickedElement)) {
    dropdown.hide();
    }
});
}


// const isSelectedCheckbox = () => {
//         $('.dropdown-item').each(() => {
//         var itemId = $(this).val();
//         console.log("Checked item ID: " + itemId);
//     });
// }


const changeStatus = () => {
    $('.dropdown-item').on('click', function () {
        selectedStatus = $(this).data('status');
        console.log('selectStatus');
    });
   
}
