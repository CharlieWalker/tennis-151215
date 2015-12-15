Ext.define('TTApp.store.Gnames', {
    extend: 'Ext.data.Store',

    config:{
        identifier: 'uuid',
        autoSync: true,
        autoLoad: true, 
        fields: [
        	'id',
    	    {
		        name: 'gname',   //name: '大会名',
		        type: 'string'
		    },
		    {
		        name: 'gdate',   //name: 'year',
		        type: 'date',
		    },
            {
                name: 'ts',   //name: 'year',
                type: 'int',
                defaultValue: 0,
            },
        ],
        data:   [
            {id:1,  gname:"AAA",  gdate: "2015/12/12"},
            {id:2,  gname:"BBB",  gdate: "2015/12/13"},
            {id:3,  gname:"CCC",  gdate: "2015/12/14"}
        ],
        sorters: [
            {
                property : 'ts',
                direction: 'DESC'
            }
        ]
    }
});