Ext.define('Eatsy.view.events.CreateEvent',{
  extend: 'Ext.form.Panel',
  singleton: true,
  width: 500,
  height: 500,
  modal: true,
  frame: true,
  floating: true,
  draggable: true,
  resizable:true,
  bodyBorder: true,
  scrollable: true,
  bodyPadding: 10,
  closable: true,
  closeAction: 'hide',
  title: 'Create a new event',
  defaults: {
    anchor: '100%',
    labelAlign: 'top'
  },
  defaultListenerScope: true,
  listeners: {
    hide: function(){
      this.removeAll();
    }
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      items: [
        {
          xtype: 'button',
          scale: 'medium',
          text: 'Cancel',
          handler: 'onCancelClick'
        },
        {
          xtype: 'tbfill'
        },
        {
          xtype: 'button',
          scale: 'medium',
          text: 'Create',
          handler: 'onCreateEventClick'
        }
      ]
    }
  ],
  onCancelClick: function(){
    this.hide();
  },
  onCreateEventClick: function(btn) {
    var me = this;
    var invitesList = btn.up('form').down('[itemId=usersList]').getSelectionModel().getSelection();
    var interestList = btn.up('form').down('[itemId=interestsList]').getSelectionModel().getSelection();

    var myMask = new Ext.LoadMask({
      msg    : 'Loading..',
      target : this
    });

    if(this.getForm().isValid() && interestList.length > 0){
      myMask.show();

      var values = me.getValues();

      values.interests = values.interests === undefined ? [] : values.interests;
      values.invites = values.invites === undefined ? [] : values.invites;

      for(var i=0; i<interestList.length;i++){
        values.interests.push(interestList[i].data._id);
      }
      for(var k=0; k<invitesList.length;k++){
        values.invites.push(invitesList[k].data._id);
      }

      values.owner = Eatsy.util.Util.user._id;

      var StoreTarget = Ext.getStore('Events');

      Ext.Ajax.request({
        url: Eatsy.util.Config.getApiUrl() + 'events',
        params : Ext.JSON.encode(values),
        disableCaching: true,
        method: 'POST',

        success: function(response) {
          var newObj = {};
          newObj.reciever = values.invites;
          newObj.sender = values.owner;
          response = Ext.JSON.decode(response.responseText);
          console.log(response);
          newObj.event = response.event._id;

          Ext.Ajax.request({
            url: Eatsy.util.Config.getApiUrl() + 'invite',
            params : Ext.JSON.encode(newObj),
            disableCaching: true,
            method: 'POST',
            success: function(response) {
              StoreTarget.load();
              myMask.hide();
              me.hide();
            }.bind(this),
            failure: function(response) {
              console.log(response);
            }
          });
        }.bind(this),
        failure: function(response) {
          console.log("error");
          myMask.hide();
        }
      });
    }

  },
  onEditorBeforeShow: function() {
    this.add(
      {
        xtype: 'textfield',
        name: 'title',
        fieldLabel: 'Title',
        allowBlank: false
      },
      {
        xtype: 'textfield',
        name: 'picture',
        fieldLabel: 'URL for picture'
      },
      {
        xtype: 'textareafield',
        name: 'description',
        fieldLabel: 'Description',
        allowBlank: false,
        grow: true
      },
      {
        xtype: 'textfield',
        name: 'location',
        allowBlank: false,
        fieldLabel: 'Location(city)'
      },
      {
        xtype: 'datetimefield',
        allowBlank: false,
        fieldLabel : 'Date & Time',
        format : 'd/m/Y h:i A',
        minValue: new Date(),
        todayText: 'Select Current Date',
        hourText: 'H',
        minuteText: 'Min'
      },
      {
        xtype: 'numberfield',
        allowBlank: false,
        name: 'duration',
        itemId: 'inputItem',
        allowDecimals: false,
        minValue: 1,
        flex: 1,
        fieldLabel: 'Duration(hours)'
      },
      {
        html: '<hr/><i style="color:gray;">Please select at least one interest from the list:</i>'
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
                var store = this.up('toolbar').nextSibling('container').down('dataview').getStore();
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
        xtype: 'container',
        height: 150,
        margin: '4 4 4 4',
        scrollable: true,
        items: [
          {
            xtype: 'dataview',
            itemId: 'interestsList',
            listeners: {
              render: function() {
                this.getStore().clearFilter();
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
        html: '<hr/><i style="color:gray;">Users you want to invite:</i>'
      },
      {
        xtype:'toolbar',
        width:'96%',
        items: [
          {
            xtype    : 'textfield',
            width: '100%',
            name     : 'search_user',
            emptyText: 'search by name',
            fieldLable: 'Search',
            listeners: {
              change: function(field, newValue) {
                var store = this.up('toolbar').nextSibling('container').down('dataview').getStore();
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
        xtype: 'container',
        height: 150,
        margin: '4 4 4 4',
        scrollable: true,
        items: [
          {
            xtype: 'dataview',
            listeners: {
              render: function() {
                this.getStore().clearFilter();
                this.getStore().load();
              }
            },
            itemId: 'usersList',
            store: 'Users',
            tpl: new Ext.XTemplate (
                '<div class="container-fuid">',
                  '<ul class="list-group checked-list-box">',
                    '<tpl for=".">',
                      '<li class="list-group-item custom-list-group-item">',
                        '<span ><img width="30" height="30" src="{picture}" alt="picture-{name}" class="img-circle"></span>',
                        '&nbsp;&nbsp; <b>{name}</b>',
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
      }
    );
  }
});
