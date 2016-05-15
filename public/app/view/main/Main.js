/**
* This class is the main view for the application. It is specified in app.js as the
* "autoCreateViewport" property. That setting automatically applies the "viewport"
* plugin to promote that instance of this class to the body element.
*
* TODO - Replace this content of this view to suite the needs of your application.
*/
Ext.define('Eatsy.view.main.Main', {
  extend: 'Ext.container.Container',
  requires: [
    'Eatsy.view.main.MainController',
    'Ext.plugin.Viewport',
    'Eatsy.view.events.Events',
    'Eatsy.view.events.CreateEvent'
  ],

  plugins: [
    'viewport'
  ],

  xtype: 'app-main',

  controller: 'main',
  layout: {
    type: 'border'
  },

  items: [
    {
      xtype: 'container',
      region: 'north',
      html: '<h3>Title n stuff</h3>',
      flex: 1,
      split: true
    },
    {
      region: 'center',
      xtype: 'tabpanel',
      flex:9,
      tabBar: {
        layout: {
          pack: 'center'
        },
        border: false
      },
      defaults: {
        bodyPadding: 15
      },
      items:[
        {
          title: 'Profile',
          html: '<h2>Content appropriate for the current navigation.</h2>'
        },
        {
          title: 'Events',
          xtype: 'events'
        }
      ]
    }
  ]
});
