Ext.define('TTApp.view.MainView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainview',

    requires: [
        'Ext.navigation.Bar',
        'Ext.Button',

        'TTApp.view.MatchList',
        'TTApp.view.override.MainView',
        'Ext.dataview.List'
    ],

    config: {
        itemId: 'mainView',
        navigationBar: {
            docked: 'top',
            itemId: 'navBar',
            items: [
                {
                    xtype: 'button',
                    align: 'left',
                    itemId: 'homeButton',
                    iconCls: 'home',
                    handler: function() {
                        Ext.Viewport.toggleMenu('left');
                    }
                },
                {
                    xtype: 'button',
                    align: 'right',
                    text: '試合追加',
                    itemId: 'addMatchButton',
                    //iconCls: 'add'
                },
                {
                    hidden: true,
                    xtype: 'button',
                    align: 'right',
                    text: '追加',
                    itemId: 'addRallyButton',
                },
                {
                    hidden: true,
                    xtype: 'button',
                    align: 'right',
                    text: '分析',
                    itemId: 'analyticRallyButton',
                }
            ]
        },
        items: [
            {
                xtype: 'matchlist',
                //xtype: 'rallypanel_s',
            }
        ],

        listeners:{
            show: function(){
            },

            pop: function( v, view, eOpts ){
                switch(view.xtype){
                    case "matchformpanel":
                        this.down('#addMatchButton').show();
                        this.down('#homeButton').show();
                        break;
                    case "rallylist":
                        this.down('#addMatchButton').show();
                        this.down('#homeButton').show();
                        this.down('#addRallyButton').hide();
                        this.down('#analyticRallyButton').hide();
                        break;
                    case "rallypanel_s":
                    case "rallypanel_d":
                        this.down('#addRallyButton').show();
                        this.down('#analyticRallyButton').show();
                        break;
                    case "analytictablet":
                        break;
                }

                //console.debug('pop',v, view, eOpts);
            },

            push: function( v, view, eOpts ){
                switch(view.xtype){
                    case "matchformpanel":
                        this.down('#addMatchButton').hide();
                        this.down('#homeButton').hide();
                        break;
                    case "rallylist":
                        this.down('#addRallyButton').show();
                        this.down('#analyticRallyButton').show();
                        this.down('#addMatchButton').hide();
                        this.down('#homeButton').hide();
                        Ext.ComponentQuery.query('matchactmenu')[0].hide();
                        break;
                    case "rallypanel_s":
                    case "rallypanel_d":
                        this.down('#addRallyButton').hide();
                        this.down('#analyticRallyButton').hide();
                        break;
                    case "analytictablet":
                        this.down('#addMatchButton').hide();
                        this.down('#homeButton').hide();
                        break;
                }
            },

            hide: function(){
            }
        }
    },

});