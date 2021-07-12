async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let flag = true;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }

            setState(arr);
            await delay(500);
        }
        if (flag) break;
    }
}
function delay(delayInms) {
    return new Promise((resolve) => {
        let timeout = setTimeout(() => {
            resolve(2);
            clearTimeout(timeout);
        }, delayInms);
    });
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let val = arr[i];
        let blankSpace = i;
        while (blankSpace > 0 && arr[blankSpace - 1] > val) {
            arr[blankSpace] = arr[blankSpace - 1];
            blankSpace--;
        }
        arr[blankSpace] = val;
    }
}
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
}

const setState = (arr) => {
    const states = document.querySelectorAll(".state");
    for (let i = 0; i < arr.length; i++) {
        states[i].style.height = `${arr[i]}%`;
        states[i].setAttribute("data", arr[i]);
    }
};

let inputArr = [50, 30, 54, 24, 66, 87, 81, 67, 68, 74];
bubbleSort(inputArr);
// console.log(inputArr);
