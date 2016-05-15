Ext.define('Eatsy.view.events.Events', {
  extend: 'Ext.container.Container',
  requires: [
    'Eatsy.view.events.EventsController',
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
      xtype: 'tabpanel',
      flex:7,
      defaults: {
        bodyPadding: 15,
        scrollable: true,
        closable: true,
        border: false
      },
      items:[
        {
          title: 'Event1',
          html: '<h2>Content appropriate for the current navigation.</h2>'
        },
        {
          title: 'Event2',
          html: '<h2>Content appropriate for the current navigation.</h2>'
        }
      ]
    }
  ]
});
