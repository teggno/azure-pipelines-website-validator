var fs = require("fs");
var resolve = require("path").resolve;
var join = require("path").join;
var cp = require("child_process");
var os = require("os");

// execute npm install in all subfolders of dist/tasks
module.exports = function() {
    var tasks = resolve(__dirname, "../dist/tasks");

    var dirs = fs.readdirSync(tasks)
        .map(function(dir) {
            return join(tasks, dir);
        })
        .filter(function(dir){
            return fs.existsSync(join(dir, "package.json"));
        });

    var promises = dirs
        .map(function(dir) {
            return install(dir);
        });
    
    return Promise.all(promises);
};

function install(dir){
    return new Promise(function(resolve, reject){
        var npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm"

        var child = cp.spawn(
            npmCmd, 
            ["i", "--production"], 
            { env: process.env, cwd: dir, stdio: "inherit" }
        );

        child.on("exit", function(code){
            if (code === 0){
                console.log("Executed npm install in " + dir);
                resolve();
            }
            else {
                reject("Failed executing npm install in " + dir);
            }
        });
    });
}
