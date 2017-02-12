/**
 * Created by pahlavaubivca on 11.02.2017.
 */
//var fs = require('fs');
var handlers = require('../scripts/handlers');

module.exports = (function () {
    var jsjson = function (req, res) {
        var fileName = req.url.match(/\w+\.\w+/i);
        if (fileName) {
            handlers.jsjson(req, res);
        }
    };
    var css = function (req, res) {
        var fileName = req.url.match(/\w+\.\w+/i);
        if (fileName) {
            handlers.css(req, res);
        }
    };
    var html = function (req, res) {
        if (req.url.match(/face$/i)) {
            handlers.face(req, res);
        }
        if (req.url.match(/test$/i)) {
            handlers.testHandler(req, res);
        }
        if (req.url.match(/spacebattle$/i)) {
            handlers.spacebattle(req, res);
        }
    };
    var stat = function (req, res) {
        handlers.setStat(req, res)
    };

    return {
        'jsjson': jsjson,
        'css': css,
        'html': html,
        'stat': stat

    }
})();
