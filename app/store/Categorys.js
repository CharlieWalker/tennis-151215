Ext.define('TTApp.store.Categorys', {
    extend: 'Ext.data.Store',

    config:{
        fields: ['id','category'],
        data:   [
            {id:1,  category:'男子'},
            {id:2,  category:'女子'},
            {id:3,  category:'混合'},
            {id:4,  category:'U21男子'},
            {id:5,  category:'U21女子'},
            {id:6,  category:'U21混合'},
        ]
    }
});



