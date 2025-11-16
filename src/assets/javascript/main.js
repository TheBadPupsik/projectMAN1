const arrLSsize = 10;
const arrLS = [];
var conclusion = document.getElementById("numbers");
var buttonLS = document.getElementById("btnLS");

function createArr() {
    arrLS.length = 0;

    for (let i = 0; i < arrLSsize; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        arrLS.push(randomNumber);
    }
};

buttonLS.addEventListener("click", function () {
    createArr();
    conclusion.innerHTML = arrLS.join(", ");
});



