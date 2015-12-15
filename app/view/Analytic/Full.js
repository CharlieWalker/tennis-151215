Ext.define('TTApp.view.Analytic.Full', {
    extend: 'Ext.Panel',
    alias: 'widget.analyticfull',

    requires: ['Ext.chart.PolarChart',
               'Ext.Toolbar',
               'Ext.TitleBar',
               'Ext.chart.series.Radar',
               'Ext.chart.axis.Numeric',
               'Ext.chart.axis.Category',
               'Ext.chart.interactions.Rotate',
               'Ext.Button'],
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                cls: 'charttoolbar',
                top: 0,
                right: 0,
                zIndex: 50,
                style: {
                    background: 'none'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: 'Reset',
                        handler: function () {
                            //ensure the query gets the chart for this kitchensink example
                            var chart = Ext.ComponentQuery.query('polar', this.getParent().getParent())[0];

                            //reset the rotation
                            Ext.ComponentQuery.query('series', chart)[0].setRotation(0);
                            Ext.ComponentQuery.query('axis', chart)[1].setRotation(0);
                        }
                    }
                ]
            },
            {
                xtype: 'polar',
                store: 'Rallys',
                background: 'white',
                interactions: 'rotate',
                series: [
                    {
                        type: 'radar',
                        xField: 'id',
                        yField: 'flick',
                        style: {
                            fillStyle: 'rgba(0,255,0,0.2)',
                            strokeStyle: 'rgba(0,0,0,0.8)',
                            lineWidth: 1
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'radial',
                        fields: 'flick',
                        grid: true,
                        style: {
                            estStepSize: 20
                        },
                        label: {
                            fill: 'black'
                        }
                    },
                    {
                        type: 'category',
                        position: 'angular',
                        fields: 'id',
                        grid: true,
                        style: {
                            estStepSize: 2
                        },
                        label: {
                            fill: 'black'
                        }
                    }
                ]
            }
        ]
    },
});