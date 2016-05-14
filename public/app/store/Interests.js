Ext.define('Eatsy.store.Interests', {
	extend: 'Ext.data.Store',
	alias: 'store.interests',

	requires: [
		'Eatsy.model.Interest',
		'Eatsy.util.Config'
	],

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			proxy: {
				type: 'rest',
			  url: Eatsy.util.Config.getApiUrl() +'interests',
				reader: {
					type: 'json',
					rootProperty: '_embedded.notes',
					totalProperty: 'total_items'
				},
				writer: {
					type: 'json',
					writeAllFields: true
				}
			},
			autoLoad: false,
			storeId: 'Interests',
			model: 'Eatsy.model.Interest'
		}, cfg)]);
	}
});
