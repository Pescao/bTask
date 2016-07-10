/**
 * Created by pescao on 10.07.2016.
 */
requirejs.config({
    baseUrl: 'js',
    paths: {},
    shim: {}
});

require(['app'], function(App) {
    window.bTask = new App();
});