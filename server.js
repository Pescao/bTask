/**
 * Created by pescao on 10.07.2016.
 */
var connect = require('connect'),
    http = require('http'),
    app;

app = connect()
    .use(connect.static('app'))
    .use('/js/lib/', connect.static('node_modules/requirejs/'))
    .use('/bootstrap/', connect.static('bower_components/bootstrap/dist/'))
    .use('/css/lib/', connect.static('bower_components/'))
    .use('/node_modules', connect.static('node_modules'))
    .use('/test', connect.static('test/'))
    .use('/test', connect.static('app'))
;

http.createServer(app).listen(8080, function(){
    console.log('Running on http://localhost:8080');
});