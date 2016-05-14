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

  views: [
    'landing.Landing',
    'firstuse.FirstUse',
    'main.Main'
  ],

  stores: [
    'Interests'
  ],

  launch: function () {
        Ext.widget('app-main');
    // if(localStorage.user && localStorage.token){
    //
    //   var user = JSON.parse(localStorage.getItem("user"));
    //   var token = localStorage.token;
    //
    //
    //   Ext.Ajax.setDefaultHeaders({
    //     'Accept':'application/json',
    //     'Content-Type':'application/json',
    //     'Authorization': token
    //   });
    //
    //   Ext.Ajax.request({
  	// 		url: Eatsy.util.Config.getApiUrl() + 'users/' + user._id,
  	// 		disableCaching: false,
  	// 		method: 'GET',
  	// 		success: function(response) {
    //       var data = Ext.JSON.decode(response.responseText)[0];
    //       localStorage.setItem("user",JSON.stringify(data));
    //       // localStorage.setItem("token",);
    //       Eatsy.util.Util.user = data;
    //       user = data;
    //       // Eatsy.util.Util.token = data.token;
  	// 		}.bind(this),
  	// 		/**
  	// 		* Description
  	// 		* @method failure
  	// 		* @return
  	// 		*/
  	// 		failure: function(response) {
    //       localStorage.clear();
    //       console.log(response);
  	// 		}
  	// 	});
    //
    //   if(user.location === ""){
    //     Ext.widget('firstuse');
    //   } else {
    //     Ext.widget('app-main');
    //   }
    // } else {
    //   localStorage.clear();
    //   Ext.widget('landing');
    // }
  }
});
