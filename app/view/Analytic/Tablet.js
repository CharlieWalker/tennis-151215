Ext.define('TTApp.view.Analytic.Tablet', {
    extend: 'Ext.Carousel',
    alias: 'widget.analytictablet',

    requires: [
        'TTApp.view.Analytic.Score',
        'TTApp.view.Analytic.Full',
        'TTApp.view.Analytic.Rally',
    ],


    config: {
        items: [{
            xtype: 'analyticscore'
        }, {
            xtype: 'analyticfull'
        }, {
            xtype: 'analyticrally'
        }]
    }
});