/**
 * Created by pahlavaubivca on 11.02.2017.
 */
var fs = require('fs');

module.exports = (function () {
    var face = function (req, res) {
        fs.readFile('.././game/face.html',function(err,html){
            if(err){
                console.log(222);
                res.end(err)
            }
            res.setHeader("asd",true);
            res.writeHeader(200, {"Content-Type": "text/html"});

            res.write(html);
                res.end();
        })
    };
    return {
        'face':face
    }

})();
