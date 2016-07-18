/**
 * Created by pescao on 10.07.2016.
 */
define(['text!templates/login.tpl'], function(loginTpl) {
    var app = window.bTask;
    var Login = {};

    Login.View = Backbone.Marionette.ItemView.extend({
        template: _.template(loginTpl),
        ui: {
            form      : 'form',
            loginBtn  : '[data-action="login"]',
            signupBtn : '[data-action="signup"]',
        },
        events: {
            "click @ui.loginBtn": 'onLogin',
            "click @ui.signupBtn": 'onSignup',
        },

        onLogin: function(e){
            this.model.login(collectFormData(this.ui.form));
        },

        onSignup: function(e){
            this.model.signup(collectFormData(this.ui.form));
        }
    });

    Login.Model = Backbone.Model.extend({
        defaults: {
            url: 'http://192.168.0.4/api/auth/'
        },

        login: function(data){
            var url = this.get('url') + 'login';
            $.when(ajaxPost(url, data)).then(
                this.loginSuccess,
                this.loginError
            ).then(function(){
                app.navigate('ads')
            });
        },

        signup: function(data){
            var url = this.get('url') + 'signup';
            $.when(ajaxPost(url, data)).then(
                this.loginSuccess,
                this.loginError
            ).then(function(){
                app.navigate('user');
            });
        },

        loginSuccess: function(response){
            app.User = new app.UserManager.UserModel(response);
            app.navigate('/user', {trigger: true});
        },

        loginError: function(xhr, type, message){

        },

    });

    return Login;
});