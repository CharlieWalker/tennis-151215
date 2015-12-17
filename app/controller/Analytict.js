Ext.define('TTApp.controller.Analytict', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            //view
            mainView: 'mainview',
            rallySingle: 'rallypanel_s',
            rallyList: 'rallylist',
            analyticTablet : 'analytictablet',
            
        },

        control: {
            analyticTablet: {
                initialize: 'onInit',
            }
        },
    },

    onInit: function() {
        this.getAnalyticTablet().getIndicator().set('top',10).set('bottom',null);
    }
});