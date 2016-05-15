Ext.define('Eatsy.util.Util', {
  statics: {
    user: {},
    token: undefined,
    logOut: function() {
      //should also make a request to server to delete the token from db
      localStorage.clear();
      location.reload();
    },
    dateTimeRenderer: function (v) {
      return Ext.util.Format.date(v, 'd/m/Y h:i A');
    }
  }
});
