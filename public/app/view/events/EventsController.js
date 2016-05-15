Ext.define('Eatsy.view.events.EventsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.events',
  onCreateEvent: function() {
    var editor = Eatsy.view.events.CreateEvent;
    editor.onEditorBeforeShow();
    editor.show();
  },
  onEventSelect: function(el, record, tr, rowIndex, e, eOpt) {
    var me = this;
    Ext.getCmp('eventDescription').update(record.data);
    var commentsView = Ext.getCmp('commentsView');
    var commentsStore = commentsView.getStore();
    commentsStore.getProxy().setExtraParam('event',record.data._id);
    commentsStore.load();
    commentsView.show();
  }
});
