/**
 * Created by pahlavaubivca on 12.02.2017.
 */
var fs = require('fs');
//var pg = require('pg');
//var conString = "postgres://postgres:AdminUser1**@localhost:5432/spacebattle";
//var client = new pg.Client(conString);
//client.connect();
var fullUrlParser = /(https?:)?\/\/(.*?)\/(?:(.*)\/)?(\w+\.\w+)?[\#|\?]?(.*)?/i;
var smallUrlParser = /\/(?:(.*)\/)?(.*)?[\?](.*)?/i;

module.exports = (function () {
    var face = function (req, res) {
        fs.readFile('.././game/html/face.html', function (err, html) {
            if (err) {
                res.end(err)
            }
            var asd = client.query('select max(session_id) from speedstats');
            asd.on('end', function (e) {
                res.setHeader("session", e.rows[0].max);
                res.writeHeader(200, {"Content-Type": "text/html"});
                res.write(html);
                res.end();
            });
            //res.end();
        })
    };
    var testHandler = function (req, res) {
        /*fs.writeFile("./tmp/test",asd , function (err) {
         if (err) {
         return console.log(err);
         }
         console.log("The file was saved!");
         });*/
        var asd = client.query('select  max(session_id) from speedstat2');
        asd.on('end', function (e) {
            console.log(e.rows);
            res.setHeader("session", e.rows[0]);
            res.end('return resp');
        });

    };
  /*  var getSessionId = function(req,res){
        var maxSessionId = client.query('select  max(session_id) from speedstat2');
        maxSessionId.on('end', function (e) {
            console.log(e.rows);
            res.setHeader("session", e.rows[0]);
            res.end('return resp');
        });
    };*/
    var css = function (req, res) {
        var fileName = req.url.match(/\w+\.\w+/i);
        if (fileName) {
            fs.readFile('.././game/css/' + fileName[0], function (err, css) {
                if (err) {
                    res.end(err);
                }
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(css);
                res.end();
            })
        }
    };
    var jsjson = function (req, res) {
        var fileName = req.url.match(/\w+\.\w+/i);
        if (fileName) {
            fs.readFile('.././game/js/' + fileName[0], function (err, jsjson) {
                if (err) res.end(err);
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.write(jsjson);
                res.end();
            })
        }
    };
    var spacebattle = function (req, res) {
        fs.readFile('.././game/html/index.html', function (err, html) {
            if (err) {
                res.end(err)
            }
            res.setHeader("asd", true);
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        })
    };
   /* var setStat = function (req, res) {
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

        var objMap = {
            "fps": null,
            "collision": null,
            "draw": null,
            "move": null,
            "field": null,
            "unitCount":null
        };
        if (urlComponent.param) {
            try {
                urlComponent.param = JSON.parse(decodeURIComponent(urlComponent.param));
                for (var key in objMap) {
                    if (objMap.hasOwnProperty(key)) {
                        objMap[key] = urlComponent.param[key];
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        var sendArr = [urlComponent,
            0,
            objMap.fps,
            objMap.collision,
            objMap.draw,
            objMap.move,
            objMap.field,
            objMap.unitCount
        ];
        if (urlComponent.param) {
            client.query('INSERT INTO speedstat2 (session_id,date,json,fps,collision,draw,move,field,unitcount)' +
                ' VALUES ($2,current_date,$1,$3,$4,$5,$6,$7,$8)', sendArr, function (err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
            });
        }
        res.end(JSON.stringify(urlComponent));
    };*/
    return {
        'face': face,
        'testHandler': testHandler,
        'jsjson': jsjson,
        'css': css,
        // 'setStat': setStat,
        'spacebattle': spacebattle,
        //'getSessionId':getSessionId
    }
})();