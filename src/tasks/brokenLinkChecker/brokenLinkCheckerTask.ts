import * as tl from "vsts-task-lib";
var blc = require("broken-link-checker");
var Table = require('cli-table');

check(parseInput())
    .then(printResults);

function printResults(results: BrokenLink[]){
    if (results.length === 0) {
        console.log("Didn't find any broken links.");
    }
    else {
        tl.error(`Found ${ results.length } broken link(s)`);
        var table = new Table({
            head: ['Containing page', 'Broken link', 'Reason']
        });
        results.forEach(r => table.push([r.containingPageUrl, r.brokenLinkUrl, r.brokenReason]));
        console.log(table.toString());
        process.exit(1);    
    }
}

function parseInput() : Options {
    return { 
        baseUrl: tl.getInput("baseurl", true),
        exclude: (tl.getInput("exclude", false) || "").trim().replace("\r", "").split("\n").filter(l => l && l !== ""),
        headRequest: tl.getInput("headOrGet", true) !== "get"
    };
}

function check(options: Options){
    var result: BrokenLink[] = [];
    return new Promise<BrokenLink[]>(function(resolve, reject){
        var checkerOptions = {
            excludedKeywords: options.exclude,
            requestMethod: options.headRequest ? "head" : "get"
        };
        var siteChecker = new blc.SiteChecker(checkerOptions, {
            link: function(l: any){
                if (l.broken){
                    result.push({
                        containingPageUrl: l.base.original,
                        brokenLinkUrl: l.url.original,
                        brokenReason: l.brokenReason
                    });
                }
            },
            end: function(){
                resolve(result);
            }
        });
        siteChecker.enqueue(options.baseUrl);
    });
}

interface Options {
    baseUrl: string;
    exclude: string[];
    headRequest: boolean;
}

interface BrokenLink {
    containingPageUrl: string;
    brokenLinkUrl: string;
    brokenReason: string;
}