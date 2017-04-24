<img src="https://raw.githubusercontent.com/MaartenDesnouck/google-apps-script/master/images/logo/gas-logo.png" alt="gas logo" title="gas" align="right" height="96" width="96"/>

# gas, the complete CLI for Google Apps Script

[![NPM Version](http://img.shields.io/npm/v/google-apps-script.svg?style=flat)](https://www.npmjs.org/package/google-apps-script) [![NPM Downloads](https://img.shields.io/npm/dt/google-apps-script.svg?style=flat)](https://www.npmjs.org/package/google-apps-script)

# Installation

```
$ npm i -g google-apps-script
```

# Usage

  Commands:

    auth [options]     authenticate the Drive API (add '-f' to force reauthentication)
    remote             'remote create <name>' to create a new project in your Google Drive
                       'remote delete <fileId>' to delete a project from your Google Drive
    list [nameFilter]  list your remote projects and their fileId's (optional filter on filename)
    clone <fileId>     create a new local folder, link the remote project with the given fileId and do a pull from remote
    new <name>         create a new Google Apps Script project in your Google Drive and then clone that project locally
    push|deploy        push your local code to the linked project on your Google Drive
    pull               when a project is already cloned, pull new code from your Google Drive
    help [cmd]         display help for [cmd]

  Examples:

    $ gas new myScript
    $ cd my-awesome-script
    $ gas pull

    $ gas list myScript
    $ gas clone this-is-not-the-file-id-you-are-looking-for

    $ gas remote create myScript2
    $ mkdir src
    $ cd src
    $ gas remote link this-is-not-the-file-id-you-are-looking-for-either
    $ gas pull

<br>
That's all (so far)

Suggestions or questions?   
Tweet me [@MaartenDesnouck](https://twitter.com/MaartenDesnouck) or
create an issue on [github](https://github.com/MaartenDesnouck/google-apps-script/issues/new).
