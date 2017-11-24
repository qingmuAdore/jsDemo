let str = 'Adminitor';
let lowstr = 'adminitor';
let v1 = /^adminitor$/i;
let v2 = new RegExp('^adminitor$','i');

// eval("let v3= /^" + lowstr + "r$/i;");
eval("var re = /^" + lowstr + "$/i;");  

console.log(v1.exec(str));
console.log(v2.exec(str));
console.log(re);