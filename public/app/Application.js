/**
* The main application class. An instance of this class is created by app.js when it calls
* Ext.application(). This is the ideal place to handle application launch and initialization
* details.
*/
Ext.define('Eatsy.Application', {
  extend: 'Ext.app.Application',

  name: 'Eatsy',

  requires: [
    'Eatsy.util.Config',
    'Eatsy.util.Util'
  ],

  stores: [
    // TODO: add global / shared stores here
  ],

  launch: function () {
    if(!localStorage.access_token){
      Ext.widget('landing');
    } else {
      Ext.widget('app-main');
    }
  }
});
