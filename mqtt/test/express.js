var gName = 'World!';

// (function () {
//     if (typeof name === 'undefined') {
//         var name = 'Jack';
//         console.log('Goodbye ' + name);
//     } else {
//         console.log('Hello ' + name);
//     }
// })();


function show() {
    console.log(gName);
    if (typeof gName === 'undefined') {
        var gName = 'Jack';
        console.log('Goodbye ' + gName);
    } else {
        console.log('Hello ' + gName);
    }
}

show();
console.log(gName);