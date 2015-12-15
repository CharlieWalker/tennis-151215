Ext.define('TTApp.store.Events', {
    extend: 'Ext.data.Store',

    config:{
        fields: ['id','gevent','isSingle'],
        data:   [
        {
            id: 1,
            gevent: 'シングルス',
            isSingle: true,
        }, {
            id: 2,
            gevent: 'ダブルス',
            isSingle: false,
        }, {
            id: 3,
            gevent: '団体シングルス',
            isSingle: true,
        }, {
            id: 4,
            gevent: '団体ダブルス',
            isSingle: false,
        }
    ]
    }
});