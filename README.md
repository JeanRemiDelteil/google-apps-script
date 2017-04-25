<img src="https://raw.githubusercontent.com/MaartenDesnouck/google-apps-script/master/images/logo/gas-logo.png" alt="gas logo" title="gas" align="right" height="96" width="96"/>

# gas, the complete CLI for Google Apps Script

[![NPM Version](http://img.shields.io/npm/v/google-apps-script.svg?style=flat)](https://www.npmjs.org/package/google-apps-script) [![NPM Downloads](https://img.shields.io/npm/dt/google-apps-script.svg?style=flat)](https://www.npmjs.org/package/google-apps-script)

# Installation

```
$ npm i -g google-apps-script
```

# Usage

  Authenticate the Drive API (add '-f' to force reauthentication):
```
$ gas auth [-f]
```

  Create or delete a project in your Google Drive:
```
$ gas remote create <name>
$ gas remote delete <fileId>
```  

  List your remote projects and their fileId's (optional filter on filename):
```
$ gas list [nameFilter]
```

  Link a remote project to your current directory:
```
$ gas link <fileId>
```

  Pull and push code from/to your remote project:
```
$ gas pull
$ gas push
```

  Some shortcuts for creating, linking and pulling projects all in one:

```
$ gas clone <fileId>
$ gas new <name>
```

  # Examples
```
    $ gas new myScript
    $ cd my-awesome-script
    $ gas pull
```
```   
    $ gas list myScript
    $ gas clone myScript-fileId
```
```
    $ gas remote create myScript2
    $ mkdir src
    $ cd src
    $ gas remote link myScript2-fileId
    $ gas pull
```

<br>
That's all (so far)

Suggestions or questions?   
Tweet me [@MaartenDesnouck](https://twitter.com/MaartenDesnouck) or
create an issue on [github](https://github.com/MaartenDesnouck/google-apps-script/issues/new).
