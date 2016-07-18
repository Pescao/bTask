/**
 * Created by pescao on 10.07.2016.
 */
"use strict";
define([
    'user',
    'helpers'
],
function(UserManager) {
    var App = Marionette.Application.extend({
        initialize: function() {
            var app = this;
            this.Behaviors = {};
            Marionette.Behaviors.behaviorsLookup = function() {
                return self.Behaviors;
            };

            var Router = Marionette.AppRouter.extend({
                appRoutes: {
                    ""      : "index",
                    "login" : "login",
                    "user"  : "user",
                }
            });

            var Controller = Marionette.Controller.extend({
                index: function () {
                    if (window.userdata) {
                        app.navigate('ads', {trigger: true});
                    } else {

                    }
                },

                login: function () {
                    require(['login'], function (Login) {
                        var view = new Login.View({
                            model: new Login.Model
                        });
                        app.main.show(view);
                    });
                },

                user: function () {
                    if (!app.User) {
                        app.navigate('login', {trigger: true});
                        return;
                    }

                    var view = new app.UserManager.ProfileView({model: app.User});
                    app.main.show(view);
                },
            });

            this.on("start", function () {
                this.addRegions({
                    header: '[data-role="header"]',
                    main: 	'[data-role="main"]',
                    sidebar:'[data-role="sidebar"]'
                });

                this.entities = {};
                this.entities.controller = new Controller;
                this.entities.router = new Router({controller: this.get('controller')});
                this.UserManager = UserManager;

                Backbone.history.start();
            });
        },

        get: function(entity){
            return this.entities && this.entities[entity] ? this.entities[entity] : null;
        },

        navigate: function(route, options){
            this.get('router').navigate(route, options);
        }
    });

    return App;
});