Ext.define('TTApp.store.Rallys', {
    extend: 'Ext.data.Store',

    requires: [
        'TTApp.model.Rally',
        'Ext.util.Sorter'
    ],

    config: {
        sorters: 'round',

        grouper: {
            groupFn: function(record) {
                return record.get('round')+'ゲーム目: '+record.get('ARound')+'-'+record.get('BRound');
            }
        },

        autoLoad: true,
        proxy: {
            type: 'ajax',
            url : 'rallys.json',
            reader:{
                type: 'json'
            }
        },
        model: 'TTApp.model.Rally',
        storeId: 'Rallys',
        sorters: [
            {
                property : 'round',
                direction: 'ASC'
            },
            {
                property : 'turn',
                direction: 'ASC'
            },
            {
                property : 'id',
                direction: 'ASC'
            }
        ]
    }
});