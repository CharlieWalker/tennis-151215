Ext.define('TTApp.store.Matchs', {
    extend: 'Ext.data.Store',

    requires: [
        'TTApp.model.Match',
        'Ext.util.Sorter'
    ],

    config: {
        autoLoad: true,
        autoSync: true,

        model: 'TTApp.model.Match',
        storeId: 'Matchs',

        sorters: [
            {
                property : 'ts',
                direction: 'DESC'
            }
        ]

        // proxy: {
        //     type: 'rest',
        //     url : 'ci/match/',
        //     reader:{
        //         type: 'json'
        //     }
        // },
        // proxy: {
        //     type: 'ajax',
        //     url: 'matchs.json',
        //     reader: {
        //         type: 'json'
        //     }
        // },

    }
});