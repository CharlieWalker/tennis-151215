Ext.define('TTApp.view.RallyPanel_s', {
    extend: 'Ext.Panel',
    alias: 'widget.rallypanel_s',
    

    requires: [
        // 'Ext.form.FieldSet',
        // 'Ext.picker.Date',
        // 'Ext.Button',
        // 'Ext.field.Number',
        // 'Ext.field.Select',
        // 'Ext.field.Spinner',
        // 'Ext.field.DatePicker',
    ],

    
    config: {
            scrollable: 'vertical',
            fullscreen: true,

            style: "background-color:green;",

            layout: {
                type: 'vbox',
                align: 'stretch',
                //pack: 'top',
            },
            items: [{
                maxWidth: 600,
                minWidth: 300,
                maxHeight: 300,
                minHeight: 150,
                
                margin: '2 10',
                border: 5,
                style: {
                    'border-color': 'black',
                    'border-style': 'solid',
                },

                layout: {
                    type: 'hbox',
                },
                defaults: {
                    style: {
                        'background-color': 'white',
                        'border-color': 'black',
                        'border-style': 'solid',
                        'text-align': 'center',
                    },
                    border: 1,
                    padding: 10,
                    xtype: 'container',
                },
                items: [{
                    flex: 3,
                    html: 'A',
                }, {
                    flex: 2,
                    iconCls: 'home',
                    //html: 'asdasda',
                }, {
                    flex: 1,
                    xtype: 'label',
                    html: '1',
                    height: '50%'
                }, {
                    flex: 1,
                    xtype: 'label',
                    html: '2',
                    height: '50%'
                }, {
                    flex: 2,
                    xtype: 'label',
                    html: '3'
                },{
                    flex: 3,
                    xtype: 'label',
                    html: 'B'
                } ]
            }, {
                flex: 3,

                defaults:{

                },
                maxWidth: 600,
                minWidth: 300,
                maxHeight: 300,
                minHeight: 150,
                
                


                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button'
                }, {
                    xtype: 'button'
                }, ]
            }, {
                flex: 1,
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button',
                    ui: 'action',
                }, {
                    xtype: 'button',
                    ui: 'action',
                }, ]
            }]
        
    }
});