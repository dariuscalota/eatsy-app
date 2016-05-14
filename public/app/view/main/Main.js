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
    'Ext.plugin.Viewport'
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
      height: 250,
      split: true
    },
    {
      xtype: 'panel',
      region: 'west',
      html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
      width: 250,
      split: true,
      tbar: [{
        text: 'Button',
        handler: 'onClickButton'
      }]
    },{
      region: 'center',
      xtype: 'tabpanel',
      tabBar: {
        layout: {
          pack: 'center'
        },
        border: false
      },
      defaults: {
        iconAlign: 'top',
        bodyPadding: 15
      },
      items:[{
        title: 'Tab 1',
        html: '<h2>Content appropriate for the current navigation.</h2>'
      }]
    }
  ]
});
