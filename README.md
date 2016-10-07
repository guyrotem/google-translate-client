# google-translate-client
Multi-lingual sample app for the [google-translate-server (proxy)](https://github.com/guyrotem/google-translate-server/).
It allows you to translate phrases to multiple languages simultaneously, using the Google translate API proxy, but there's whole lot of other stuff you can do, it's just a sample app.

## Setup

=> you must have bower and npm properlly installed on your computer.

1.  clone the repo to your computer
2.  run **"npm install; bower install;"** to fetch all npm/bower dependencies.
3.  run project
  1. for local dev: **"grunt run"**
  2. to build project: "grunt build"

## Local dev

Running grunt will start a local server on port 9000 that will serve the project files.
By default the program will run with mock data, configured in _server-api.ts_. you can change the data or turn off the mocks by setting "enableMocks" property to _false_ in **"velocity.private.data.js"**.
When running without mocks, the local server also serves as a proxy, transferring all requests from ".../api/$_request_" to "$server_url/$_request_".
Default server URL for local dev is http://localhost:9333/, as defined in [proxy-settings.json](https://github.com/guyrotem/google-translate-client/blob/master/proxy-settings.json) file (you are advised to use [google-translate-server](https://github.com/guyrotem/google-translate-server/) project).
