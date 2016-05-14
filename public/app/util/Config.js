Ext.define('Eatsy.util.Config', {
  singleton: true,
  config: {

    apiUrl: 'https://eatsy-app.herokuapp.com/api/'

  },
  
  /**
  * Description
  * @method constructor
  * @param {} config
  * @return
  */
  constructor: function (config) {
    this.initConfig(config);
    this.callParent([config]);
  }
});
