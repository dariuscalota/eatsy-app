Ext.define('Eatsy.view.firstuse.FirstUse', {
  extend: 'Ext.container.Container',
  xtype: 'firstuse',
  name: 'firstuserview',
  requires: [
    'Ext.layout.container.Fit',
    'Ext.selection.Model',
    'Ext.plugin.Viewport',
    'Eatsy.store.Interests',
    'Eatsy.view.firstuse.FirstUseController'
  ],
  controller: 'firstuse',
  plugins: [
    'viewport'
  ],
  layout: {
    type: 'vbox',
    align: 'center',
    pack: 'center'
  },
  items: [
    {
      xtype: 'panel',
      controller: 'firstuse',
      layout: {
        type: 'card',
        align: 'center',
        pack: 'center'
      },
      width: 500,
      height: 400,

      bodyPadding: 15,

      defaults: {
        border:false
      },

      defaultListenerScope: true,

      bbar: ['->',
      {
        itemId: 'card-prev',
        text: '&laquo; Previous',
        handler: 'showPrevious',
        disabled: true
      },
      {
        itemId: 'card-next',
        text: 'Next &raquo;',
        handler: 'showNext'
      }
    ],

    items: [
      {
        id: 'card-0',
        items: [
          {
            html: '<h3>Welcome! Let\'s set up your account in three eatsy steps.</h3><p>Step 1 of 3</p><p>Please write your location and press "Next" button to continue...</p>'
          },
          {
            xtype: 'textfield',
            width:'100%',
            reference: 'locationField',
            name: 'location',
            emptyText: 'ex: Timisoara'
          }
        ]
      },
      {
        id: 'card-1',
        scrollable: true,
        items: [
          {
            xtype: 'container',
            width:'96%',
            html: '<p>Step 2 of 3</p><p>Almost there.  Please select your favorite food categories and click "Next" button to continue...</p>'
          },
          {
            xtype:'toolbar',
            width:'96%',
            items: [
              {
                xtype    : 'textfield',
                width: '100%',
                name     : 'search_interest',
                emptyText: 'search type of foods, recipes, etc',
                fieldLable: 'Search',
                listeners: {
                  change: function(field, newValue) {
                    var store = this.up('toolbar').nextSibling('dataview').getStore();
                    store.filter({
                      property: 'name',
                      value: newValue,
                      anyMatch: true,
                      caseSensitive: false
                    });
                  }
                }
              }
            ]
          },
          {
            xtype: 'dataview',
            width:'96%',
            reference: 'interestsDataView',
            listeners: {
              render: function() {
                this.getStore().load();
              }
            },
            store: 'Interests',
            tpl: new Ext.XTemplate (
                '<div class="container-fuid">',
                  '<ul class="list-group checked-list-box">',
                    '<tpl for=".">',
                      '<li class="list-group-item custom-list-group-item">',
                        '{name}',
                      '</li>',
                    '</tpl>',
                  '</ul>',
                '</div>'
            ),
            itemSelector: 'li.list-group-item',
            selectionModel:{
              mode: 'SIMPLE',
              ignoreRightMouseSelection: true
            },
            emptyText: 'No results.',
            selectedItemCls: 'list-group-item-primary active'
          }
        ]
      },
      {
        id: 'card-2',
        items: [
          {
            xtype: 'container',
            width:'96%',
            html: '<p>Step 3 of 3 - Complete</p><p>Now let us know how you look like! Don\'t be shy! </p><p>Paste a link with your photo(recommended 100x100 pixels, jpg, png format)</p>'
          },
          {
            xtype: 'textfield',
            reference: 'pictureField',
            width:'96%',
            name: 'picture',
            emptyText: 'url'
          },
          {
            xtype: 'container',
            width:'96%',
            items: [
              {
                html: '<center><h2> That\'s all!<h2><center>'
              },
              {
                xtype: 'toolbar',
                items: [
                  '->',
                  {
                    xtype: 'button',
                    width:'30%',
                    buttonAlign:'center',
                    scale: 'large',
                    text: 'Continue',
                    handler: 'onUserUpdateInterests'
                  },
                  '->'
                ]
              }
            ]
          }
        ]
      }
    ],
    showNext: function () {
        this.doCardNavigation(1);
    },

    showPrevious: function (btn) {
        this.doCardNavigation(-1);
    },

    doCardNavigation: function (incr) {
        var me = this;
        var l = me.getLayout();
        var i = l.activeItem.id.split('card-')[1];
        var next = parseInt(i, 10) + incr;
        l.setActiveItem(next);

        me.down('#card-prev').setDisabled(next===0);
        me.down('#card-next').setDisabled(next===2);
    },
    onUserUpdateInterests: function(button) {
      var me = this;
      button.disable();
      var user = {
        interest: []
      };
      user.location = this.lookupReference('locationField').getValue();
      user.picture = this.lookupReference('pictureField').getValue();

      var selectedItems = this.lookupReference('interestsDataView').getSelectionModel().getSelection();

      for (var i = 0 ; i < selectedItems.length; i++) {
        if(selectedItems[i]){
          user.interest.push(selectedItems[i].data._id);
        }
      }

      Ext.Ajax.request({
        url: Eatsy.util.Config.getApiUrl() + 'users/'+Eatsy.util.Util.user._id,
        headers: { 'Content-Type': 'application/json' },
        params : Ext.JSON.encode(user),
        disableCaching: false,
        method: 'PUT',
        success: function(response) {
          var msg = Ext.JSON.decode(response.responseText);
          button.up('[name=firstuserview]').destroy();
          Ext.widget('app-main');
          console.log(msg);
        }.bind(this),
        failure: function(response) {
          button.enable();
          console.log(response);
        }
      });
    }
  }
]

});
