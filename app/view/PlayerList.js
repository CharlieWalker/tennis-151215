Ext.define('TTApp.view.PlayerList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.playerlist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        //title: 'ホーム',
        store: 'Players',
        

        itemTpl: [
                '<div class="">',
                '       {last} {first} ({team})',
                '</div>',
        ],
    }
});