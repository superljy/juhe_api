//截取蓝球
function balls(arr) {
    let newBalls = [];
    for (let i = 0; i < arr.length; i++) {
        newBalls.push(arr[i].pop());
    }
    return newBalls;
}

//二维数组降维
function reduceDimension(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            newArr.push(arr[i][j]);
        }
    }
    return newArr;
}

//找出出现最多的红球/蓝球
function findMax(arr, finalArr) {
    let hash = {};
    let maxName = null;
    let maxNum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]] = 1;
        } else {
            hash[arr[i]]++
        }
        if (hash[arr[i]] > maxNum) {
            maxName = arr[i];
            maxNum = hash[arr[i]]
        }
    }
    finalArr.push(maxName);
    maxOne(arr, maxName);
}

//每次找到最多的一个红/蓝球后 将其在数组中删除 以找出下一个最多的红/蓝球
function maxOne(arr, maxName) {
    arr.forEach(item => {
        if (item === maxName) {
            let index = arr.indexOf(item);
            arr.splice(index, 1);
        }
    });
}

module.exports = {
    balls:balls,
    reduceDimension:reduceDimension,
    findMax:findMax
}