Ext.define('Eatsy.store.Events', {
	extend: 'Ext.data.Store',
	alias: 'store.events',

	requires: [
		'Eatsy.model.Event',
		'Eatsy.util.Config'
	],

	constructor: function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			proxy: {
				pageParam: false,
				startParam: false,
    		limitParam: false,
				type: 'rest',
			  url: Eatsy.util.Config.getApiUrl() +'events',
				reader: {
					type: 'json'
				},
				writer: {
					type: 'json'
				}
			},
			autoLoad: false,
			storeId: 'Events',
			model: 'Eatsy.model.Event'
		}, cfg)]);
	}
});
