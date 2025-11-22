const arrLS = [];
var conclusion = document.getElementById("numbers");
var buttonLS = document.getElementById("btnLS");
let successSp = document.getElementById("sucessSpan");

let btnInput = document.getElementById("btnInput");
let btnNext = document.getElementById("btnNext");
let inputContainer = document.getElementById("inputContainer");
let currentInput = document.getElementById("currentInput");
let inputLabel = document.getElementById("inputLabel");
let inputsearch = document.getElementById("inputSearchValue");
let arraySize = document.getElementById("arraySize");
let styleCard = document.querySelector(".cardInfomationSerach:nth-child(3)")

let currentIndex = 0;

function createArr() {
    resetInput();
    inputContainer.style.display = "none";
    arrLS.length = 0;

    const size = parseInt(arraySize.value);

    for (let i = 0; i < size; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        arrLS.push(randomNumber);
    }
    successSp.innerHTML = "Масив створено!";
    conclusion.innerHTML = arrLS.join(", ");
    conclusion.style.display = "block";
    inputsearch.style.display = "flex";

    document.getElementById("searchInput").value = "";
    styleCard.style.height = "auto";
}

buttonLS.addEventListener("click", function () {
    createArr();
});

function resetInput() {
    currentIndex = 0;
    arrLS.length = 0;
    currentInput.value = "";
    updateInputLabel();
}

arraySize.addEventListener("change", function () {
    arrLS.length = 0;
    currentIndex = 0;

    inputContainer.style.display = "none";
    conclusion.style.display = "none";
    inputsearch.style.display = "none";

    successSp.innerHTML = "";
    conclusion.innerHTML = "";
    currentInput.value = "";
    document.getElementById("searchInput").value = "";

    if (styleCard) {
        styleCard.style.height = "20%";
    }

    updateInputLabel();
});

function updateInputLabel() {
    const elementNumber = currentIndex + 1;
    inputLabel.textContent = `Введіть ${elementNumber}-й елемент:`;
    styleCard.style.height = "auto";
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

    arrLS.push(parseInt(currentInput.value));
    currentIndex++;

    const size = parseInt(arraySize.value);

    if (currentIndex < size) {
        currentInput.value = "";
        currentInput.focus();
        updateInputLabel();

    } else {
        inputContainer.style.display = "none";
        successSp.innerHTML = "Масив створено!";
        conclusion.innerHTML = arrLS.join(", ");
        conclusion.style.display = "block";
        inputsearch.style.display = "flex";
        document.getElementById("searchInput").value = "";

    }

});

currentInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnNext.click();
    }
});

document.getElementById("btnGo").addEventListener("click", function (e) {
    e.preventDefault();
    let searchValue = document.getElementById("searchInput").value;

    if (!searchValue) {
        alert("Введить значення!");
        return;
    }

    let searchNumber = parseInt(searchValue);
    if (!arrLS.includes(searchNumber)) {
        alert("Такого значення немає в масиві!");
        return;
    }

    localStorage.setItem('arrLS', JSON.stringify(arrLS));
    localStorage.setItem('searchValue', searchValue);
    window.location.href = './src/assets/pages/resultPage.html';
});