$(document).ready(function() {
    play();
});

const play = () => {
    endGame = false;
    setNumber()
    randomSecretNumber(numberGame)
    numberTurn = 3;
    yourTurn(numberTurn)
    $(".guess-history").html('');
    
    $('.number').click(function () {
        if (endGame) return;
        const selectNumber = $(this).text()
        checkSecretNumber(selectNumber, number)
        $(this).addClass("active");
    })
      $("#secret-number").removeClass("secret-number-resutl");
}

const setNumber = () => {
    const numberGrid = $('.number-grid')
    numberGrid.html("")
    for (let i = 1; i <= numberGame; i++){
        const span = $('<span class="number">').text(i);
        numberGrid.append(span);
    }
}

const randomSecretNumber = (numberGame) => {
    var randomNumber = Math.floor(Math.random() * numberGame) + 1;
    $("#secret-number").html(randomNumber);
    number = randomNumber
}

const yourTurn = (turn) => {
    if (turn != 0) {
        const numberGrid = $('.number-turn')
        numberGrid.html('');
        for (let i = 1; i <= turn; i++){
        const span = $('<span>');
        numberGrid.append(span);
        }
    } else {
        showNumber()
        endGame = true;
        alert("Ban da thua cuoc")
    }
    
}

const checkSecretNumber = (selectNumber, secretNumber) => {
    console.log(selectNumber == secretNumber);
    switch (true) {
        case selectNumber > secretNumber:
            showError("greater")
            break;
        case selectNumber < secretNumber:
            showError("less")
            break;
        case selectNumber == secretNumber:
            
            showNumber()
            alert("Chuc mung ban da chon dung so bi mat")
            break;
        default:
            // console.log("ban da thang");
            
            // alert("Chuc mung ban da chon dung so bi mat")
            // break;
            break;
    }
}

const showError = (errorMsg) => {
    let msg = "";
    switch (errorMsg) {
        case "greater":
            msg = "Số của bạn dự đoán lớn hơn số bí mật"
            yourTurn(--numberTurn)
            break;
        case "less":
            msg = "Số của bạn dự đoán nhỏ hơn số bí mật"
            yourTurn(--numberTurn)
            break;
        default:
            break;
    }
    let xHtml = `<div class="history">
						<span>Sai Rồi !!!</span>
						<span>${msg}</span>
					</div>`
    $(".guess-history").append(xHtml);
}

const showNumber = () => {
    $("#secret-number").addClass("secret-number-resutl");
}