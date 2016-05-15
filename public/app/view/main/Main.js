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
      height: 90,
      padding: '0 0 5 5',
      id: 'mainHeader',
      tpl: new Ext.XTemplate(
        '<tpl for=".">',
          '<div class="row">',
            '<div class="col-sm-5">',
              '<div class="media pull-left">',
                '<div class="thumb-wrap media-left">',
                  '<img style="max-width:80px;" class="media-object" src="{picture}">',
                '</div>',
                '<div class="media-body">',
                  '<br/>',
                  '<h4 class="media-heading">Hello, {name}</h4>',
                  '<button class="btn btn-xs btn-danger" onclick="Eatsy.util.Util.logOut();" type="submit">Logout</button>',
                '</div>',
              '</div>',
            '</div>',

            '<div class="col-sm-7">',
              '<span class="pull-right"><img height="80" width="110" src="resources/images/logo-eatsy.PNG"></span>',
            '</div>',
          '</div>',
        '</tpl>'
      ),
      listeners: {
        afterrender: function() {
          this.update(JSON.parse(localStorage.user));

        }
      }
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
          html: '<h2>Profile page.</h2><hr/><i>coming soon</i>'
        },
        {
          title: 'Events',
          xtype: 'events'
        }
      ]
    }
  ]
});
