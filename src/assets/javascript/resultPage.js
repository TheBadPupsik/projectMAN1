const arr = JSON.parse(localStorage.getItem('arrLS'));
const searchValue = parseInt(localStorage.getItem('searchValue'));
let yourArr = document.getElementById("numbers")

function PrintYourArr() {
    yourArr.style.display = "block";
    let output = "";
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === searchValue) {
            output += `<span style="color: red; font-weight: bold;">${arr[i]}</span>`;
        } else {
            output += arr[i];
        }
        
        if(i < arr.length - 1) {
            output += ", ";
        }
    }
     yourArr.innerHTML = output;
}


function LinearSearch(arr, searchValue) {
    let start = performance.now();
    let iterations = 0;
    for (let i = 0; i < arr.length; i++) {
        iterations++;
        if (arr[i] === searchValue) {
            let end = performance.now(); //время не работает
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
PrintYourArr();
 const resultLinear = LinearSearch(arr, searchValue);
 const resultBinary = BinarySearch(arr, searchValue);
//тест график
    const ctx = document.getElementById('myChart');

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
                    text: 'Порівняння алгоритмів пошуку'
                }
            }
        }
    });

// const result = LinearSearch(arr, searchValue);
// alert(`Найдено на позиции: ${result.index}`);
// alert(`Время выполнения: ${result.time.toFixed(2)}`);
// alert(`Количество итераций: ${result.iterations}`);

// const result2 = BinarySearch(arr, searchValue);
// alert(`Найдено на позиции: ${result2.index}`);
// alert(`Время выполнения: ${result2.time.toFixed(2)}`);
// alert(`Количество итераций: ${result2.iterations}`);