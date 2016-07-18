/**
 * Created by pescao on 10.07.2016.
 */
define([], function() {
    var User = {};

    User.HeaderView = Marionette.ItemView.extend({
        template: _.template(''),
        ui: {
            logout: '[data-action="logout"]'
        },
        events: {
            'click @ui.logout' : 'onLogout'
        },

        initialize: function(){},

        onLogout: function(e){
            $.when(this.model.logout()).then(function(){
                app.navigate('login');
            });
        }
    });

    User.ProfileView = Marionette.ItemView.extend({

    });

    User.UserModel = Backbone.Model.extend({
        idAttribute: '_id',
        defaults: {
            name: '',
            email: ''
        },

        logout: function(){
            return ajaxRequest('http://192.168.0.4/api/auth/logout');
        }
    });

    return User;
});