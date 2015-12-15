Ext.define('TTApp.view.GnameList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.gnamelist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        //title: 'ホーム',
        store: 'Gnames',
        

        itemTpl: [
                '<div class="gnamelistx">',
                '       {gname}',
                '</div>',
        ],
    }
});