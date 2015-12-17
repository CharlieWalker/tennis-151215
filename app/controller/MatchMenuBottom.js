Ext.define('TTApp.controller.MatchMenuBottom', {
    extend: 'Ext.app.Controller',

    // stores: ['User'],Genres
    // models: ['User'],
    // views: ['Viewport', 'user.List', 'user.Edit'],

    config: {
        refs: {
            mainView: 'mainview', //主画面
            homeButton: 'mainview #homeButton',
            addMatchButton: 'mainview #addMatchButton',

            matchList: 'matchlist', //主列表
            editPanel: 'matchformpanel', //编辑画面
            matchActMenu: 'matchactmenu',
            editMatchButton: 'matchactmenu #editMatchButton',
            matchFormField: 'matchformpanel #matchFormField',
            matchFormPlayer11: 'matchformpanel #matchFormPlayer11',
            matchFormPlayer12: 'matchformpanel #matchFormPlayer12',
            matchFormPlayer21: 'matchformpanel #matchFormPlayer21',
            matchFormPlayer22: 'matchformpanel #matchFormPlayer22',

            deleteButton: 'matchformpanel #deleteButton'
        },

        control: {
            "matchactmenu #M11_editMatchButton": {
                tap: 'editMatch'
            },
            "matchactmenu #M11_rallyButton": {
                tap: 'rally'
            },
            
            'matchactmenu #M11_removeMatchButton': {
                tap: 'removeMatch'
            }
        }
    },

    removeMatch: function(button, e, eOpts) {
        var me = this,
            title = '削除',
            message = 'Are you sure you want to delete this match?';

        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {
                var matchs = Ext.getStore('Matchs');
                var record = me.getMatchList().getSelection()[0];
                if (record) {
                    matchs.remove(record);
                    // var mainView = me.getMainView();
                    // mainView.refresh();
                }
            }
        });

        this.getMatchActMenu().hide();
    },

    editMatch: function() {
        var menu = this.getMatchActMenu(),
            navigation = this.getMainView();

        var arr = navigation.innerItems,
            _o = arr[arr.length - 1];
        if (Ext.ComponentQuery.is(_o, 'matchformpanel')) {
            return;
        }

        menu.hide();
        var record = this.getMatchList().getSelection()[0];

        if (record) {
            //Ext.ComponentQuery.query('matchformpanel')[0].setValues({gname:123})
            // Navigate to form

            panel = navigation.push({
                xtype: 'matchformpanel',
                title: 'Edit Match',
                m_act: 'edit'
            });

            var panel = this.getEditPanel();
            panel.setRecord(record);
            //var mainView = this.getMainView();
            //mainView.setRecord(record);
        }
    },

    rally: function() {
        var me = this;
        var menu = this.getMatchActMenu(),
            navigation = this.getMainView();

        var arr = navigation.innerItems,
            _o = arr[arr.length - 1];
        if (Ext.ComponentQuery.is(_o, 'rallylist')) {
            return;
        }

        var record = this.getMatchList().getSelection()[0];
        if (record) {
            // Navigate to form
            var rallylist = navigation.push({
                xtype: 'rallylist',
                title: 'ラリー一覧',
                matchRecord: record,
                store: Ext.create('TTApp.store.Rallys', {
                    filters: [{
                        property: "match_id",
                        value: record.get('id')
                    }]
                })
            });
        }
    },

});