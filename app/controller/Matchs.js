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

            //button
            homeButton: 'mainview #homeButton',
            addMatchButton: 'mainview #addMatchButton',
            editMatchButton: 'matchactmenu #editMatchButton',
            analyticRallyButton: 'mainview #analyticRallyButton',
            addRallyButton: 'mainview #addRallyButton',
            rallyActMenu: 'rallyactmenu',


            matchFormField: 'matchformpanel #matchFormField',
            matchFormPlayer11: 'matchformpanel #matchFormPlayer11',
            matchFormPlayer12: 'matchformpanel #matchFormPlayer12',
            matchFormPlayer21: 'matchformpanel #matchFormPlayer21',
            matchFormPlayer22: 'matchformpanel #matchFormPlayer22',


            deleteButton: 'matchformpanel #deleteButton'
        },

        control: {
            "mainview": {
                pop: "onPop",
                push: "onPush",
            },
            

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

    //v.innerItems[v.innerItems.length-2].xtype
    //out
    onPop: function( main, view, eOpts ){
        var b = view.xtype,
            a = main.innerItems[main.innerItems.length-1].xtype;
        this._show(a);
        this._hide(b);
    },

    _show: function(xtype){
        switch( xtype ){
            case "matchlist":
                this.getHomeButton().show();
                this.getAddMatchButton().show();
                break;

            case "matchformpanel":
                break;

            case "rallylist":
                this.getAnalyticRallyButton().show();
                this.getAddRallyButton().show();
                break;

            case "rallypanel_s":
                break;

            case "analytictablet":
                break;
        }
    },

    _hide: function(xtype){
        switch(xtype){
            case "matchlist":
                this.getHomeButton().hide();
                this.getAddMatchButton().hide();
                this.getMatchActMenu().hide();
                break;

            case "matchformpanel":
                break;

            case "rallylist":
                this.getAnalyticRallyButton().hide();
                this.getAddRallyButton().hide();
                this.getRallyActMenu().hide()
                break;

            case "rallypanel_s":
                break;

            case "analytictablet":
                break;
        }
    },

    onPush: function( main, view, eOpts ){
        var b = view.xtype,
            a = main.innerItems[main.innerItems.length-2].xtype;
        this._show(b);
        this._hide(a);
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