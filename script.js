function delay(ms) {
    return new Promise(r => setTimeout(r, ms)); 
}

function generateArray(size = 10) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
}

function renderArray(arr, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    arr.forEach(number => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${number * 2}px`; 
        bar.title = number;
        container.prepend(bar);
    });
}

// 1. Bubble Sort
async function bubbleSort(arr, containerId) {
    let start = performance.now();

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                renderArray(arr, containerId);
                await delay(500);
            }
        }
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 2. Quick Sort
async function quickSort(arr, left, right, containerId) {
    let start = performance.now();

    async function partition(arr, left, right) {
        let pivot = arr[right];
        let i = left;

        for (let j = left; j < right; j++) {
            if (arr[j] < pivot) {
                [arr[j], arr[i]] = [arr[i], arr[j]];
                i++;
                renderArray(arr, containerId);
                await delay(500);
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        renderArray(arr, containerId);
        await delay(500);
        return i;
    }

    async function quick(arr, left, right) {
        if (left < right) {
            let pi = await partition(arr, left, right);
            await quick(arr, left, pi - 1);
            await quick(arr, pi + 1, right);
        }
    }
    await quick(arr, left, right);
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 3. Heap Sort
async function heapify(arr, n, i, containerId) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        renderArray(arr, containerId);
        await delay(500);
        await heapify(arr, n, largest, containerId);
    }
}

async function heapSort(arr, containerId) {
    let start = performance.now();

    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i, containerId);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        renderArray(arr, containerId);
        await delay(500);
        await heapify(arr, i, 0, containerId);
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 4. Merge Sort
async function merge(arr, left, mid, right, containerId) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];

    renderArray(arr, containerId);
    await delay(500);
}

async function mergeSort(arr, left, right, containerId) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid, containerId);
    await mergeSort(arr, mid + 1, right, containerId);
    await merge(arr, left, mid, right, containerId);
}

// 5. Selection Sort
async function selectionSort(arr, containerId) {
    let start = performance.now();

    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        renderArray(arr, containerId);
        await delay(500);
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 6. Insertion Sort
async function insertionSort(arr, containerId) {
    let start = performance.now();

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            renderArray(arr, containerId);
            await delay(500);
        }
        arr[j + 1] = key;
        renderArray(arr, containerId);
        await delay(500);
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 7. Cocktail Shaker Sort
async function cocktailSort(arr, containerId) {
    let start = performance.now();

    let swapped = true;
    let startIdx = 0;
    let endIdx = arr.length - 1;

    while (swapped) {
        swapped = false;

        for (let i = startIdx; i < endIdx; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                renderArray(arr, containerId);
                await delay(500);
            }
        }
        if (!swapped) break;

        swapped = false;
        endIdx--;
        for (let i = endIdx; i > startIdx; i--) {
            if (arr[i] < arr[i - 1]) {
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                swapped = true;
                renderArray(arr, containerId);
                await delay(500);
            }
        }
        startIdx++;
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

// 8. Shell Sort
async function shellSort(arr, containerId) {
    let start = performance.now();

    let n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
                renderArray(arr, containerId);
                await delay(500);
            }
            arr[j] = temp;
            renderArray(arr, containerId);
            await delay(500);
        }
        gap = Math.floor(gap / 2);
    }
    let end = performance.now();

    return { time: (end - start).toFixed(2) };
}

function showExecutionTimes(results) {
    const wrapper = document.getElementById('execution-wrapper');
    wrapper.innerHTML = '';
  
    // find max time first
    const maxTime = Math.max(...results.map(r => parseFloat(r.time)));
  
    ['Bubble Sort', 'Quick Sort', 'Heap Sort', 'Merge Sort',
     'Selection Sort', 'Insertion Sort', 'Cocktail Shaker Sort', 'Shell Sort'].forEach((label, i) => {
        const time = parseFloat(results[i].time);
        const width = (time / maxTime) * 500;

        wrapper.innerHTML += `
            <div class="execution-item">
                <span class="label">${label}</span>
                <div class="bar" style="width:${width}px">
                    ${time}ms
                </div>
            </div>`;
    });
}

async function executeAll(arr) {
    let arrBubble = arr.slice();
    let arrQuick = arr.slice();
    let arrHeap = arr.slice();
    let arrMerge = arr.slice();

    let arrSelection = arr.slice();
    let arrInsertion = arr.slice();
    let arrCocktail = arr.slice();
    let arrShell = arr.slice();

    // Initial rendering
    renderArray(arrBubble, "bubble-container");
    renderArray(arrQuick, "quick-container");
    renderArray(arrHeap, "heap-container");
    renderArray(arrMerge, "merge-container");

    renderArray(arrSelection, "selection-container");
    renderArray(arrInsertion, "insertion-container");
    renderArray(arrCocktail, "cocktail-container");
    renderArray(arrShell, "shell-container");

    let results = [];

    results.push(await bubbleSort(arrBubble, "bubble-container"));
    results.push(await quickSort(arrQuick, 0, arrQuick.length - 1, "quick-container"));
    results.push(await heapSort(arrHeap, "heap-container"));
    let start = performance.now();
    await mergeSort(arrMerge, 0, arrMerge.length - 1, "merge-container");
    let end = performance.now();
    results.push({ time: (end - start).toFixed(2) });

    results.push(await selectionSort(arrSelection, "selection-container"));
    results.push(await insertionSort(arrInsertion, "insertion-container"));
    results.push(await cocktailSort(arrCocktail, "cocktail-container"));
    results.push(await shellSort(arrShell, "shell-container"));

    showExecutionTimes(results);
}

document.getElementById('shuffleBtn').addEventListener('click', () => {
    arr = generateArray(10);
    ['bubble', 'quick', 'heap', 'merge', 'selection', 'insertion', 'cocktail', 'shell'].forEach(id =>
        renderArray(arr, `${id}-container`)
    )
});

document.getElementById('sortAllBtn').addEventListener('click', () => {
    let arr = generateArray(10);
    executeAll(arr);
});

// Initial
let arr = generateArray(10);
['bubble', 'quick', 'heap', 'merge', 'selection', 'insertion', 'cocktail', 'shell'].forEach(id =>
    renderArray(arr, `${id}-container`)
);
