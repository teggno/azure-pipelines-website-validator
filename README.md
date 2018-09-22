[![Build status](https://dev.azure.com/teggno/azure-pipelines-website-validator/_apis/build/status/azure-pipelines-website-validator-CI)](https://dev.azure.com/teggno/azure-pipelines-website-validator/_build/latest?definitionId=12)

## Website validation tasks for Azure Pipelines

This repo contains the source of an Azure DevOps extension that provides build and release tasks for validating websites.

## Tasks included

* **Broken Link Checker**: Test a web site for broken links.

## How to use

After installing the extension, you can add its tasks to a [build definition](https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started-designer?view=vsts&tabs=new-nav) or [release definition](https://docs.microsoft.com/en-us/azure/devops/pipelines/release/define-multistage-release-process?view=vsts) as needed.

## Build
### Local build
The build script can be run in the console from the repo's root directory by entering `npm run-script build`.  
This will transpile TypeScript to JavaScript and put all the files that comprise the extension into the `dist` folder.

To **generate the extension package** (*.vsix) file, run `npm run-script package` which will put the package in the `dist` directory. Internally, this calls the build script mentioned above and then executes Microsoft's `tfx` utility.

Make sure to change the package version in the [extension manifest](src/vss-extension.json) prior to packaging if you wish to update the extension in the marketplace.

### CI build
The extension is built using an [Azure Pipelines build](https://dev.azure.com/teggno/azure-pipelines-website-validator/_build?definitionId=12) whenever changes are pushed to the master branch of this repository. Azure Pipelines is also used to [publish the extension](https://dev.azure.com/teggno/azure-pipelines-website-validator/_releases2?definitionId=1&view=mine&_a=releases) to the Azure DevOps Marketplace.

## Feedback and issues

If you have feedback or issues, please file an issue on [GitHub](https://github.com/teggno/azure-pipelines-website-validator/issues).

## Using this extension as a template for your own extension
Feel free to use this repository as a template for your own extension.
To make it easier for you to decide if this extension suits your needs, here are its characteristics:
* Implemented in TypeScript
* Folder structure capable of multiple tasks
* Build process of this extension consists of npm scripts written in JavaScript
