$(document).ready(function () {
    $(".name").on('input', function () {
        let name = $(this).val();
        let slug = generateSlug(name)
        $(".slug").val(slug)
    });

    const generateSlug = (name) => {
        let slug = name.toString()
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]+/g, '');
        return slug
    }
});