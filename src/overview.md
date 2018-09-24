This extension provides build and release tasks for validating websites. Tests web pages for broken links.

## How to use

After installing the extension, you can add its tasks to a [build definition](https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started-designer?view=vsts&tabs=new-nav) or [release definition](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/define-multistage-release-process?view=vsts) as needed.

## Tasks included

* **Broken Link Checker**: Test a web site for broken links.

The paragraphs below provide details about each task.

### Broken Link Checker
Provide the base URL of a website to this task. When run, the task will visit the website and also recursively all linked pages with the same base URL and check them for broken links.

#### Options
* Base URL
* List of URL's to ignore (won't be reported as broken links)
* Check the link using HTTP HEAD or GET

#### Check results
* If at least one broken link is found, an error will be generated which, by default, will cause the build to break.
* The broken links and their containing pages are printed to the console and can be reviewed in the build's logs.

## Get the source

The [source](https://github.com/teggno/azure-pipelines-website-validator) for this extension is on GitHub. Take, fork, and extend.

## Feedback and issues

If you have feedback or issues, please file an issue on [GitHub](https://github.com/teggno/azure-pipelines-website-validator/issues)

## Using this extension as a template for your own extension
Feel free to use the [source](https://github.com/teggno/azure-pipelines-website-validator) of this extension as a template for your own extension.
To make it easier for you to decide if this extension suits your needs, here are its characteristics:
* Implemented in TypeScript
* Folder structure capable of multiple tasks
* Build process of this extension consists of npm scripts written in JavaScript
