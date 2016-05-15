Ext.define('Eatsy.model.User', {
	extend: 'Ext.data.Model',
	alias: 'model.user',

	requires: [
		'Ext.data.field.*'
	],

	fields: [
		{
			name: '_id',
			type: 'string',
			persist: false
		},
		{
			type: 'string',
			name: 'name'
		},
    {
			type: 'string',
			name: 'email'
		},
    {
			type: 'auto',
			name: 'interest'
		},
    {
			type: 'string',
			name: 'location'
		}
	]
});
