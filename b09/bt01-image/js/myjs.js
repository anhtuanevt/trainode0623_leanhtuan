$(document).ready(function () {
    $(".fileInput").on("change", function (e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
            $('.previewImage').attr('src', e.target.result);
            }
    reader.readAsDataURL(file);
    });
});