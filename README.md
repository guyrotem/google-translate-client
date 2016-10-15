# google-translate-client
Multi-lingual sample app for the [google-translate-server (proxy)](https://github.com/guyrotem/google-translate-server/).
It allows you to translate phrases to multiple languages simultaneously, using the Google translate API proxy, but there's whole lot of other stuff you can do, it's just a sample app.
AngularJS 1.5.x, using [wix-gruntfile](https://github.com/wix/wix-gruntfile) as a dev framework.
###[**See demo here**](https://google-translate-proxy.herokuapp.com/)###

## Setup

=> you must have bower and npm properlly installed on your computer.

1.  clone the repo to your computer
2.  run **"npm install"** to fetch all npm/bower dependencies, and build the project.
3.  run project
  1. for local dev: **"grunt run"**
  2. to build project: "grunt build"
  
* if you are encountering ruby related issues, try running `gem install bundler; bundle install;` and then repeat the process above.

## Local dev

Running grunt will start a local server on port 9000 that will serve the project files.
By default the program will run with mock data, configured in _server-api.ts_. you can change the data or turn off the mocks by setting "enableMocks" property to _false_ in **"velocity.private.data.js"**.
When running without mocks, the local server also serves as a proxy, transferring all requests from "$server_url/api/$_request_" to "$server_url/api/$_request_".
Default server URL for local dev is http://localhost:9333/, as defined in [proxy-settings.json](https://github.com/guyrotem/google-translate-client/blob/master/proxy-settings.json) file (you are advised to use [google-translate-server](https://github.com/guyrotem/google-translate-server/) project).

Alternativelty, to simulate heroku production mode, run `grunt build` (to create the "dist" folder) and then `heroku local` to simulate starting the server on heroku. In this case, an _express_ app will serve the files from the _dist_ you have just built. see "web.js" file for more info. You may config a ".env" file to override heroku production settings:
```
PORT=5000
SERVER_BASE=http://localhost:9333
```
