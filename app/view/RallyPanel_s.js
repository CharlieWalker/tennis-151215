Ext.define('TTApp.view.RallyPanel_s', {
    extend: 'Ext.Panel',
    alias: 'widget.rallypanel_s',

    requires: [
        'Ext.Label',
        'Ext.picker.Date',
        'Ext.Button',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.Spinner',
        'Ext.field.DatePicker',
        'Ext.field.Hidden',
    ],



    config: {
        scrollable: 'vertical',
        minWidth: 300,

        style: "background-color:grey;",

        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'top',
        },

        items: [{
            itemId: 'playerLabel',
            margin: '5 10',
            padding: 3,
            border: 1,

            listeners: [{
                element: 'element',
                event: 'tap',
                fn: function() {
                    Ext.ComponentQuery.query('rallypanel_s')[0].down('#playerBar').show();
                }
            }],

            layout: {
                type: 'hbox',
                pack: 'center',
            },

            items: [{
                layout: {
                    type: 'vbox',
                },
                width: '40%',
                defaults:{
                    xtype: 'label',
                    playername: null,
                    style: {
                        "border-color": "black",
                        "border-style": "solid",
                        "text-align": "center",
                        'background-color': 'white',
                    }
                },
                items: [{
                    border: 1,
                    itemId: 'player11',
                    
                },{
                    border: '0 1 1',
                    itemId: 'player12',
                }]
            }, {
                border: 0,
                width: '6%'
            }, {
                layout: {
                    type: 'vbox',
                },
                width: '40%',
                defaults:{
                    xtype: 'label',
                    playername: null,
                    border: 1,
                    style: {
                        "border-color": "black",
                        "border-style": "solid",
                        "text-align": "center",
                        'background-color': 'white',
                    }
                },
                items: [{
                    border: 1,
                    itemId: 'player21',
                    
                },{
                    border: '0 1 1',
                    itemId: 'player22',
                }]
            }]
        }, {
            itemId: 'scorePart',
            border: 0,
            height: 120,
            margin: '0 10',
            //border: 5,
            style: {
                'border-color': 'black',
                'border-style': 'solid',
                //'background-color': 'white',
            },

            layout: {
                type: 'hbox',
                align: 'top',
                pack: 'justify',
            },
            items: [{
                flex: 1,
                xtype: 'label',
                html: '12',
                height: '100%',
                padding: "25 0 0",
                border: 6,
                style: {
                    'border-color': 'black',
                    'border-style': 'solid',
                    'text-align': 'center',
                    'background-color': 'white',
                    "font-size": '200%',
                    'font-weight': '900',
                },
                itemId: 'APoint',
            }, {
                border: "6 3 6 0",
                style: {
                    'border-color': 'black',
                    'border-style': 'solid',
                    'text-align': 'center',
                    'background-color': 'white',
                },
                width: 45,
                xtype: 'label',
                html: '0',
                height: '40%',
                padding: "7 0",
                itemId: 'ARound',
            }, {
                border: "6 0 6 3",
                style: {
                    'border-color': 'black',
                    'border-style': 'solid',
                    'text-align': 'center',
                    'background-color': 'white',
                },
                width: 45,
                xtype: 'label',
                html: '0',
                height: '40%',
                padding: "7 0",
                itemId: 'BRound',
            }, {
                border: 6,
                flex: 1,
                xtype: 'label',
                html: '10',
                height: '100%',
                padding: "25 0 0",
                style: {
                    'border-color': 'black',
                    'border-style': 'solid',
                    'text-align': 'center',
                    'background-color': 'white',
                    "font-size": '200%',
                    'font-weight': '900',
                },
                itemId: 'BPoint',
            }]
        }, {
            margin: '10 10',
            xtype: 'spinnerfield',
            //margin: '10 50',
            labelWidth: '50%',
            label: '得点者: ',
            name: 'flick',
            side: null,
            minValue: 0,
            stepValue: 1,
            groupButtons: false,
        }, {
            defaults: {
                height: '100%',
            },
            height: 100,
            //minHeight: 100,
            margin: '2 10',

            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                width: '49%',
                side: 'A',
            }, {
                xtype: 'spacer',
                width: '2%',
            }, {
                xtype: 'button',
                width: '49%',
                side: 'B',
            }]
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            defaults: {
                flex: 1,
            },
            items: [{
                text: 'timeout',
                itemId: 'timeoutButton',
            }, {
                text: 'フォルト',
                itemId: 'foulButton',
            }, {
                text: '促進ルール',
                itemId: 'ruleButton',
                rule: false,
            }, ],
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            defaults: {
                flex: 1,
            },
            items: [{
                text: 'リセット',
                itemId: 'resetButton',
            }, {
                text: '保存',
                itemId: 'saveButton',
            }, {
                text: '保存&次へ',
                itemId: 'saveNextButton',
            }, ],
        }, {
            hidden: true,
            items: [{
                xtype: 'selectfield',
                itemId: 'timeout_select',
                usePicker: false,
            }, {
                xtype: 'hiddenfield',
                name: 'flick',
                value: 0,
                side: null
            }]
        }],
    },

    precord: null,
    rallyLast: null,
    _lRound: [0, 0],
    _lTurn: [0, 0],

    edit: 'add',
    players: null,
    r_players: null, //use
    _server: null, //use
    _receiver: null, //use

    beforeConfig: {
        /*                  'match_id',    
                            'round',      
                            'turn',      
                            'isSingle',    
                            'ARound',
                            'BRound',
                            'APoint',
                            'BPoint',
                            'serverPlayer',
                            'serverTime',
                            'receiverPlayer',
                            'rule'*/
    },

    afterConfig: {
        /* 'AFlick', //A方击球数
         'BFlick', //B方击球数
         'flick',  //击球总数
         'timeout',    //暂停
         'foul',       //犯规
         'actionSide', //得点的方 犯规的方 叫暂停的方
         'actionPlayer',   //得点的方 犯规的方 叫暂停的方
         'f_APoint',
         'f_BPoint',
         'f_ARound',
         'f_BRound',
         'gameStart',      //是否是开局第一球
         'gameEnd',        //是否是决胜球
         'matchStart',     //是否是一局的第一球
         'matchEnd',        //是否是一局的最后一球
         'ts',*/
    },

    //single: true,



    myfunc: function() {
        alert('ok');
    },
});