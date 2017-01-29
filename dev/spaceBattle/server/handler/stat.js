/**
 * Created by pahlavaubivca on 19.11.2016.
 */
var fs = require('fs');
var fullUrlParser = /(https?:)?\/\/(.*?)\/(?:(.*)\/)?(\w+\.\w+)?[\#|\?]?(.*)?/i;
var smallUrlParser = /\/(?:(.*)\/)?(.*)?[\?](.*)?/i;

module.exports = (function(){
    var setStat = function(req,res){

        console.log(req.url);
        var urlComponent = smallUrlParser.exec(req.url)|| 'NO';
        if(urlComponent.length>3)urlComponent = urlComponent[3];
        res.end(urlComponent);
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