const url = 'https://5fe9340f2e12ee0017ab4d25.mockapi.io/course'

$.get(url,
    function (data) {
        xhtml = '';
        data.map((item, index) => {
            xhtml += `<tr>
					<th scope="row" class="id">${index}</th>
					<td>${item.name}</td>
					<td>${item.price}</td>
					<td>${item.price_special}</td>
				</tr>`
        })
        $(".table-body").html(xhtml);
    },
    "json"
);

