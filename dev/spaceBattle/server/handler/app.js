/**
 * Created by pahlavaubivca on 06.11.2016.
 */
var statHandler  = require('../handler/stat');
function some() {
    var simple = function (req, res) {
        if(req.url.match(/\/stat?.*/ig)){
            statHandler.setStat(req,res);
        }
        res.end('dafdsa');
    };
    
    return {
        'simple': simple
    }
}
module.exports = some();

