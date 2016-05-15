Ext.define('Eatsy.view.events.EventsController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.events',
  onCreateEvent: function() {
    var editor = Eatsy.view.events.CreateEvent;
    editor.onEditorBeforeShow();
    editor.show();
  }
});
