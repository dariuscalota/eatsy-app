Ext.define('Eatsy.model.Event', {
	extend: 'Ext.data.Model',
	alias: 'model.event',

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
			name: 'title'
		},
    {
			type: 'string',
			name: 'description'
		},
    {
			type: 'string',
			name: 'picture'
		},
    {
      type: 'int',
      name: 'status'
    },
    {
      type: 'date',
      name: 'modified'
    },
    {
      type: 'date',
      name: 'start'
    },
    {
      type: 'date',
      name: 'end'
    },
    {
			type: 'auto',
			name: 'points'
		},
    {
			type: 'auto',
			name: 'attendees'
		},
    {
			type: 'auto',
			name: 'invites'
		},
    {
			type: 'auto',
			name: 'comments'
		},
		{
			type: 'auto',
			name: 'interests'
		}
	]
});
