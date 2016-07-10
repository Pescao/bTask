/**
 * Created by pescao on 10.07.2016.
 */
/**
 * Created by pescao on 10.07.2016.
 */
define(['text!templates/login.tpl'], function(loginTpl) {
    var app = window.bTask;
    var Login = function() {};

    Login.View = Backbone.Marionette.ItemView.extend({
        template: _.template(loginTpl),
        ui: {
            'form'      : 'form',
            'loginBtn'  : '[data-action="login"]',
            'signupBtn' : '[data-action="signup"]',
        },
        events: {
            "click @ui.loginBtn": 'onLogin',
            "click @ui.signupBtn": 'onSignup',
        },

        onLogin: function(e){
            var formData = collectFormData(this.ui.form);
        },

        onSignup: function(e){
            var url = 'http://192.168.0.4/api/auth/signup',
                formData = collectFormData(this.ui.form);
            $.when(ajaxPost(url, formData)).then(
                function onSignupSuccess(){
                    console.log(arguments);
                },
                function onSignupError(){
                    console.log(arguments);
                }
            );
        }
    });

    Login.Model = Backbone.Model.extend({
        defaults: {

        }
    });

    return Login;
});