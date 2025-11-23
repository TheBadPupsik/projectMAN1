const arr = JSON.parse(localStorage.getItem('arrLS'));
const searchValue = parseInt(localStorage.getItem('searchValue'));
let yourArr = document.getElementById("numbers");
let sortArr = document.getElementById("numbersSorted");

function PrintYourArr() {
    yourArr.style.display = "block";
    let output = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === searchValue) {
            output += `<span style="color: red; font-weight: bold;">${arr[i]}</span>`;
        } else {
            output += arr[i];
        }

        if (i < arr.length - 1) {
            output += ", ";
        }
    }
    yourArr.innerHTML = output;
}

function PrintYourSortedArr() {
    sortArr.style.display = "block";
    let output = "";
    const sortedArr = [...arr].sort((a, b) => a - b);
    for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] === searchValue) {
            output += `<span style="color: red; font-weight: bold;">${sortedArr[i]}</span>`;
        } else {
            output += sortedArr[i];
        }

        if (i < sortedArr.length - 1) {
            output += ", ";
        }
    }
    sortArr.innerHTML = output;
}

function LinearSearch(arr, searchValue) {
    let start = performance.now();
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
        iterations++;
        if (arr[i] === searchValue) {
            let end = performance.now();
            let time = end - start;
            return {
                index: i,
                time: time,
                iterations: iterations
            };
        }
    }
    let end = performance.now();
    let time = end - start;
    return {
        index: -1,
        time: time,
        iterations: arr.length
    };
}
function BinarySearch(arr, searchValue) {
    let start = performance.now();
    let iterations = 0;
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        iterations++;
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === searchValue) {
            let end = performance.now();
            let time = end - start;
            return {
                index: mid,
                time: time,
                iterations: iterations
            };
        } else if (arr[mid] < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    let end = performance.now();
    let time = end - start;
    return {
        index: -1,
        time: time,
        iterations: arr.length
    };
}

function measureSearchTime(searchFunc, arr, searchValue, runs = 10000) {
    let totalTime = 0;
    let result;
    
    for (let i = 0; i < runs; i++) {
        const start = performance.now();
        result = searchFunc(arr, searchValue);
        const end = performance.now();
        totalTime += (end - start);
    }
    
    const avgTime = totalTime / runs;
    
    return {
        index: result.index,
        time: avgTime,
        iterations: result.iterations
    };
}

PrintYourArr();
// const resultLinear = LinearSearch(arr, searchValue);
const sortedArr = [...arr].sort((a, b) => a - b);
PrintYourSortedArr();
// const resultBinary = BinarySearch(sortedArr, searchValue);

const resultLinear = measureSearchTime(LinearSearch, arr, searchValue);
const resultBinary = measureSearchTime(BinarySearch, sortedArr, searchValue);

const ctx = document.getElementById('iterationsChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Лінійний пошук', 'Бінарний пошук'],
        datasets: [
            {
                label: 'Кількість ітерацій',
                data: [resultLinear.iterations, resultBinary.iterations],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Кількість ітерацій'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Порівняння ітерацій'
            }
        }
    }
});

const ctx2 = document.getElementById('timeChart');

const timeLinearMicro = (resultLinear.time * 1000).toFixed(3);
const timeBinaryMicro = (resultBinary.time * 1000).toFixed(3);

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Лінійний пошук', 'Бінарний пошук'],
        datasets: [{
            label: 'Час виконання (мкс)',
            data: [timeLinearMicro, timeBinaryMicro],
            backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Час (мікросекунди)'
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Порівняння часу виконання'
            },
        }
    }
});