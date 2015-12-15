Ext.define('TTApp.view.RallyList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.rallylist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        id: 'RallyList',
        title: 'ラリー一覧',
        store: 'Rallys',
        grouped: true,
        matchRecord: null,

        itemTpl: [
            '<div class="rallylistx">',
            '       <tpl if="timeout">',
            '           <b>{f_APoint}-{f_BPoint}</b>, タイムアウト',
            '           <br />',
            '           <span>{[this.timeout_foul(values.actionSide,values.actionPlayer,values.isSingle)]}</span>',
            '       <tpl elseif="foul">',
            '           <b>{APoint}-{BPoint}</b> => <b>{f_APoint}-{f_BPoint}</b>, フォルト',
            '           <br />',
            '           <span>{[this.timeout_foul(values.actionSide,values.actionPlayer,values.isSingle)]}</span>',
            '       <tpl else>',
            '           <b>{APoint}-{BPoint}</b> => <b>{f_APoint}-{f_BPoint}</b>, {flick}',
            '           <br />',
            '           <span>{[this.normal(values)]}</span>',
            '       </tpl>',
            //'    <font size="-1">{gname}</font>',
            '</div>', {
                getPlayer: function(id, full) {
                    var record = Ext.getCmp('RallyList').getMatchRecord();
                    var x = {
                        last: record.get('player' + id + 'last'),
                        first: record.get('player' + id + 'first'),
                    };
                    if (full) {
                        return x.last + ' ' + x.first;
                    } else {
                        return x.last;
                    }
                },
                timeout_foul: function(side, player, isSingle) {
                    if (!isSingle) {
                        switch (player) {
                            case 11:
                                return this.getPlayer(11) + '(*), ' + this.getPlayer(12);
                                break;
                            case 21:
                                return this.getPlayer(21) + '(*), ' + this.getPlayer(22);
                                break;
                            case 12:
                                return this.getPlayer(11) + ', ' + this.getPlayer(12) + '(*)';
                                break;
                            case 22:
                                return this.getPlayer(21) + ', ' + this.getPlayer(22) + '(*)';
                                break;
                            default:
                                console.log('default', player);
                        }
                    } else {
                        return this.getPlayer(player, true) + '(*)';
                    }
                },
                normal: function(v) { //side, player, isSingle) {
                    //{serverPlayer}:{actionPlayer} R-S W-L
                    var A11 = [],
                        A12 = [],
                        B21 = [],
                        B22 = [];
                    if (v.isSingle) {
                        if (v.actionPlayer == 11) {
                            A11.push('W');
                            B21.push('L');
                        } else {
                            A11.push('L');
                            B21.push('W');
                        }
                        if (v.serverPlayer == 11) {
                            A11.push('S');
                            B21.push('R');
                        } else {
                            A11.push('R');
                            B21.push('S');
                        }
                        return this.getPlayer(11, true) + '(' + A11.join(',') + '), ' + this.getPlayer(21, true) + '(' + B21.join(',') + ')';
                    }

                    var f4 = [v.serverPlayer, v.receiverPlayer];
                    var sa = parseInt(v.serverPlayer / 10),
                        sb = v.serverPlayer % 10,
                        ra = parseInt(v.receiverPlayer / 10),
                        rb = v.receiverPlayer % 10;
                    f4.push(sa * 10 + (3 - sa));
                    f4.push(ra * 10 + (3 - rb));

                    switch (v.actionPlayer) {
                        case 11:
                            A11.push('W');
                            break;
                        case 12:
                            A12.push('W');
                            break;
                        case 21:
                            B21.push('W');
                            break;
                        case 22:
                            B22.push('W');
                            break;
                    }
                    var loser = f4[(f4.indexOf(v.actionPlayer) + 1) % 4];
                    switch (loser) {
                        case 11:
                            A11.push('L');
                            break;
                        case 12:
                            A12.push('L');
                            break;
                        case 21:
                            B21.push('L');
                            break;
                        case 22:
                            B22.push('L');
                            break;
                    }
                    switch (v.serverPlayer) {
                        case 11:
                            A11.push('S');
                            break;
                        case 12:
                            A12.push('S');
                            break;
                        case 21:
                            B21.push('S');
                            break;
                        case 22:
                            B22.push('S');
                            break;
                    }
                    switch (v.receiverPlayer) {
                        case 11:
                            A11.push('R');
                            break;
                        case 12:
                            A12.push('R');
                            break;
                        case 21:
                            B21.push('R');
                            break;
                        case 22:
                            B22.push('R');
                            break;
                    }
                    return this.getPlayer(11) + (A11.length > 0 ? '(' + A11.join(',') + ')' : '') + ', ' + this.getPlayer(12) + (A12.length > 0 ? '(' + A12.join(',') + ')' : '') + ', ' + this.getPlayer(21) + (B21.length > 0 ? '(' + B21.join(',') + ')' : '') + ', ' + this.getPlayer(22) + (B22.length > 0 ? '(' + B22.join(',') + ')' : '');
                }
            }
        ],

        /*
            mode1(A) :A1 A2
            mode2(B) :A1 A2
            R-S W-L
        */
        //names: ['AAA','BBB','CCC','DDD'],
        //model: '',
        //doubler: false

        listeners: {
            updatedata: function() {
                console.log('updatedata');
            },
            show: function() {
                console.log('show');
            },

            initialize: function() {
                console.log('initialize');
            },
            destroy: function() {
                console.log('destroy');
            },
        }
    }
});