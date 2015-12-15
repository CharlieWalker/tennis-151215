Ext.define('TTApp.view.MatchFormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.matchformpanel',
    

    requires: [
        'Ext.form.FieldSet',
        'Ext.picker.Date',
        'Ext.Button',
        'Ext.field.Number',
        'Ext.field.Select',
        'Ext.field.Spinner',
        'Ext.field.DatePicker',
    ],

    
    config: {

        scrollable: 'vertical',
        items: [
            {
                //fieldset01
                xtype: 'fieldset',
                itemId: 'matchFormField',
                id: 'matchFormField',
                defaults: {
                    labelWidth: '30%',
                    usePicker: false
                },
                items: [
                    {
                        xtype:'panel',
                        layout:{
                            type: 'hbox',
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                label: '大会名',
                                name: 'gname',
                                clearIcon: false,
                                labelWidth: '36%',
                                flex: 9,
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                ui: 'action',
                                itemId: 'showGames',
                                iconCls: 'arrow_down',
                                //ui: 'small',
                                //margin: 30,
                            },
                        ]
                    },
                    {
                        xtype: 'datepickerfield',
                        label: '年月日',
                        name: 'gdate',
                        dateFormat: 'Y/m/d',
                        itemId: 'gdatePicker',
                        picker:{
                            toolbar: {
                                items: [
                                    {
                                        xtype: 'button',
                                        text: '今日',
                                        align: 'right',
                                        handler: function() {
                                            var panel = Ext.ComponentQuery.query("matchformpanel")[0];
                                            panel.down('#gdatePicker').setValue(new Date());
                                        }
                                    }
                                ]
                            }
                        }
                        //value: new Date()
                    },
                    {
                        xtype: 'selectfield',
                        label: 'カテゴリ',
                        name: 'category',
                        valueField: 'category',
                        displayField: 'category',
                        store: 'Categorys',
                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'geventSelect',
                        label: '種目',
                        name: 'gevent',
                        valueField: 'gevent',
                        displayField: 'gevent',
                        store: 'Events',
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'isSingle',
                        value: true,
                    },
                    {
                        xtype: 'selectfield',
                        label: 'ラウンド',
                        name: 'round',
                        valueField: 'round',
                        displayField: 'round',
                        store: 'Rounds'
                    },
                    {
                        xtype: 'spinnerfield',
                        label: 'ゲーム数',
                        name: 'gnum',
                        stepValue: 2,
                        minValue: 1,
                        maxValue: 17
                    }
                ]
            },

            {
                //fieldset02
                xtype: 'fieldset',
                title: '選手A',    //ペアA選手1
                id: 'matchFormPlayer11',
                itemId: 'matchFormPlayer11',
                defaults: {
                    labelWidth: '30%',
                    usePicker: false
                },
                items: [
                    {
                        xtype:'panel',
                        layout:{
                            type: 'hbox',
                        },
                        items:[
                            {
                                name: 'player11last',
                                xtype: 'textfield',
                                label: '選手姓',
                                clearIcon: false,
                                labelWidth: '36%',
                                flex: 9,
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                ui: 'action',
                                player: 11,
                                itemId: 'showPlayers',
                                iconCls: 'arrow_down',
                            },
                        ]
                    },
                    {
                        name: 'player11first',
                        xtype: 'textfield',
                        label: '選手名',
                    },
                    {
                        name: 'player11genre',
                        xtype: 'selectfield',
                        label: '性別',
                        valueField: 'id',
                        displayField: 'genre',
                        store: 'Genres'
                    },
                    {
                        name: 'player11team',
                        xtype: 'textfield',
                        label: 'チーム名',
                    }
                ]
            },

            {
                //fieldset02
                hidden :true,
                xtype: 'fieldset',
                title: 'ペアA選手2',    //ペアA選手1
                id: 'matchFormPlayer12',
                itemId: 'matchFormPlayer12',
                defaults: {
                    labelWidth: '30%',
                    usePicker: false
                },
                items: [
                    {
                        xtype:'panel',
                        layout:{
                            type: 'hbox',
                        },
                        items:[
                            {
                                name: 'player12last',
                                xtype: 'textfield',
                                label: '選手姓',
                                clearIcon: false,
                                labelWidth: '36%',
                                flex: 9,
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                ui: 'action',
                                player: 12,
                                itemId: 'showPlayers',
                                iconCls: 'arrow_down',
                            },
                        ]
                    },
                    {
                        name: 'player12first',
                        xtype: 'textfield',
                        label: '選手名',
                    },
                    {
                        name: 'player12genre',
                        xtype: 'selectfield',
                        label: '性別',
                        valueField: 'id',
                        displayField: 'genre',
                        store: 'Genres',
                    },
                    {
                        name: 'player12team',
                        xtype: 'textfield',
                        label: 'チーム名',
                    }
                ]
            },

            {
                //fieldset02
                xtype: 'fieldset',
                title: '選手B',    //ペアA選手1
                id: 'matchFormPlayer21',
                itemId: 'matchFormPlayer21',
                defaults: {
                    labelWidth: '30%',
                    usePicker: false
                },
                items: [
                    {
                        xtype:'panel',
                        layout:{
                            type: 'hbox',
                        },
                        items:[
                            {
                                name: 'player21last',
                                xtype: 'textfield',
                                label: '選手姓',
                                clearIcon: false,
                                labelWidth: '36%',
                                flex: 9,
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                ui: 'action',
                                player: 21,
                                itemId: 'showPlayers',
                                iconCls: 'arrow_down',
                            },
                        ]
                    },
                    {
                        name: 'player21first',
                        xtype: 'textfield',
                        label: '選手名',
                    },
                    {
                        name: 'player21genre',
                        xtype: 'selectfield',
                        label: '性別',
                        valueField: 'id',
                        displayField: 'genre',
                        store: 'Genres',
                    },
                    {
                        name: 'player21team',
                        xtype: 'textfield',
                        label: 'チーム名',
                    }
                ]
            },

            {
                //fieldset02
                hidden :true,
                xtype: 'fieldset',
                title: 'ペアB選手2',    //ペアA選手1
                id: 'matchFormPlayer22',
                itemId: 'matchFormPlayer22',
                defaults: {
                    labelWidth: '30%',
                    usePicker: false
                },
                items: [
                    {
                        xtype:'panel',
                        layout:{
                            type: 'hbox',
                        },
                        items:[
                            {
                                name: 'player22last',
                                xtype: 'textfield',
                                label: '選手姓',
                                clearIcon: false,
                                labelWidth: '36%',
                                flex: 9,
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                ui: 'action',
                                player: 22,
                                itemId: 'showPlayers',
                                iconCls: 'arrow_down',
                            },
                        ]
                    },
                    {
                        name: 'player22first',
                        xtype: 'textfield',
                        label: '選手名',
                    },
                    {
                        name: 'player22genre',
                        xtype: 'selectfield',
                        label: '性別',
                        valueField: 'id',
                        displayField: 'genre',
                        store: 'Genres',
                    },

                    {
                        name: 'player22team',
                        xtype: 'textfield',
                        label: 'チーム名',
                    }
                ]
            },

            {
                xtype: 'button',
                itemId: 'saveMatchButton',
                margin: 10,
                ui: 'action',
                text: 'Save'
            }
        ]//item Ext.form.Panel
    }//config

});


