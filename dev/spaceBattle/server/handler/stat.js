/**
 * Created by pahlavaubivca on 19.11.2016.
 */
var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:AdminUser1**@localhost:5432/spacebattle";
var client = new pg.Client(conString);
client.connect();

/*var pool = new pg.Pool();
var config = {
    user:'postgres',
    database: 'spacebattle',
    password:'AdminUser1**',
    host:'localhost',
    port:5432
};*/

var fullUrlParser = /(https?:)?\/\/(.*?)\/(?:(.*)\/)?(\w+\.\w+)?[\#|\?]?(.*)?/i;
var smallUrlParser = /\/(?:(.*)\/)?(.*)?[\?](.*)?/i;

module.exports = (function(){
    var setStat = function(req,res){

        console.log(req.url);
        var urlComponent = smallUrlParser.exec(req.url)|| 'NO';
        if(urlComponent.length>3)urlComponent = urlComponent[3];
        res.end(urlComponent);

        urlComponent.split('&').forEach(function(e, i, a) {
            urlComponent = a;
            a[i] = e.split('=');
        });

        client.query('INSERT INTO speedstats (date,fps,encounter_time,jsonobj)' +
            ' VALUES (current_date,1,1,$1)', [urlComponent], function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log(result);
            //output: 1
        });
        fs.writeFile("./tmp/test", "Hey there!", function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    };
    return{
        'setStat':setStat
    }

})();