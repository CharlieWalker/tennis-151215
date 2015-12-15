Ext.define('TTApp.store.Rounds', {
    extend: 'Ext.data.Store',

    config:{
        fields: ['id','round'],
        data:   [
            {id:1,  round:'予選'},
            {id:2,  round:'Round of 128'},
            {id:3,  round:'Round of 64'},
            {id:4,  round:'Round of 32'},
            {id:5,  round:'Round of 16'},
            {id:6,  round:'準々決勝'},
            {id:7,  round:'準決勝'},
            {id:8,  round:'決勝'}
        ]
    }
});