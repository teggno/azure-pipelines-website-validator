import * as tl from "vsts-task-lib";
var blc = require("broken-link-checker");

check(parseInput())
    .then(function(results){
        if (results.length === 0) {
            console.log("Didn't find any broken links.");
        }
        else {
            tl.error(`Found ${ results.length } broken links`);
            results.forEach(function(brokenLink){
                console.log(`In page ${ brokenLink.containingPageUrl }, link ${ brokenLink.brokenLinkUrl}, reason ${ brokenLink.brokenReason }`);
            });
            process.exit(1);    
        }
    });

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