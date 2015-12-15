Ext.define('TTApp.controller.Matchs', {
    extend: 'Ext.app.Controller',

    // stores: ['User'],Genres
    // models: ['User'],
    // views: ['Viewport', 'user.List', 'user.Edit'],

    config: {
        refs: {
            mainView: 'mainview',   //主画面
            matchList: 'matchlist', //主列表
            editPanel: 'matchformpanel',   //编辑画面
            matchActMenu :'matchactmenu',

            homeButton: 'mainview #homeButton',
            addMatchButton: 'mainview #addMatchButton',

            editMatchButton: 'matchactmenu #editMatchButton',

            matchFormField: 'matchformpanel #matchFormField',
            matchFormPlayer11: 'matchformpanel #matchFormPlayer11',
            matchFormPlayer12: 'matchformpanel #matchFormPlayer12',
            matchFormPlayer21: 'matchformpanel #matchFormPlayer21',
            matchFormPlayer22: 'matchformpanel #matchFormPlayer22',

            deleteButton: 'matchformpanel #deleteButton'
        },

        control: {
            "matchlist": {
                itemtap: 'showBottom',
            },

            "matchformpanel #saveButton": {
                tap: 'save'
            },
            
            // "matchformpanel #deleteButton": {
            //     tap: 'remove'
            // },
            "mainview #addMatchButton": {
                tap: 'addMatch'
            },
        }
    },

    showBottom: function(dataView, index, target, record, e, eOpts){
        Ext.Viewport.hideAllMenus();
        this.getMatchActMenu().show();
    },

    addMatch: function(button, e, eOpts) {
        // Navigate to form
        this.getMainView().push({
            xtype: 'matchformpanel',
            title: '試合追加',
            m_act: 'add'
        });

        store = Ext.getStore('MatchHistorys');
        var record = store.first();
        if( record ){
            var field0 = this.getMatchFormField().getFieldsAsArray()
                , field11 = this.getMatchFormPlayer11().getFieldsAsArray()
                , field12 = this.getMatchFormPlayer12().getFieldsAsArray()
                , field21 = this.getMatchFormPlayer21().getFieldsAsArray()
                , field22 = this.getMatchFormPlayer22().getFieldsAsArray()
            ;

            Ext.each(field0, function(field) {
                var key = field.getName(),
                    value = record.get(key);
                field.setValue(value);
            });
            Ext.each(field11, function(field) {
                var key = field.getName(),
                    value = record.get(key);
                field.setValue(value);
            });
            Ext.each(field12, function(field) {
                var key = field.getName(),
                    value = record.get(key);
                field.setValue(value);
            });
            Ext.each(field21, function(field) {
                var key = field.getName(),
                    value = record.get(key);
                field.setValue(value);
            });
            Ext.each(field22, function(field) {
                var key = field.getName(),
                    value = record.get(key);
                field.setValue(value);
            });
        }
    },

});