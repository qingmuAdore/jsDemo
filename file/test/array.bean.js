var arr1 = [1,2,3];
var arr2 = [];

// Array.prototype.push.apply(arr2,arr1);
arr2.push(...arr1);
console.log(arr2);

arr2[0] = 4; //值更改

console.log(arr1);
console.log(arr2);