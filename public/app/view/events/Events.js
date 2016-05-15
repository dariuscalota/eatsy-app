Ext.define('Eatsy.view.events.Events', {
  extend: 'Ext.container.Container',
  requires: [
    'Eatsy.view.events.EventsController',
    'Eatsy.view.events.Event',
    'Eatsy.view.events.List'
  ],
  xtype: 'events',
  controller: 'events',

  layout: {
    type: 'border'
  },
  items: [
    {
      xtype: 'events-list',
      region: 'west',
      html: '<h3>Title n stuff</h3>',
      flex: 3,
      split: true,
      collapsible: true
    },
    {
      region: 'center',
      xtype: 'event',
      flex:7
    }
  ]
});
