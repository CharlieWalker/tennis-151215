Ext.define('TTApp.view.Rally.ScoreBar', {
    extend: 'Ext.Picker',
    alias: 'widget.rallyscore',

    config:{
        //itemId: 'scoreBar',
        hidden: true,
        _title: null,
        slots: [{
            style: {
                'text-align': 'center',
            },
            name: 'score',
            data: [{
                text: '0',
                value: 0
            }, {
                text: '1',
                value: 1
            }, {
                text: '2',
                value: 2
            }, {
                text: '3',
                value: 3
            }, {
                text: '4',
                value: 4
            }, {
                text: '5',
                value: 5
            }, {
                text: '6',
                value: 6
            }, {
                text: '7',
                value: 7
            }, {
                text: '8',
                value: 8
            }, {
                text: '9',
                value: 9
            }, {
                text: '10',
                value: 10
            }, {
                text: '11',
                value: 11
            }, {
                text: '12',
                value: 12
            }, {
                text: '13',
                value: 13
            }, {
                text: '14',
                value: 14
            }, {
                text: '15',
                value: 15
            }, {
                text: '16',
                value: 16
            }, {
                text: '17',
                value: 17
            }, {
                text: '18',
                value: 18
            }, {
                text: '19',
                value: 19
            }, {
                text: '20',
                value: 20
            }, {
                text: '21',
                value: 21
            }, ]
        }]
    }
    });