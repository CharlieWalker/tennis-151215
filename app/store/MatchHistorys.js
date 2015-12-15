Ext.define('TTApp.store.MatchHistorys', {
    extend: 'Ext.data.Store',

    requires: [
        'TTApp.model.Match',
        'Ext.util.Sorter'
    ],

    config: {
        autoSync: true,
        autoLoad: true,
        model: 'TTApp.model.MatchH',
        storeId: 'MatchHistorys',
    },

    setOnly: function(data){
        this.removeAll();
        this.add(data);
        return true;
    }
});



/*
    
    matchHStore.add(
        {}
    );
    matchHStore.sync();
*/