let speed = 300;
const setSpeed = (time) => {
    speed = time;
    const states = document.querySelectorAll(".state");
    states.forEach((state) => {
        state.style.transitionDuration = time + "ms";
    });
};
async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            bubbleVisualizer(j, "red", "highlight");
            await delay(speed * 3);
            if (arr[j] > arr[j + 1]) {
                bubbleVisualizer(j, "red", "swap");
                await delay(speed);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                await delay(speed);
                bubbleVisualizer(j, "green", "swap");
                await delay(speed);
            }
            setState(arr, j);
            await delay(speed * 2);
        }
        bubbleVisualizer(arr.length - i - 1, "green", "set");
    }
    bubbleVisualizer(0, "green", "set");
}

function delay(delay) {
    return new Promise((resolve) => {
        let timeout = setTimeout(() => {
            resolve(2);
            clearTimeout(timeout);
        }, delay);
    });
}
// highlight swap set
const setState = (arr) => {
    const states = document.querySelectorAll(".state");
    for (let i = 0; i < arr.length; i++) {
        states[i].style.height = `${arr[i]}%`;
        states[i].setAttribute("data", arr[i]);
    }
};

const bubbleVisualizer = (index, color, type) => {
    const states = document.querySelectorAll(".state");
    states.forEach((state) => {
        if (state.getAttribute("sorted") != "true") {
            state.style.background = "#89b0ae";
            state.style.boxShadow = "none";
        }
    });
    switch (type) {
        case "highlight":
            let shadow = `0 0 0 2px ${color}`;
            states[index].style.boxShadow = shadow;
            states[index + 1].style.boxShadow = shadow;
            break;
        case "swap":
            states[index].style.background = color;
            states[index + 1].style.background = color;
            break;
        case "set":
            states[index].style.background = color;
            states[index].setAttribute("sorted", "true");
            break;
    }
};

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

let inputArr = [70, 40, 90, 20, 60, 10, 50, 30, 100, 80];
setState(inputArr);
bubbleSort(inputArr);
// console.log(inputArr);
