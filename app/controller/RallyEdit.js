Ext.define('TTApp.controller.RallyEdit', {
    extend: 'Ext.app.Controller',


    config: {
        refs: {
            //view
            mainView: 'mainview',
            rallySingle: 'rallypanel_s',
            rallyList: 'rallylist',

            //button
            flickButton: 'rallypanel_s button[side]',
            flickButtonA: 'rallypanel_s button[side=A]',
            flickButtonB: 'rallypanel_s button[side=B]',

            //hiddenfield
            flick: 'rallypanel_s spinnerfield[name=flick]',

            //label
            APoint: 'rallypanel_s #APoint',
            BPoint: 'rallypanel_s #BPoint',
            ARound: 'rallypanel_s #ARound',
            BRound: 'rallypanel_s #BRound',

            P11Label: 'rallypanel_s #player11',
            P12Label: 'rallypanel_s #player12',
            P21Label: 'rallypanel_s #player21',
            P22Label: 'rallypanel_s #player22',

            //select
            serverSelect: 'rallypanel_s #server_select',
            receiverSelect: 'rallypanel_s #receiver_select',
            foulSelect: 'rallypanel_s #foul_select',
            timeoutSelect: 'rallypanel_s #timeout_select',

            //bar
            playerBar: 'rallypanel_s #playerBar',

            //button
            resetButton: 'rallypanel_s #resetButton',
            saveButton: 'rallypanel_s #saveButton',
            saveNextButton: 'rallypanel_s #saveNextButton',

            ruleButton: 'rallypanel_s #ruleButton',
            timeoutButton: 'rallypanel_s #timeoutButton',
            foulButton: 'rallypanel_s #foulButton',
        },

        control: {
            "ruleButton": {
                tap: 'onTapRuleButton',
            },

            "rallypanel_s button[side]": {
                tap: 'onFlick'
            },

            "rallypanel_s": {
                initialize: 'onInit',
                painted: 'onPainted',
                //show: 'onShow',

            },

            "serverSelect": {
                change: 'server_change',
            },
            "receiverSelect": {
                change: 'receiver_change'
            },

            "timeoutSelect": {
                change: 'timeout_change',
            },
            "timeoutButton": {
                tap: 'onTimeout',
            },
            "foulButton": {
                tap: 'onFoul',
            },


            "rallypanel_s #BPointar": {
                change: 'updateScore'
            },

            "resetButton": {
                tap: "onReset",
            },

            "saveButton": {
                tap: "onSave",
            },

            "saveNextButton": {
                tap: "onSaveNext"
            },

            "flick": {
                spin: "_D_updateWinner"
            },

            //activate( newActiveItem, this, oldActiveItem, eOpts )
        },
    },

    M_getPlayerName: function(ns) {
        var P = this.getRallySingle().precord;
        return P.get('player' + ns + 'last') + '' + P.get('player' + ns + 'first');
    },
    M_checkDeuce: function(a, b) {
        if (Math.max(a, b) >= 11 && Math.min(a, b) >= 10 && Math.abs(a - b) <= 1) {
            return true;
        }
        return false;
    },
    M_partner: function(n) {
        var a = parseInt(n / 10);
        var b = n % 10;
        return (a * 10) + (3 - b);
    },
    M_calcTurn: function(APoint, BPoint) {
        if (this.M_checkDeuce(APoint, BPoint)) {
            return APoint + BPoint - 10;
        } else {
            return parseInt((APoint + BPoint) / 2); //from 0
        }
    },
    M_calcSRound: function(s, r, n, isSingle) {
        n += 10000;
        /*  A-C
            D-A
            B-D
            C-B */
        var turn;
        if (isSingle) {
            turn = [r, s];
            return {
                serverPlayer: turn[(n + 1) % 2],
                receiverPlayer: turn[n % 2],
            };
        } else {
            turn = [r, s, this.M_partner(r), this.M_partner(s)];
            return {
                serverPlayer: turn[(n + 1) % 4],
                receiverPlayer: turn[n % 4]
            };
        }
    },
    M_calcSPoint: function(s, r, n, isSingle) {
        n += 10000;
        /*  A-C
            C-B
            B-D
            D-A */
        var turn;
        if (isSingle) {
            turn = [s, r];
            return {
                serverPlayer: turn[n % 2],
                receiverPlayer: turn[(n + 1) % 2]
            };
        } else {
            turn = [s, r, this.M_partner(s), this.M_partner(r)];
            return {
                serverPlayer: turn[n % 4],
                receiverPlayer: turn[(n + 1) % 4]
            };
        }
    },


    setRule: function(state) { //on off
        switch (state) {
            case 'on':
                this.getRuleButton().setUi('decline');
                this.getRuleButton().rule = true;
                break;
            case 'off':
                this.getRuleButton().setUi('normal');
                this.getRuleButton().rule = false;
                break;
            default:
        }
    },

    onTapRuleButton: function() {
        var rule = this.getRuleButton().rule;
        if (rule) {
            this.setRule('off');
        } else {
            this.setRule('on');
        }
    },

    timeout_change: function(me, newValue, oldValue, eOpts) {
        if (this.getTimeoutSelect()._type == 'foul') {
            this.foulSave(newValue);
        } else if (this.getTimeoutSelect()._type == 'timeout') {
            this.timeoutSave(newValue);
        } else {
            return;
        }

        this.initNewData();
    },

    timeoutSave: function(player) {
        if (!player) {
            return;
        }
        var d = this.getRallySingle().beforeConfig;
        d.timeout = true;
        d.actionPlayer = parseInt(player);
        if (d.actionPlayer < 20) {
            d.actionSide = 'A';
        } else {
            d.actionSide = 'B';
        }
        d.f_APoint = d.APoint;
        d.f_BPoint = d.BPoint;
        this.rallySaveFinal(d);
    },

    foulSave: function(player) {
        if (!player) {
            return;
        }
        var d = this.getRallySingle().beforeConfig;
        // 'timeout',    //暂停 todo
        // 'foul',       //犯规 todo
        d.foul = true;
        d.actionPlayer = parseInt(player);

        if (d.actionPlayer < 20) {
            d.actionSide = 'A';
            d.f_APoint = d.APoint;
            d.f_BPoint = d.BPoint + 1;
        } else {
            d.actionSide = 'B';
            d.f_APoint = d.APoint + 1;
            d.f_BPoint = d.BPoint;
        }
        this.rallySaveFinal(d);
    },

    onSave: function() {
        this.rallySave();
        this.getMainView().pop();
    },

    onSaveNext: function() {
        this.rallySave();
        this.initNewData();
    },

    rallySave: function() {
        var d = this.getRallySingle().beforeConfig;

        var f = this.getFlick().getValue();
        var side = this.getFlick().side;
        if (!side) {
            side = 'B';
        }
        var a1 = parseInt(f / 2),
            a2 = f - a1;

        d.flick = f;
        d.AFlick = a1;
        d.BFlick = a1;
        d[side + 'flick'] = a2;

        // 'timeout',    //暂停 todo
        // 'foul',       //犯规 todo

        var namelist = this.getRallySingle().r_players;
        d.actionPlayer = namelist[(f - 1 + namelist.length) % (namelist.length)].n;

        if (d.actionPlayer < 20) {
            d.actionSide = 'A';
            d.f_APoint = d.APoint + 1;
            d.f_BPoint = d.BPoint;
        } else {
            d.actionSide = 'B';
            d.f_APoint = d.APoint;
            d.f_BPoint = d.BPoint + 1;
        }

        this.rallySaveFinal(d);
    },

    rallySaveFinal: function(d) {
        d.ts = new Date().getTime() / 1000 | 0;
        d.round = d.ARound + d.BRound + 1
        d.rule = this.getRuleButton().rule;

        //server receiver
        d.serverPlayer = parseInt(this.getServerSelect().getValue());
        d.receiverPlayer = parseInt(this.getReceiverSelect().getValue());

        //gameEnd matchEnd gameStart MatchStart
        var result = this.calcMatch(d.f_APoint, d.f_BPoint, d.ARound, d.BRound);
        for (var i in result) {
            d[i] = result[i];
        }

        var store = Ext.getStore('Rallys');
        if (this.getRallySingle().edit == 'edit') {
            var record = this.getRallySingle().rallyLast;
            record.set(d);
            store.sort();
        } else {
            this.getRallySingle().rallyLast = d;
            store.add(d);
            store.sort();
        }
    },

    calcMatch: function(a, b, aR, bR) {
        var d = {};
        if (a == 0 & b == 0) {
            d.gameStart = true;
            if (aR + bR == 0) {
                d.matchStart = true;
            }
        }

        var big = a > b ? {
            p: a,
            s: 'A'
        } : {
            p: b,
            s: 'B'
        };
        var small = a > b ? {
            p: b,
            s: 'B'
        } : {
            p: a,
            s: 'A'
        };

        if (big.p >= 11 && (small.p <= 9 || (big.p - small.p >= 2))) {
            d.gameEnd = true;
            var gnum = this.getRallySingle().precord.get('gnum'),
                wnum = (gnum + 1) / 2;
            if (big.s == 'A') {
                var x = [aR + 1, bR];
            } else {
                var x = [aR, bR + 1];
            }
            if ((x[0] > x[1] && x[0] >= wnum) || (x[0] < x[1] && x[1] >= wnum)) {
                d.matchEnd = true;
            }
        }

        return d; //matchEnd gameEnd
    },

    onFlick: function(me, e, eOpts) {
        if (this.getFlick().side == me.side) {
            return;
        }

        //first time
        if (me.side == 'A') {
            this.getFlickButtonB().setDisabled(false);
            this.getFlickButtonA().setDisabled(true);
            this.getFlick().side = 'A';
        } else {
            this.getFlickButtonB().setDisabled(true);
            this.getFlickButtonA().setDisabled(false);
            this.getFlick().side = 'B';
        }

        //show[winner, flick]
        var flick = this.getFlick().getValue() + 1;
        this.getFlick().setValue(flick);
        this._D_updateWinner();
    },


    onReset: function() {
        this.getFlick().side = null;
        this.getFlickButtonB().setDisabled(false);
        this.getFlickButtonA().setDisabled(false);

        this.getFlick().setValue(0);
        this._D_updateWinner();
    },

    updateScore: function(me, value, eOpts) {
        var config = this.getRallySingle().beforeConfig;
        config[me._title] = value.score;
        this.getRallySingle().down("#" + me._title).setHtml(value.score);

        config.round = config.ARound + config.BRound + 1;
        var o = this.getRallySingle().rallyLast;
        if( o ){
            var result = this.calcServer(config, o, this.getRallySingle().precord.get('isSingle'));
            //初始化发球者
            this.getServerSelect().setValue(result.serverPlayer);
            this.getReceiverSelect().setValue(result.receiverPlayer);

            this._D_updateWinner();
        }
    },

    onTimeout: function(me, e, eOpts) {
        var bar = this.getTimeoutSelect();
        bar._type = 'timeout';
        var n = bar.getTabletPicker().down('list').getViewItems().length-1;
        bar.getTabletPicker().down('list').deselectAll();
        bar.setValue(0);
        bar.getTabletPicker().showBy(me);
    },

    onFoul: function(me, e, eOpts) {
        var bar = this.getTimeoutSelect();
        bar._type = 'foul';
        var n = bar.getTabletPicker().down('list').getViewItems().length-1;
        bar.getTabletPicker().down('list').deselectAll();
        bar.setValue(0);
        bar.getTabletPicker().showBy(me);
    },


    onInit: function() {
        var scene = this.getRallySingle();
        var me = this;
        Ext.each(scene.query('#scorePart label'), function(value) {
            var itemId = value.getItemId();
            value.element.on('tap', function() {
                var bar = scene.down('#BPointar');
                var com = scene.down('#' + itemId);
                bar._title = itemId;
                bar.setValue({
                    score: parseInt(com.getHtml())
                });
                bar.show();
            }, me);
        });

        if (!this.getRallySingle()._playerBar) {
            this.getRallySingle().add({
                xtype: 'rallyserver',
                itemId: 'playerBar'
            });
            this.getRallySingle()._playerBar = true;
        }
        if (!this.getRallySingle()._rallyscore) {
            this.getRallySingle().add({
                xtype: 'rallyscore',
                itemId: 'BPointar'
            });
            this.getRallySingle()._rallyscore = true;
        }

        var precord = this.getRallySingle().precord;
        if (precord.get('isSingle')) {
            this.getP12Label().hide();
            this.getP22Label().hide();
            var players = {
                11: {},
                21: {}
            };

        } else {
            this.getP11Label().setBorder('1 1 0');
            this.getP21Label().setBorder('1 1 0');
            var players = {
                11: {},
                12: {},
                21: {},
                22: {}
            };
        }

        var optR = [];
        for (var i in players) {
            players[i].name = this.M_getPlayerName(i);
            this._D_initPlayerLabel(i, players[i].name);
            optR.push({
                text: players[i].name,
                value: i,
            });
        }

        this.getServerSelect().setOptions(optR);
        this.getReceiverSelect().setOptions(optR);

        optR.push({
            text: '',
            value: 0
        });
        this.getTimeoutSelect().setOptions(optR);

        //面板初始化完毕
        if (scene.edit == 'edit') {
            this.initEditData();
        } else {
            this.initNewData();
        }
    },

    initEditData: function() {
        var precord = this.getRallySingle().precord,
            record = this.getRallySingle().rallyLast,
            me = this;
        var config = record.data;

        this.getRallySingle().beforeConfig = config;
        //初始化分数
        this.getAPoint().setHtml(config.APoint);
        this.getBPoint().setHtml(config.BPoint);
        this.getARound().setHtml(config.ARound);
        this.getBRound().setHtml(config.BRound);

        if (config.rule) {
            this.setRule('on');
        } else {
            this.setRule('off');
        }

        this.getSaveNextButton().disable();
        //初始化 flick
        this.getFlick().setValue(config.flick);
        this._D_updateWinner();

        //初始化发球者
        var _re = config.receiverPlayer;
        this.getServerSelect().setValue(config.serverPlayer);
        this.getReceiverSelect().setValue(_re);
    },

    initNewData: function() {
        var precord = this.getRallySingle().precord,
            record = this.getRallySingle().rallyLast,
            me = this;
        var config = {
            'match_id': this.getRallyList().get('matchRecord').get('id'),
            'round': 1,
            'turn': 1,
            'isSingle': precord.get('isSingle'),
            'ARound': 0,
            'BRound': 0,
            'APoint': 0,
            'BPoint': 0,
            'serverPlayer': 11,
            'serverTime': 1,
            'receiverPlayer': 21,
            'rule': false,

            'timeout': false,
            'foul': false,
            'gameStart': false,
            'gameEnd': false,
            'matchStart': false,
            'flick': 0,
            'AFlick': 0,
            'BFlick': 0,
        };

        if (record) {
            if (this.calcMatch(record.f_APoint, record.f_BPoint, record.ARound, record.BRound).matchEnd) {
                //比赛结束
                Ext.Msg.alert('', 'Match End.', function() {
                    me.getMainView().pop();
                });
                return;

            } else if (record.gameEnd) {
                //局结束
                if (record.f_APoint > record.f_BPoint) {
                    config.ARound = record.ARound + 1;
                    config.BRound = record.BRound;
                } else {
                    config.ARound = record.ARound;
                    config.BRound = record.BRound + 1;
                }

                config.round = config.f_ARound + config.BRound + 1;
                config.rule = record.rule;

                this.getRallySingle().r_players;

                var result = this.calcServer(config, record, record.isSingle);
                for (var i in result) {
                    config[i] = result[i];
                }

            } else {
                //正常情况
                config.round = record.ARound + record.BRound + 1;
                config.turn = record.turn + 1;
                config.ARound = record.ARound;
                config.BRound = record.BRound;
                config.APoint = record.f_APoint;
                config.BPoint = record.f_BPoint;
                config.rule = record.rule;

                var result = this.calcServer(config, record, record.isSingle);
                for (var i in result) {
                    config[i] = result[i];
                }
            }
        }

        this.getRallySingle().beforeConfig = config;
        //初始化分数
        this.getAPoint().setHtml(config.APoint);
        this.getBPoint().setHtml(config.BPoint);
        this.getARound().setHtml(config.ARound);
        this.getBRound().setHtml(config.BRound);

        if (config.rule) {
            this.setRule('on');
        } else {
            this.setRule('off');
        }

        //初始化 flick
        this.getFlick().setValue(0);
        this._D_updateWinner();

        //初始化发球者
        var rece = config.receiverPlayer;
        this.getServerSelect().setValue(config.serverPlayer);
        this.getReceiverSelect().setValue(rece);
    },

    calcServer: function(n, o, isSingle) {
        //serverPlayer receiverPlayer rule
        var r = {
            serverPlayer: 11,
            receiverPlayer: 21,
            serverTime: 1,
        };
        var a, b, c, me = this;

        //没有rule的情况下
        if (!o.rule && !n.rule) {
            n._turn = this.M_calcTurn(n.APoint, n.BPoint);
            o._turn = this.M_calcTurn(o.APoint, o.BPoint);
            a = this.M_calcSPoint(o.serverPlayer, o.receiverPlayer, -1 * o._turn, isSingle);
            a = this.M_calcSRound(a.serverPlayer, a.receiverPlayer, n.round - o.round, isSingle);
            return this.M_calcSPoint(a.serverPlayer, a.receiverPlayer, n._turn, isSingle);

            //有rule规则
            //t t ok  
        } else if (o.rule && n.rule) { //t t
            //同一局
            if (n.round == o.round) {
                n._turn = n.APoint + n.BPoint;
                o._turn = o.APoint + o.BPoint;
                return this.M_calcSPoint(o.serverPlayer, o.receiverPlayer, n._turn - o._turn, isSingle);
                //不同局
            } else {
                n._turn = n.APoint + n.BPoint;
                o._turn = this.M_calcTurn(o.APoint, o.BPoint);
                a = this.M_calcSPoint(o.serverPlayer, o.receiverPlayer, -1 * o._turn, isSingle);
                a = this.M_calcSRound(a.serverPlayer, a.receiverPlayer, n.round - o.round, isSingle);
                return this.M_calcSPoint(a.serverPlayer, a.receiverPlayer, n._turn, isSingle);
            }

            //f t ...
        } else {
            //同一局
            if (n.round == o.round) {
                return this.M_calcSPoint(o.serverPlayer, o.receiverPlayer, (n.APoint + n.BPoint - o.APoint - o.BPoint), isSingle);
                //不同局
            } else {
                n._turn = n.APoint + n.BPoint;
                o._turn = this.M_calcTurn(o.APoint, o.BPoint);
                a = this.M_calcSPoint(o.serverPlayer, o.receiverPlayer, -1 * o._turn, isSingle);
                a = this.M_calcSRound(a.serverPlayer, a.receiverPlayer, n.round - o.round, isSingle);
                return this.M_calcSPoint(a.serverPlayer, a.receiverPlayer, n._turn, isSingle);
            }
        }

        return r;
    },

    //更新Spinner标签
    _D_updateWinner: function() {
        var f = this.getFlick().getValue();
        var namelist = this.getRallySingle().r_players;
        var name = namelist[(f + 3) % (namelist.length)].name;
        this.getFlick().setLabel('得点者: ' + name);
    },

    _D_initPlayerLabel: function(n, playername) { //'server','receiver'){
        var com = this.getRallySingle().down('#player' + n);
        com.setHtml(playername);
        com.playername = playername;
    },

    _D_setPlayerLabel: function(n, position) { //'server','receiver'){
        var com = this.getRallySingle().down('#player' + n);
        switch (position) {
            case 'server':
                com.setHtml(com.playername + '(S)');
                break;
            case 'receiver':
                com.setHtml(com.playername + '(R)');
                break;
            default:
                com.setHtml(com.playername);
        }
    },

    //更新选择发球员的label
    _D_updatePlayers: function() {
        var ns = this.getServerSelect().getValue(),
            nr = this.getReceiverSelect().getValue(),
            arr = [];
        if (!nr || !ns) {
            return;
        }

        this.getRallySingle().beforeConfig.serverPlayer = ns;
        this.getRallySingle().beforeConfig.receiverPlayer = nr;

        arr.push({
            n: ns,
            name: this.M_getPlayerName(ns),
        }, {
            n: nr,
            name: this.M_getPlayerName(nr),
        });
        this._D_setPlayerLabel(arr[0].n, 'server');
        this._D_setPlayerLabel(arr[1].n, 'receiver');

        if (!this.getRallySingle().precord.get('isSingle') ) {
            arr.push({
                n: this.M_partner(ns),
                name: this.M_getPlayerName(this.M_partner(ns)),
            }, {
                n: this.M_partner(nr),
                name: this.M_getPlayerName(this.M_partner(nr)),
            });
            //update label
            this._D_setPlayerLabel(arr[2].n);
            this._D_setPlayerLabel(arr[3].n);
        }

        this.getRallySingle().r_players = arr;
        this._D_updateWinner();
    },

    server_change: function(me, newValue, oldValue, eOpts) {
        this._D_setPlayerLabel(newValue, 'server');
        var R = this.getReceiverSelect();
        if (Math.abs(newValue - R.getValue()) <= 1) {
            R.setValue(newValue > 20 ? 11 : 21);
        }
        this.getPlayerBar().hide();
        this._D_updatePlayers();
    },

    receiver_change: function(me, newValue, oldValue, eOpts) {
        this._D_setPlayerLabel(newValue, 'receiver');
        var S = this.getServerSelect();
        if (Math.abs(newValue - S.getValue()) <= 1) {
            S.setValue(newValue > 20 ? 11 : 21);
        }
        this.getPlayerBar().hide();
        this._D_updatePlayers();
    },

    onInitialize: function() {
        console.log('asdasda');
        alert('painted');
    },
    onPainted: function() {
        console.log('asdasda');
        alert('painted');
    },
    onShow: function() {
        console.log('onShow');
        alert('onShow');
    },
});