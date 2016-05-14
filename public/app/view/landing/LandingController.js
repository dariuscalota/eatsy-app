Ext.define('Eatsy.view.landing.LandingController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.landing',
  onLoginClick: function(button) {
    var me = this;
    var form = this.lookupReference('loginform');
    form = form.getForm();
    if(form.isValid()){
      button.disable();
      Ext.Ajax.request({
        url: Eatsy.util.Config.getApiUrl() + "signin",
        headers: {
          'Content-Type' : 'application/json'
        },
        jsonData: Ext.util.JSON.encode(form.getValues()),
        disableCaching: false,
        method: 'POST',
        success: function(response) {
          console.log(response);
          this.getView().destroy();
          Ext.widget('app-main');
          // Ext.get('SavePassword').dom.click(); //Call Click Function in false submit Button
          // response = Ext.JSON.decode(response.responseText, true);
          // Mvp.util.Util.access_token = response.access_token;
          // Mvp.util.Util.access_token_expires_in = response.expires_in;
          // // Set the localStorage value to true
          // localStorage.setItem("LoggedIn", true);
          // localStorage.setItem("AccessToken", response.access_token);
          // localStorage.setItem("RefreshToken", response.refresh_token);
          // Ext.Ajax.setDefaultHeaders({
          //   'Accept':'application/json',
          //   'Content-Type':'application/json',
          //   'Authorization':'Bearer '+ response.access_token
          // });
        }.bind(this),
        failure: function(response) {
          button.enable();
          console.log(response);
          // Ext.MessageBox.show({
          //   title: translate('Login Error'),
          //   msg: translate('Wrong Username or Password!'),
          //   minHeight:200,
          //   minWidth:400,
          //   closable: false,
          //   icon: Ext.MessageBox['ERROR'],
          //   buttons: Ext.MessageBox.OK
          // });
          // LoginForm.unmask();
          // // leave username in login form
          // // but remove password
          // client_secret_textfield.setValue('');
        }
      });
    }
  },
  onRegisterClick:function() {
    var me = this;
    var form = this.lookupReference('registerform');
    form = form.getForm();
    if(form.isValid() && form.findField('password').getValue() === form.findField('password_again').getValue()){
      Ext.Ajax.request({
        url: Eatsy.util.Config.getApiUrl() + "signup",
        headers: {
          'Content-Type' : 'application/json'
        },
        jsonData: Ext.util.JSON.encode(form.getValues()),
        disableCaching: false,
        method: 'POST',
        success: function(response) {
          console.log(response);
          form.reset();
          // Ext.get('SavePassword').dom.click(); //Call Click Function in false submit Button
          // response = Ext.JSON.decode(response.responseText, true);
          // Mvp.util.Util.access_token = response.access_token;
          // Mvp.util.Util.access_token_expires_in = response.expires_in;
          // // Set the localStorage value to true
          // localStorage.setItem("LoggedIn", true);
          // localStorage.setItem("AccessToken", response.access_token);
          // localStorage.setItem("RefreshToken", response.refresh_token);
          // Ext.Ajax.setDefaultHeaders({
          //   'Accept':'application/json',
          //   'Content-Type':'application/json',
          //   'Authorization':'Bearer '+ response.access_token
          // });
        }.bind(this),
        failure: function(response) {
          console.log(response);
          // Ext.MessageBox.show({
          //   title: translate('Login Error'),
          //   msg: translate('Wrong Username or Password!'),
          //   minHeight:200,
          //   minWidth:400,
          //   closable: false,
          //   icon: Ext.MessageBox['ERROR'],
          //   buttons: Ext.MessageBox.OK
          // });
          // LoginForm.unmask();
          // // leave username in login form
          // // but remove password
          // client_secret_textfield.setValue('');
        }
      });
    }
  }
});
