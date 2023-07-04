let arr = ["PHP",
    "Javascript",
    "Java",
    "Ruby",
    "Python",
    "Go"
]

var divElement = document.querySelector('.header');
let index = 0;
function nextText() {
    divElement.innerText = arr[index];
    console.log(arr[index]);
    index = (index + 1) % arr.length;
}

setInterval(nextText, 1000);