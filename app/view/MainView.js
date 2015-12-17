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

            

            hide: function(){
            }
        }
    },

});