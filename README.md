# weatherCli
Command Line tool to get weather

# Requirements
 - https://openweathermap.org/ account & api key
 - Node.js version: ^v12.17.0
 - npm version: ^6.14.4

# Configuration
Configuration is done in bin/config.local.json, typical configuration below:

``` javascript
{
    "position": {
        "lat": "",
        "long": "",
        "urlPart": "?lat={lat}&lon={long}&appid={key}&units=imperial"
    },
    "city": "",
    "state": "",
    "country": "",
    "zip": "",
    "apiUrl": "https://api.openweathermap.org/data/2.5/onecall",
    "apiKey": ""
}
```

# Dependencies
 - boxen: ^5.0.0
 - chalk: ^4.1.0
 - moment: ^2.29.1
 - request: ^2.88.2
 - yargs: ^16.2.0

# Installation
``` commandline
npm install
npm install -g .
```

# Examples
- Get current weather: ```weather```
- Get hourly forecast: ```weather -h```
- Get daily forecast: ```weather -d```
- Get alerts: ```weather -a```
- Show version: ```weather --version```
- Show help: ```weather --help```

# Arguments
| flag  | alias  | description  |
|---|---|---|
|   | --version  | Show version number  |
| -c  | --config  | Lists your configuration.  |
| -h  | --hourly | Get hourly forecast.   | 
| -d  | --daily  | Get daily forecast.  | 
| -a  | --alerts  | Get alerts.  | 
|   | --help  | Show help  | 

# Credits
This was adapted from a tutorial on hackernoon.
https://hackernoon.com/how-to-build-a-command-line-utility-cli-with-nodejs-gm24315b