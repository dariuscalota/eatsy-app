Ext.define('Eatsy.view.events.List', {
  extend: 'Ext.grid.Panel',
  xtype: 'events-list',
  title: 'All available Events',

  sortableColumns: false,


  listeners: {
    rowclick: 'onEventSelect',
    render: function() {
      this.getStore().load();
    }
  },
  store: 'Events',
  columns: [
    {
      text: 'What?',
      dataIndex: 'title',
      flex: 4,
      tdCls: 'bold'
    },
    {
      text: 'When?',
      dataIndex: 'start',
      width: 150,
      renderer: function(v) {
        return Ext.util.Format.date(v, 'd/m/Y');
      }
    }
  ],
  tools:[{
    type:'refresh',
    tooltip: 'Refresh Events',
    handler: function(event, toolEl, panelHeader) {
      this.up('panel').getStore().load();
    }
  },{
    type:'plus',
    tooltip: 'Add Event',
    handler: 'onCreateEvent'
  }]
});
