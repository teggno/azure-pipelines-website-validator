var rimraf = require("rimraf");
var path = require("path");

var distDir = path.resolve(__dirname, "../dist");

rimraf(distDir, function(err){
    if (err) {
        console.error("Error cleaning dist directory")
        process.exit(1);
    }

    console.log("Cleaned " + distDir);
});    
