var ncp = require("ncp").ncp; 
var npminstall = require("./npminstall");
var path = require("path");
var os = require("os");

console.log("Start build.js");

var srcDir =  path.resolve(__dirname, "../src");
var distDir = path.resolve(__dirname, "../dist");

copySrc()
    .then(npminstall)
    .then(logCompletion)
    .catch(function(err){
        console.error(err);
    });

function copySrc(){
    return new Promise(function(resolve, reject){
        ncp(srcDir, distDir, { filter: function(name){
            return name.indexOf("node_modules") === -1
                && name.indexOf(".ts") === -1;
        }}, function(err){
            if (err) {
                reject(err); 
                return;
            }

            console.log("Copied files from " + srcDir + " to " + distDir);
            resolve();
        });
    });
}

function logCompletion(){
    console.log(os.EOL + "Build finished. Files are ready in " + distDir);
}