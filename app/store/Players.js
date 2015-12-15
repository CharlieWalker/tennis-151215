Ext.define('TTApp.store.Players', {
    extend: 'Ext.data.Store',

    config:{
        identifier: 'uuid',
        autoSync: true,
        autoLoad: true,
        fields: [
            'id',
            {
                name: 'last',
                type: 'string'
            },
            {
                name: 'first',
                type: 'string',
            },
            {
                name: 'team',
                type: 'string'
            },
            {
                name: 'genre',
                type: 'int'
            },
            {
                name: 'ts',   //name: 'year',
                type: 'int',
                defaultValue: 0,
            },
        ],
        data:   [
            {
                id:1,  
                last:   'Jordon',
                first:  'Mike',
                team:   'A Team',
                genre:  0
            },
            {
                id:2,  
                last:   'JJ',
                first:  'John',
                team:   'B Team',
                genre:  1
            },
        ],
        sorters: [
            {
                property : 'ts',
                direction: 'DESC'
            }
        ]
    }
});