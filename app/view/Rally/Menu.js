//M12
Ext.define('TTApp.view.Rally.Menu', {
    extend: 'Ext.ActionSheet',
    alias: 'widget.rallyactmenu',

    config: {
        itemId: 'M12',
        fullscreem: true,

        layout: {
            type: 'hbox',
            align: 'top',
            pack: 'center',
        },
        defaults:{
            iconAlign: 'top',
            flex: 1,
        },
        items: [
            {
                itemId: 'M12_insertRallyButton',
                text: '下に插入',
                ui  : 'normal',
                iconCls:'add',
            },
            {
                itemId: 'M12_editRallyButton',
                text: '編集',
                ui:   'confirm',
                iconCls: 'compose',
            },
            {
                itemId: 'M12_removeRallyButton',
                text: '削除',
                ui  : 'decline',
                iconCls:'trash',
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


/*
var actionSheet = Ext.create('Ext.ActionSheet', {
    items: [
        {
            text: 'Delete draft',
            ui  : 'decline'
        },
        {
            text: 'Save draft'
        },
        {
            text: 'Cancel',
            ui  : 'confirm'
        }
    ]
});

Ext.Viewport.add(actionSheet);
actionSheet.show();
*/