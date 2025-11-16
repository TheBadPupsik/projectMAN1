const arrLSsize = 10;
const arrLS = [];
var conclusion = document.getElementById("numbers");
var buttonLS = document.getElementById("btnLS");
let successSp = document.getElementById("sucessSpan");

let btnInput = document.getElementById("btnInput");
let btnNext = document.getElementById("btnNext");
let inputContainer = document.getElementById("inputContainer");
let currentInput = document.getElementById("currentInput");
let inputLabel = document.getElementById("inputLabel");
let inputsearch = document.getElementById("inputSearchValue")

function createArr() {
    resetInput();
    inputContainer.style.display = "none";
    arrLS.length = 0;

    for (let i = 0; i < arrLSsize; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        arrLS.push(randomNumber);
    }
    successSp.innerHTML = "Масив створено!";
};

buttonLS.addEventListener("click", function () {
    createArr();
    conclusion.innerHTML = arrLS.join(", ");
    inputsearch.style.display = "flex";
});

function resetInput() {
    currentIndex = 0;
    arrLS.length = 0;
    currentInput.value = "";
    updateInputLabel();
}

function updateInputLabel() {
    const elementNumber = currentIndex + 1;
    inputLabel.textContent = `Введіть ${elementNumber}-й елемент:`;
}

btnInput.addEventListener("click", function () {
    successSp.innerHTML = "";
    inputContainer.style.display = "block";
    conclusion.style.display = "none";
    inputsearch.style.display = "none";
    resetInput();
});

btnNext.addEventListener("click", function () {
    if (currentInput.value === "") {
        alert("Будь ласка, введіть число!");
        return;
    }

    arrLS.push(currentInput.value);
    currentIndex++;

    if (currentIndex < arrLSsize) {
        currentInput.value = "";
        currentInput.focus();
        updateInputLabel();
    } else {
        inputContainer.style.display = "none";
        successSp.innerHTML = "Масив створено!";
    }
});

currentInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnNext.click();
    }
});



