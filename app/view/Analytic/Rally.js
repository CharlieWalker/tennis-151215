Ext.define('TTApp.view.Analytic.Rally', {
	extend: 'Ext.Panel',
	alias: 'widget.analyticrally',

	requires: ['Ext.chart.CartesianChart', 'Ext.chart.interactions.PanZoom',
		'Ext.chart.series.Bar', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category'
	],
	config: {
		padding: 50,
		cls: 'card1',
		layout: 'fit',
		items: [{
			xtype: 'chart',
			store: 'Rallys',
			background: 'white',
			interactions: [{
				type: 'panzoom',
				axes: {
					"left": {
						allowPan: false,
						allowZoom: false
					},
					"bottom": {
						allowPan: true,
						allowZoom: true
					}
				}
			}],
			series: [{
				type: 'bar',
				xField: 'id',
                yField: 'flick',
				stacked: true,
				style: {
					stroke: 'rgb(40,40,40)'
				}
			}],
			axes: [{
				type: 'numeric',
				position: 'left',
				fields: 'id',
				//                        maximum: 5000,
				label: {
					rotate: {
						degrees: -30
					}
				}
			}, {
				type: 'category',
				position: 'bottom',
				fields: 'flick',
				visibleRange: [0, 1, 2, 3, 4, 5, 6, 7]
			}]
		}]
	},
});