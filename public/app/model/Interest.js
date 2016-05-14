Ext.define('Eatsy.model.Interest', {
	extend: 'Ext.data.Model',
	alias: 'model.interest',

	requires: [
		'Ext.data.field.String',
		'Ext.data.field.Integer'
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
			type: 'int',
			name: 'points'
		}
	]
});
