Ext.define('Eatsy.store.Comments', {
	extend: 'Ext.data.Store',
	alias: 'store.comments',

	requires: [
		'Eatsy.model.Comment',
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
			  url: Eatsy.util.Config.getApiUrl() +'comments',
				reader: {
					rootProperty: 'comments',
					type: 'json'
				},
				writer: {
					type: 'json'
				}
			},
			autoLoad: false,
			storeId: 'Comments',
			model: 'Eatsy.model.Comment'
		}, cfg)]);
	}
});
