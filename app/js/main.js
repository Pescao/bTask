/**
 * Created by pescao on 10.07.2016.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        templates: '/templates'
    }
});

$.ajaxSetup({
    crossDomain: true,
    xhrFields: { withCredentials: true }
});
require(['app'], function(App) {
    window.bTask = new App();
    window.bTask.start();
});