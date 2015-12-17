Ext.define('TTApp.controller.Rallys', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview', //主画面
            matchList: 'matchlist', //主列表
            editPanel: 'matchformpanel', //编辑画面
            rallyList: 'rallylist',
            rallyActMenu: 'rallyactmenu',
            matchActMenu: 'matchactmenu',
        },

        control: {
            "rallylist": {
                itemtap: 'showBottom',
            },

            "rallyactmenu #M12_removeRallyButton": {
                tap: 'remove',
            },

            "rallyactmenu #M12_editRallyButton": {
                tap: 'edit',
            },

            "rallyactmenu #M12_insertRallyButton": {
                tap: 'insertRally', //在已经的行下插入
            },

            "mainview #addRallyButton": {
                tap: 'insertRallyAll' //全部的行下插入
            },

            "mainview #analyticRallyButton": {
                tap: 'analytic' //全部的行下插入
            },
            "matchactmenu #M11_analyticButton": {
                tap: 'analytic' //全部的行下插入
            },
        }
    },

    analytic: function() {
        var record = this.getMatchList().getSelection()[0];
        navigation = this.getMainView();
        navigation.push({
            xtype: 'analytictablet',
            title: 'analytic',
            store: Ext.create('TTApp.store.Rallys', {
                filters: [{
                    property: "match_id",
                    value: record.get('id')
                }]
            }),
        });
        //this.getMatchActMenu().hide();
    },

    showBottom: function(dataView, index, target, record, e, eOpts) {
        Ext.Viewport.hideAllMenus();
        this.getRallyActMenu().show();
    },

    insertRallyAll: function() {
        var navigation = this.getMainView();
        var arr = navigation.innerItems,
            _o = arr[arr.length - 1];
        if (Ext.ComponentQuery.is(_o, 'rallypanel_s')) {
            return;
        }

        var store = this.getRallyList().getStore();
        var config = {
            'match_id': this.getRallyList().get('matchRecord').get('id'),
            'round': 1,
            'turn': 1,
            'isSingle': true,
            'ARound': 0,
            'BRound': 0,
            'APoint': 0,
            'BPoint': 0,
            'serverPlayer': 11,
            'serverTime': 1,
            'receiverPlayer': 21,
            'rule': false,
        };
        if (store.getCount() != 0) {
            var record = store.getAt(store.getCount() - 1).data;
            // if ( this.calcMatch(record.f_APoint, record.f_BPoint, record.ARound, record.BRound).matchEnd ) { ) {
            //     //比赛结束
            //     Ext.Msg.alert('', 'Match End.', Ext.emptyFn);
            //     return;
            // }
        }

        var precord = this.getMatchList().getSelection()[0];

        navigation.push({
            xtype: 'rallypanel_s',
            title: 'ラリー追加',
            precord: precord,
            //beforeConfig: config,
            rallyLast: record,
        });

        this.getRallyActMenu().hide();
    },

    edit: function() {
        var navigation = this.getMainView();
        var arr = navigation.innerItems,
            _o = arr[arr.length - 1];
        if (Ext.ComponentQuery.is(_o, 'rallypanel')) {
            return;
        }

        var record = this.getRallyList().getSelection()[0];
        if (!record) {
            return;
        }

        var precord = this.getMatchList().getSelection()[0];
        navigation.push({
            xtype: 'rallypanel_s',
            title: 'ラリー追加',
            precord: precord,
            rallyLast: record,
            edit: 'edit'
        });
        this.getRallyActMenu().hide();
    },

    insertRally: function() {
        var navigation = this.getMainView();
        var arr = navigation.innerItems,
            _o = arr[arr.length - 1];
        if (Ext.ComponentQuery.is(_o, 'rallypanel')) {
            return;
        }

        var record = this.getRallyList().getSelection()[0].data;
        if (!record) {
            return;
        }
        // if (record.matchEnd) {
        //     //比赛结束
        //     Ext.Msg.alert('', 'Match End.', Ext.emptyFn);
        //     return;
        // }

        var precord = this.getMatchList().getSelection()[0];
        navigation.push({
            xtype: 'rallypanel_s',
            title: 'ラリー追加',
            precord: precord,
            rallyLast: record,
            edit: 'add'
        });
        this.getRallyActMenu().hide();
    },

    remove: function(button, e, eOpts) {
        var me = this,
            title = '削除',
            message = 'Are you sure you want to delete this rally?';

        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {
                var matchs = Ext.getStore('Rallys');
                var list = me.getRallyList();
                var record = list.getSelection()[0];
                if (record) {
                    matchs.remove(record);
                    // var mainView = me.getMainView();
                    // mainView.refresh();
                    list.refresh();
                    x = list;
                }
            }
        });

        this.getRallyActMenu().hide();
    },


});