/**
 * Created by pahlavaubivca on 06.11.2016.
 */
var http = require('http');
var handler = require('./handler/app');

var server = http.createServer(function(req,res){
    handler.simple(req,res)
}).listen(666,'localhost');

