Ext.define('TTApp.view.Rally.ServerBar', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.rallyserver',

    config: {
        //itemId: 'playerBar',
        top: 0,
        bottom: null,
        docked: 'top',
        enter: 'top',
        exit: 'top',
        //hidden: true,
        items: [{
            label: 'サーバー:',
            usePicker: false,
            xtype: 'selectfield',
            itemId: 'server_select',
        }, {
            label: 'レシーバー:',
            usePicker: false,
            xtype: 'selectfield',
            itemId: 'receiver_select'
        }],
        hideOnMaskTap: true,
    }
});