Ext.define('Eatsy.store.Users', {
	extend: 'Ext.data.Store',
	alias: 'store.users',

	requires: [
		'Eatsy.model.User',
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
			  url: Eatsy.util.Config.getApiUrl() +'users',
				reader: {
					type: 'json'
				},
				writer: {
					type: 'json'
				}
			},
			autoLoad: false,
			storeId: 'Users',
			model: 'Eatsy.model.User'
		}, cfg)]);
	}
});
