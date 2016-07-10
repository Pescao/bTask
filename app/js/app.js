/**
 * Created by pescao on 10.07.2016.
 */
"use strict";
define([
    'user',
    'helpers'
],
function(UserManager) {
    return Marionette.Application.extend({
        initialize: function() {
            var self = this;
            this.Behaviors = {};
            Marionette.Behaviors.behaviorsLookup = function() {
                return self.Behaviors;
            };

            var Router = Marionette.AppRouter.extend({
                appRoutes: {
                    ""      : "index",
                    "login": "login"
                }
            });

            var Controller = Marionette.Controller.extend({
                index: function () {
                    require([], function () {
                        if (!window.userdata) {
                            self.entities.router.navigate('/login', {trigger: true});
                        }
                    });
                },

                login: function () {
                    require(['login'], function (Login) {
                        var view = new Login.View({
                            model: new Login.Model()
                        });

                        self.main.show(view);
                    });
                },
            });

            this.on("start", function () {
                self.addRegions({
                    header: '[data-role="header"]',
                    main: 	'[data-role="main"]',
                    sidebar:'[data-role="sidebar"]'
                });

                this.entities = {};
                this.entities.controller = new Controller;
                this.entities.router = new Router({controller: this.entities.controller});
                this.UserManager = UserManager;

                Backbone.history.start();
            });
        }
    });
});