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

async function insertionSort(arr) {
    insertionSortVisualizer(0, "#82E0AA", "set")
    for (let i = 1; i < arr.length; i++) {
        let val = arr[i];
        let blankSpace = i;
        insertionSortVisualizer(i, "grey", "fill");
        await delay(speed*3);

        while (blankSpace > 0 && arr[blankSpace - 1] > val) {
            arr[blankSpace] = arr[blankSpace - 1];
            insertionSortVisualizer(blankSpace, "grey", "moveHole");
            blankSpace--;
            setState(arr);
            await delay(speed*2);
        }
        insertionSortVisualizer(blankSpace, "green", "fill");
        await delay(speed*2);
        arr[blankSpace] = val;
        setState(arr);
        await delay(speed*2);
        insertionSortVisualizer(i, "#82E0AA", "set");
        insertionSortVisualizer(null, null, "clearCSS");
    }
}


function insertionSortVisualizer(index, color, type){
    const states = document.querySelectorAll(".state");
    switch(type){
        case "fill":
            states[index].style.background = color;
            break;
        case "moveHole":
            states[index].style.background = "#89b0ae";
            states[index-1].style.background = color;
            break;
        case "set":
            for(let i=0; i<=index; i++){
                states[i].style.background = color;
                states[i].setAttribute("sorted" , "true");
            };
        case "clearCSS":
            states.forEach((state) => {
                if (state.getAttribute("sorted") != "true") {
                    state.style.background = "#89b0ae";
                }
            });
            break;
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        await delay(speed*2);
        selectionVisualizer(i, 'yellow', 'fill');
        for (let j = i + 1; j < arr.length; j++) {
            selectionVisualizer(j, 'red', 'passHighlight');
            await delay(speed *2);
            if (arr[j] < arr[minIndex]) {
                if(minIndex != i){
                    selectionVisualizer(minIndex , 'yellow',"removefill");
                }
                await delay(speed);
                minIndex = j;
                selectionVisualizer(minIndex, "yellow", "fill");
                await delay(speed);
            }
        }
        if (minIndex != i) {
            await delay(speed*2);
            selectionVisualizer(minIndex, 'red', 'swap');
            selectionVisualizer(i, 'red', 'swap');
            await delay(speed*2);
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
        setState(arr);
        selectionVisualizer(i, 'green', 'set');
        selectionVisualizer(null,null,"clearCSS");
    }
    selectionVisualizer(arr.length-1, "green", "set");
}

function selectionVisualizer(index , color, type){
    const states = document.querySelectorAll(".state");
    states.forEach((state) => {
        switch(type){
            case "highlight":
                let shadow = `0 0 0 2px ${color}`;
                states[index].style.boxShadow = shadow;
                break;
            case "passHighlight":
                let shadow1 = `0 0 0 2px ${color}`;
                states[index].style.boxShadow = shadow1;
                states[index-1].style.boxShadow = 'none';
                break;
            case "fill":
                states[index].style.background = color;
                break;
            case "removefill":
                states[index].style.background = "#89b0ae"; 
                break;
            case "set":
                states[index].style.background = color;
                states[index].setAttribute("sorted", "true");
                break;
            case "swap":
                states[index].style.background = color;
                break;
            case "clearCSS":
                if (state.getAttribute("sorted") != "true") {
                    state.style.background = "#89b0ae";
                    state.style.boxShadow = "none";
                }
                break;     
        }
    });
}

let inputArr = [70, 40, 90, 20, 60, 10, 50, 30, 100, 80];
setState(inputArr);
// bubbleSort(inputArr);
// selectionSort(inputArr);
insertionSort(inputArr);
// console.log(inputArr);
