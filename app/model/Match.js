var _field = [
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
        name: 'category',   //name: 'カテゴリ',男子、女子、混合、U21
        type: 'string'
    },
    {
        name: 'gevent',   //name: '種目',シングルス(11)、ダブルス(21)、団体(12,22)
        type: 'string'
    },
    {
        name: 'round',   //name: 'ラウンド',予選、128,64,32,16,準々決勝、準決勝、決勝、
        type: 'string'
    },
    {
        name: 'gnum',   //name: 'ゲーム数',
        type: 'int'
    },
    {
        name: 'isSingle',      //是否是开局第一球
        type: 'boolean',
        defaultValue: true
    },
    {
        name: 'player11last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player11first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player11team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player11genre',
        type: 'int'
    },
    {
        name: 'player12last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12genre',
        type: 'int'
    },
    {
        name: 'player21last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player21first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player21team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player21genre',
        type: 'int'
    },
    {
        name: 'player22last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22genre',
        type: 'int'
    },
    {
        name: 'player12last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player12genre',
        type: 'int'
    },
    {
        name: 'player22last',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22first',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22team',   //name: '選手11',
        type: 'string'
    },
    {
        name: 'player22genre',
        type: 'int'
    },
    'ts'
];



Ext.define('TTApp.model.Match', {
    extend: 'Ext.data.Model',

    config: {
        identifier: 'uuid',
        
        proxy: {
            type: 'rest',
            url : 'match/',
            reader:{
                type: 'json'
            }
        },
        hasMany: {
            model: 'TTApp.model.Rally',
            name: 'rallys'
        },
        fields: _field,
        validations:[
            {type:'presence',   field:'gname',  message:'need gname'},
            {type:'presence',   field:'gdate',   message:'need year'},
            //{type:'format',     field:'gdata',   matcher:/^[1|2][0-9]{3}$/,message:'year error'},
            {type:'presence',   field:'category',   message:'need category'},
            {type:'presence',   field:'gevent',   message:'need gevent'},
            {type:'presence',   field:'round',   message:'need round'},
            {type:'presence',   field:'gnum',   message:'need gnum'},
            {type:'format',     field:'gnum',   matcher:/^[1-9][0-9]?$/,message:'gnum error'},
            
            {type:'presence',     field:'player11last',  message:'need player11last'},
            {type:'presence',     field:'player11first',  message:'need player11first'},
            {type:'presence',     field:'player11genre',   message:'need player11genre'},
            {type:'presence',     field:'player21last',  message:'need player21last'},
            {type:'presence',     field:'player21first',  message:'need player21first'},
            {type:'presence',     field:'player21genre',   message:'need player21genre'},
        ],
    },
});

Ext.define('TTApp.model.MatchValid2', {
    extend: 'Ext.data.Model',

    config: {
        fields: _field,
        validations:[
            {type:'presence',   field:'gname',  message:'need gname'},
            {type:'presence',   field:'gdate',   message:'need year'},
            //{type:'format',     field:'year',   matcher:/^[1|2][0-9]{3}$/,message:'year error'},
            {type:'presence',   field:'category',   message:'need category'},
            {type:'presence',   field:'gevent',   message:'need gevent'},
            {type:'presence',   field:'round',   message:'need round'},
            {type:'presence',   field:'gnum',   message:'need gnum'},
            {type:'format',     field:'gnum',   matcher:/^[1-9][0-9]?$/,message:'gnum error'},
            
            {type:'presence',     field:'player11last',  message:'need player11last'},
            {type:'presence',     field:'player11first',  message:'need player11first'},
            {type:'presence',     field:'player11genre',   message:'need player11genre'},
            {type:'presence',     field:'player21last',  message:'need player21last'},
            {type:'presence',     field:'player21first',  message:'need player21first'},
            {type:'presence',     field:'player21genre',   message:'need player21genre'},

            {type:'presence',     field:'player12last',  message:'need player12last'},
            {type:'presence',     field:'player12first',  message:'need player12first'},
            {type:'presence',     field:'player12genre',   message:'need player12genre'},
            {type:'presence',     field:'player22last',  message:'need player22last'},
            {type:'presence',     field:'player22first',  message:'need player22first'},
            {type:'presence',     field:'player22genre',   message:'need player22genre'},
        ]
    }
});

Ext.define('TTApp.model.MatchH', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: _field,
        proxy: {
            type: 'localstorage',
            id  : 'TT-MatchH'
        },
    }
});