Ext.define('TTApp.controller.MatchEdit', {
    extend: 'Ext.app.Controller',

    // stores: ['User'],Genres
    // models: ['User'],
    // views: ['Viewport', 'user.List', 'user.Edit'],

    config: {
        refs: {
            mainView: 'mainview',   //主画面
            matchList: 'matchlist', //主列表
            editPanel: 'matchformpanel',   //编辑画面
            matchActMenu :'matchactmenu',

            playerList: 'playerlist',
            geventSelect: 'matchformpanel #geventSelect',
        },

        control: {
            "matchformpanel #showPlayers": {
                tap: 'showPlayers'
            },
            "matchformpanel #showGames": {
                tap: 'showGames'
            },

            "gnamelist": {
                itemtap: 'addGnameList',
            },
            "playerlist": {
                itemtap: 'addPlayerList',
            },

            "matchformpanel #saveMatchButton": {
                tap:'save'
            },

            'geventSelect':{
                change: "onSelectChange"
            }
        }
    },

    onSelectChange: function(select,newValue,oldValue){
        var store = select.getStore();
        var panel = this.getEditPanel();
        if( !store.getAt(store.find('gevent',newValue)).get('isSingle') ){
            panel.down('#matchFormPlayer12').show();
            panel.down('#matchFormPlayer11').setTitle('ペアA選手1');
            panel.down('#matchFormPlayer22').show();
            panel.down('#matchFormPlayer21').setTitle('ペアB選手1');
        }else{
            panel.down('#matchFormPlayer12').hide();
            panel.down('#matchFormPlayer11').set('title','選手A');
            panel.down('#matchFormPlayer22').hide();
            panel.down('#matchFormPlayer21').set('title','選手B');
        }
    },

    save: function(button, e, eOpts) {
        var data = this.getEditPanel().getValues(true);
        data.ts = new Date().getTime()/1000|0;

        // Save the model's data
        var mainView = this.getMainView()
            , store = Ext.getStore('Matchs')
            , panel = this.getEditPanel()
            , record = panel.getRecord()
            ;

        var errors;
        var doubler = true;
        if( data.isSingle ){
            doubler = false;
        }

        if (record) {
            record.set(data);
            mainView.setRecord(null);
        } else {
            if( doubler ){
                errors = Ext.create('TTApp.model.MatchValid2',data).validate();
            }else{
                errors = Ext.create('TTApp.model.Match',data).validate();
            }
            
            if( !errors.isValid() ){
                var msg = [];
                Ext.each(errors.items, function(item){
                    msg.push(item.getMessage());
                });
                Ext.Msg.alert('', msg.join('<br>'), Ext.emptyFn);
                return;
            }
            store.add(data);
        }
        store.sort();
        
        if( this.getEditPanel().m_act == 'add' ){
            var storeH = Ext.getStore('MatchHistorys');
            storeH.setOnly(data);
        }
        this.getMainView().pop();

        store = Ext.getStore('Gnames');
        var c = store.find( 'gname', data.gname );
        if( c > -1 ){
            store.removeAt( c );
        }
        store.add( {
            gname:  data.gname,
            gdate:  data.gdate,
            ts:     data.ts
        } );

        var todo = [11,21];
        if( doubler ){
            todo = [11,12,21,22];
        }
        store = Ext.getStore('Players');
        Ext.each(todo, function(num){
            var c = store.findBy( function(record, v){
                if( record.get('last') == data['player'+num+'last']
                    && record.get('first') == data['player'+num+'first']
                    && record.get('team') == data['player'+num+'team']
                    && record.get('genre') == data['player'+num+'genre']
                ){
                    return true;
                }
                return false;
            });
            store.removeAt(c);
            store.add({
                last:   data['player'+num+'last'],
                first:  data['player'+num+'first'],
                team:   data['player'+num+'team'],
                genre:  data['player'+num+'genre'],
                ts:     data.ts
            });
        });
    },

    addGnameList: function(dataView, index, target, record, e, eOpts){
        this.getMainView().pop();

        this.getEditPanel().down('.textfield[name="gname"]').setValue(record.get('gname'));
        this.getEditPanel().down('.textfield[name="gdate"]').setValue(record.get('gdate'));
    },

    addPlayerList: function(dataView, index, target, record, e, eOpts){
        this.getMainView().pop();

        var m_act = this.getPlayerList().m_act;
        
        this.getEditPanel().down('.textfield[name="player'+m_act+'last"]').setValue(record.get('last'));
        this.getEditPanel().down('.textfield[name="player'+m_act+'first"]').setValue(record.get('first'));
        this.getEditPanel().down('.textfield[name="player'+m_act+'team"]').setValue(record.get('team'));
        this.getEditPanel().down('.textfield[name="player'+m_act+'genre"]').setValue(record.get('genre'));
    },

    showPlayers: function(button, e, eOpts) {
        this.getMainView().push({
            xtype: 'playerlist',
            m_act: button.player
        });
    },

    showGames: function(button, e, eOpts) {
        this.getMainView().push({
            xtype: 'gnamelist',
        });
    },



    

});