/**
 * Created by pahlavaubivca on 06.11.2016.
 */
var statHandler  = require('../handler/stat');
var route = require('../handler/route');
function some() {
    var simple = function (req, res) {
        if(req.url.match(/\/stat?.*/ig)){
            statHandler.setStat(req,res);
        }
        if(req.url.match(/\/face?.*/i)){
            route.face(req,res);
        }
    };
    
    return {
        'simple': simple
    }
}
module.exports = some();

