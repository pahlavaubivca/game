/**
 * Created by pahlavaubivca on 06.11.2016.
 */
//var statHandler = require('/stat');
var route = require('../scripts/route');
function some() {
    var simple = function (req, res) {
        /*if(req.url.match(/\/stat?.*!/ig)){
         statHandler.setStat(req,res);
         }
         if(req.url.match(/\/face$/i)){
         route.face(req,res);
         }
         if(req.url.match(/\/test?.*!/i)){
         route.testHandler(req,res);
         }*/

        if (req.url.match(/\.css/i)) {
            route.css(req, res);
        }
        if (req.url.match(/\.html/i)) {
            route.html(req, res);
        }
        if (req.url.match(/\.[js|json]/i)) {
            route.jsjson(req, res);
        }
        if (req.url.match(/\/stat?.*/i)) {
            route.stat(req, res);
        } else{
            route.html(req, res);
        }

    };

    return {
        'simple': simple
    }
}
module.exports = some();

