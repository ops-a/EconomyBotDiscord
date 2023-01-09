const a = [1, 2, 3, 4]

const changeArr = (arr) => {
    arr.pop();
}

console.log("a: ", a);
changeArr(a)
console.log("a: ", a);