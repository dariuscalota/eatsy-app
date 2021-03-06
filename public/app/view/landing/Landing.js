Ext.define('Eatsy.view.landing.Landing', {
  extend: 'Ext.container.Container',
  xtype: 'landing',
  requires: [
    'Ext.layout.container.Fit',
    'Ext.plugin.Viewport',
    'Eatsy.view.landing.LandingController'
  ],
  controller: 'landing',
  plugins: [
    'viewport'
  ],
  items: [
    {
      html: '<video muted autoplay loop poster="resources/images/cookies.png" id="bgvid"><source src="resources/videos/videobg.webm" type="video/webm"><source src="resources/videos/videobg.mp4" type="video/mp4"></video>'
    },
    {
      xtype: 'window',
      cls: 'landing-form',
      header: false,
      closeable: false,
      autoShow: true,
      width: 500,
      scrollable: true,
      layout: 'vbox',

      draggable: false,

      defaultType: 'textfield',

      bodyPadding: '0 20 10 20',

      defaults: {
        width: '100%'
      },

      items: [
        {
          xtype:'component',
          html: '<br/><center><img src="resources/images/logo-eatsy.PNG" width="300" height="200"/></center>'
        },
        {
          xtype:'component',
          margin: '0 0 0 10',
          html: '<h2 class="dark-color-theme"> Login </h2>'
        },
        {
          xtype: 'form',
          bodyPadding: '0 24 24 24',
          reference: 'loginform',
          name: 'loginform',
          scrollable: true,
          defaults: {
            anchor: '100%'
          },
          items: [
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'email',
              emptyText: 'Email'
            },
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'password',
              emptyText: 'Password',
              inputType: 'password'
            }
          ],
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'bottom',
              style: {
                borderTop: 'none !important'
              },
              items: [
                {
                  xtype: 'tbfill'
                },
                {
                  text: 'Login',
                  scale: 'medium',
                  handler: 'onLoginClick'
                }
              ]
            }
          ]
        },
        {
          xtype:'component',
          margin: '0 0 0 10',
          html: '<h2 class="dark-color-theme"> Register </h2>'
        },
        {
          xtype: 'form',
          bodyPadding: '0 24 24 24',
          name: 'registerform',
          reference: 'registerform',
          scrollable: true,
          defaults: {
            anchor: '100%'
          },
          items: [
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'name',
              emptyText: 'Full Name'
            },
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'email',
              emptyText: 'Email'
            },
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'password',
              emptyText: 'Password',
              inputType: 'password'
            },
            {
              xtype: 'textfield',
              allowBlank: false,
              name: 'password_again',
              emptyText: 'Password again',
              inputType: 'password'
            }
          ],
          dockedItems: [
            {
              xtype: 'toolbar',
              dock: 'bottom',
              style: {
                borderTop: 'none !important'
              },
              items: [
                {
                  xtype: 'tbfill'
                },
                {
                  text: 'Register',
                  scale: 'medium',
                  handler: 'onRegisterClick'
                }
              ]
            }
          ]
        }
      ]
    }
  ]

});
