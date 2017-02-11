/**
 * Created by pahlavaubivca on 19.11.2016.
 */
var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:AdminUser1**@localhost:5432/spacebattle";
var client = new pg.Client(conString);
client.connect();

var fullUrlParser = /(https?:)?\/\/(.*?)\/(?:(.*)\/)?(\w+\.\w+)?[\#|\?]?(.*)?/i;
var smallUrlParser = /\/(?:(.*)\/)?(.*)?[\?](.*)?/i;

module.exports = (function () {
    var setStat = function (req, res) {
        console.log(req.url);
        var urlComponent = {};

        if (smallUrlParser.exec(req.url)) {
            for (var i = 0, arr = smallUrlParser.exec(req.url); i < arr.length; i++) {
                switch (i) {
                    case 1:
                        urlComponent['path'] = arr[i];
                        break;
                    case 2:
                        urlComponent['fileName'] = arr[i];
                        break;
                    case 3:
                        urlComponent['param'] = arr[i];
                        break;
                }
            }
        }

        if (urlComponent.param) {
            try {
                urlComponent.param = JSON.parse(decodeURIComponent(urlComponent.param));
            } catch (e) {
                console.log(e);
            }
        }

        if(urlComponent.param) {
            client.query('INSERT INTO speedstats (date,fps,encounter_time,jsonobj)' +
                ' VALUES (current_date,1,1,$1)', [urlComponent], function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
            });
        }

        /*fs.writeFile("./tmp/test", "Hey there!", function (err) {
         if (err) {
         return console.log(err);
         }
         console.log("The file was saved!");
         });*/

        res.end(JSON.stringify(urlComponent));
    };
    return {
        'setStat': setStat
    }

})();