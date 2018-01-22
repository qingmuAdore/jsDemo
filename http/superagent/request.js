const superagent = require('superagent');

superagent
    // .get('http://www.beaconice.com.cn/statics/images/avatar.jpg')
    .get('http://10.10.38.212:3000/firmware?model=Intel&version=0.0.1')
    .end((err, res) => {
        res.on('data', (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
        });
        res.on('end', function () {
            
        });

        // Do something
        // res.on('readable', () => {
        // let chunk;
        // while (null !== (chunk = res.read())) {
        //     console.log(`Received ${chunk.length} bytes of data.`);
        // }
        // });

        // console.log(res);
    });