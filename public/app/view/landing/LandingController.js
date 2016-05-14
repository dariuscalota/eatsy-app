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

          var responseObj = Ext.JSON.decode(response.responseText, true);
          localStorage.setItem("access_token", responseObj.token);
          localStorage.setItem("email", responseObj.user.email);
          localStorage.setItem("name", responseObj.user.name);
          Ext.Ajax.setDefaultHeaders({
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':responseObj.token
          });
        }.bind(this),
        failure: function(response) {
          button.enable();
          console.log(response);
          Ext.MessageBox.show({
            title: 'Login Error',
            msg:'Wrong Username or Password!',
            minHeight:200,
            minWidth:400,
            closable: false,
            icon: Ext.MessageBox['ERROR'],
            buttons: Ext.MessageBox.OK
          });
          form.findField('password').reset();
        }
      });
    }
  },
  onRegisterClick:function(button) {
    var me = this;
    var form = this.lookupReference('registerform');
    form = form.getForm();
    if(form.isValid() && form.findField('password').getValue() === form.findField('password_again').getValue()){
      button.disable();
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

          this.getView().destroy();
          Ext.widget('app-main');

          var responseObj = Ext.JSON.decode(response.responseText, true);
          localStorage.setItem("access_token", responseObj.token);
          localStorage.setItem("email", responseObj.user.email);
          localStorage.setItem("name", responseObj.user.name);
          Ext.Ajax.setDefaultHeaders({
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':responseObj.token
          });
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
  }
});
