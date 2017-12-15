const influx = require('../bin/influx');
influx.writePoints([
    {
        measurement: 'stream',
        fields: { value: 1.23 },
        tags: { id: '1111', name: 'aaa' },
    }
]).then(() => {
    console.log('success');
});
