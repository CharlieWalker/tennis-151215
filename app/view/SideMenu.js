Ext.define('TTApp.view.SideMenu', {
    extend: 'Ext.Menu',

    config: {
        defaults:{
            iconCls: 'star'
        },
        items: [
            {
                text: 'back',
                iconCls: 'home',
                scope: this,
                handler: function() {
                    Ext.Viewport.hideMenu('left');
                }
            },
            {
                text: '試合(ホーム)',
            },
            {
                text: '大会',
            },
            {
                text: 'カテゴリ',
            },
            {
                text: 'ラウンド',
            },
            {
                text: 'チーム',
            },
            {
                text: '選手',
            }
        ],
    }
});