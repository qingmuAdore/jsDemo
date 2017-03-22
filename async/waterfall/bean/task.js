function task(data, cb) {
    console.log('data: ' + data + '! ' + 'run task');
    setTimeout(function () {
        cb(null, 'current task');
    }, 120);
}

function done() {
    console.log(arguments[0]);
    console.log(arguments[1]);
}

//task 执行
task.apply(null, ['apply'].concat([done]));  
/**
data: apply! run task
null
current task
 */


// task.call(null, 'call', done);
/**
data: call! run task
null
current task
 */
