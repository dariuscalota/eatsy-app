Ext.define('Eatsy.model.Comment', {
	extend: 'Ext.data.Model',
	alias: 'model.comment',

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
			name: 'user'
		},
    {
			type: 'string',
			name: 'event'
		},
    {
			type: 'date',
			name: 'date'
		},
    {
			type: 'date',
			name: 'modified'
		},
    {
			type: 'string',
			name: 'text'
		},
    {
			type: 'int',
			name: 'status'
		}
	]
});
