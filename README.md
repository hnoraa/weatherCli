# weatherCli
Command Line tool to get weather using [Open Weather Map](https://openweathermap.org/). 

# Todo
 - [X] Refactor
 - [ ] Add to NPM registry
 - [X] Daily forecast
 - [ ] Configuration wizard
 - [ ] Install scripts
 - [ ] Setup script
 - [ ] Detect first time use
 - [ ] Ability to use City,Country,State,Zip instead of lat/long
 - [X] Error handling

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
    "theme": {
        "padding": 1,
        "borderColor": "green",
        "dimBorder": true,
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "usageTextColor": "#83aaff",
        "errorTextColor": "#ff0000",
        "warningTextColor": "#00ffff"
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
From the bin directory, copy config.json to config.local.json. You will need to provide your Open Weather Map API Key and the latitude/longitude of the location you want weather for.

From the root directory run:
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

# Theming
``` javascript
 "theme": {
        "padding": 1,
        "borderColor": "green",
        "dimBorder": true,
        "backgroundColor": "#000000",
        "textColor": "#ffffff",
        "usageTextColor": "#83aaff",
        "errorTextColor": "#ff0000",
        "warningTextColor": "#00ffff"
    },
```
Theming can be configured in the config.local.json file. Above is the default theme.
The boxen package uses padding, borderColor and dimBorder to define the box styling.

For more information see [Boxen](https://github.com/sindresorhus/boxen#readme).

# Credits
This was adapted from a tutorial on hackernoon.
[How to build a command line utility cli with nodejs by @rushankhan](https://hackernoon.com/how-to-build-a-command-line-utility-cli-with-nodejs-gm24315b), 
[RushanKhan1](https://github.com/RushanKhan1)

- [Boxen](https://github.com/sindresorhus/boxen#readme)
- [Chalk](https://github.com/chalk/chalk#readme)
- [Yargs](http://yargs.js.org/)
- [Open Weather Map](https://openweathermap.org/)
- [Moment](https://momentjs.com/)