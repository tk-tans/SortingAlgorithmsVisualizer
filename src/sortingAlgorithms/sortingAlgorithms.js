export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(
mainArray,
startIdx,
endIdx,
auxiliaryArray,
animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function doMerge(
mainArray,
startIdx,
middleIdx,
endIdx,
auxiliaryArray,
animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
        } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}


function swap(array, leftIndex, rightIndex, animations){
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    animations.push(["swap", leftIndex, rightIndex]);
}

function partition(array, left, right, animations) {
    var x = right;
    // console.log(x);
    var pivot = array[x], 
        i = left - 1, //left pointer
        j = left; //right pointer
    while (j <= right - 1) {
        animations.push(["comparision", j, x]);
        animations.push(["reset", j, x]);
        if (array[j] <= pivot) {
            i++;
            swap(array, i, j, animations);
        }
        j++;
    }
    swap(array, i + 1, right, animations);
    return (i + 1);
}

function quickSortHelper(array, left, right, animations) {
    var index;
    if (left < right) {
        index = partition(array, left, right, animations);  
        quickSortHelper(array, left, index - 1, animations);
        quickSortHelper(array, index + 1, right, animations);
    }
    // console.log(array);
}


