Ext.define('TTApp.store.Genres', {
    extend: 'Ext.data.Store',
    
    config: {
        data:   [
            {id:0,  genre:'男性'},
            {id:1,  genre:'女性'}
        ],
        fields: ['id','genre'],
        storeId: 'Genres',
    }
});


