Ext.define('TTApp.model.Rally', {
    extend: 'Ext.data.Model',

    config: {
        identifier: 'uuid',
        
        proxy: {
            type: 'rest',
            url : 'rally/',
            reader:{
                type: 'json'
            }
        },

        belongsTo: {
            model: 'TTApp.model.Match',
            name: 'match'
        },

        fields: [
            'id',
            'match_id',    //比赛ID

            //base inf
            {
                name: 'round',      //总数局数
                type: 'int',
                defaultValue: 1,
            },
            {
                name: 'turn',       //序号 并非是回合总数（有暂停的可能）
                type: 'int',
                defaultValue: 1,
            },
            {
                name: 'isSingle',       //单打
                type: 'boolean',
                defaultValue: true,
            },

            //base inf(detail)
            {
                name: 'ARound',
                type: 'int',
                defaultValue: 0,    //A方局数 !!
            },
            {
                name: 'BRound',
                type: 'int',
                defaultValue: 0,    //B方局数 !!
            },
            {
                name: 'APoint',
                type: 'int',
                defaultValue: 0,    //A方回合数 !!
            },
            {
                name: 'BPoint',
                type: 'int',
                defaultValue: 0,    //B方回合数 !!
            },

            //server info
            {
                name: 'serverPlayer',
                type: 'int',
                defaultValue: '',   //发球者!!
            },
            {
                name: 'receiverPlayer',
                type: 'int',
                defaultValue: '',  //接球者!!
            },

            //game inf
            {
                name: 'AFlick', //A方击球数
                type: 'int',
                defaultValue: 0,
            },
            {
                name: 'BFlick', //B方击球数
                type: 'int',
                defaultValue: 0,
            },
            {
                name: 'flick',  //击球总数
                type: 'int',
                defaultValue: 0,
            },

            //etc
            {
                name: 'timeout',    //暂停
                type: 'boolean',
                defaultValue: false,
            },
            {
                name: 'foul',       //犯规
                type: 'boolean',
                defaultValue: false,
            },

            //final
            {
                name: 'actionSide', //得点的方 犯规的方 叫暂停的方
                type: 'string',
                defaultValue: 'A',  
            },
            {
                name: 'actionPlayer',   //得点的方 犯规的方 叫暂停的方
                type: 'int',
                defaultValue: '',
            },
            //最终的局数和回合数
            {
                name: 'f_APoint',
                type: 'int',
                defaultValue: 0,
            },
            {
                name: 'f_BPoint',
                type: 'int',
                defaultValue: 0,
            },

            //etc2
            {
                name: 'gameStart',      //是否是开局第一球
                type: 'boolean',
                defaultValue: false
            },
            {
                name: 'gameEnd',        //是否是决胜球
                type: 'boolean',
                defaultValue: false
            },
            {
                name: 'matchStart',     //是否是一局的第一球
                type: 'boolean',
                defaultValue: false
            },
            {
                name: 'matchEnd',        //是否是一局的最后一球
                type: 'boolean',
                defaultValue: false
            },
            {
                name: 'rule',        //促进规则
                type: 'boolean',
                defaultValue: false
            },

            'ts',
        ],
    },

    getOnly: function(){
        console.log(1);
        return 'frfr';
    }
});







