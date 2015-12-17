Ext.define('TTApp.store.Rallys', {
    extend: 'Ext.data.Store',

    requires: [
        'TTApp.model.Rally',
        'Ext.util.Sorter'
    ],

    config: {
        grouper: {
            groupFn: function(record) {
                return record.get('round')+'ゲーム目: '+record.get('ARound')+'-'+record.get('BRound');
            }
        },

        autoLoad: true,
        autoSync: true,
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