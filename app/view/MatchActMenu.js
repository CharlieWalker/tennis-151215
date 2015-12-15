//M11
Ext.define('TTApp.view.MatchActMenu', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.matchactmenu',

    config: {
        fullscreem: true,

        layout: {
            type: 'hbox',
            align: 'top',
            pack: 'center',
        },
        items: [
            {
                itemId: 'M11_editMatchButton',
                text: '編集',
                ui  : 'normal',
                flex: 1,
            },
            {
                itemId: 'M11_rallyButton',
                text: 'ラリー',
                ui:   'confirm',
                flex: 1,
            },
            {
                itemId: 'M11_analyticButton',
                text: '分析',
                ui  : 'action',
                flex: 1,
            },
            {
                itemId: 'M11_removeMatchButton',
                text: '削除',
                ui  : 'decline',
                flex: 1,
            },
        ],

        hideOnMaskTap: true,

        listeners:{
            initialize:function(){
                this.hide();
            }
        }
    }
});