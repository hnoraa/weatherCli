#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const moment = require("moment");
const request = require("request");
const fs = require("fs");

// set up arguments and options
const usage = chalk.hex("#83aaff")("\nUsage: weather ");
const options = yargs
    .usage(usage)
    .option("c", {alias: "config", describe: "Lists your configuration.", type: "boolean", demandOption: false})
    .option("h", {alias: "hourly", describe: "Get hourly forecast.", type: "boolean", demandOption: false})
    .option("d", {alias: "daily", describe: "Get daily forecast.", type: "boolean", demandOption: false})
    .option("a", {alias: "alerts", describe: "Get alerts.", type: "boolean", demandOption: false})
    .help()
    .argv;

let config = JSON.parse(fs.readFileSync(__dirname + "/config.local.json", "utf8"));

if (yargs.argv.c == true || yargs.argv.config == true) {
    console.log(boxen("Latitude:  " + config.lat + "\nLongitude: " + config.long + "\nAPI Key:   " + config.apiKey, {padding: 1, borderColor: "green", dimBorder: true}));
    return;
}

let url = config.apiUrl + config.position.urlPart;
url = url.replace("{lat}", Math.round(config.position.lat));
url = url.replace("{long}", Math.round(config.position.long));
url = url.replace("{key}", config.apiKey);

request.get(url, (e, r, b) => {
    if (e) {
        console.error(chalk.red(e));
    } else {
        let data = JSON.parse(b);
        let display = "";

        if (yargs.argv.h == true || yargs.argv.hourly == true) {
            display = `Hourly Forecast starting on ${moment.unix(data.hourly[0].dt).format("dddd MM/DD/YY")}\n`;
            for(var i = 0; i < data.hourly.length; i++) {
                display += `\n${moment.unix(data.hourly[i].dt).format("MM/DD/YY hh:mm a")}
Temp: ${data.hourly[i].temp} F, Feels Like: ${data.hourly[i].feels_like} F
Weather: `;
                let weather = data.hourly[i].weather.map(i => `${i.main}`);
                display += weather.join(",");
            }
        } else if (yargs.argv.d == true || yargs.argv.daily == true) {

        } else if (yargs.argv.a == true || yargs.argv.alerts == true) {
            display = "Current Alerts:\n";

            if(data.alerts) {
                let alerts = data.alerts.map(i => `${i.event} - From: ${moment.unix(i.start).format("dddd hh:mm a")} To: ${moment.unix(i.end).format("dddd hh:mm a")}`);
                display += alerts.join(',\n');
            } else {
                display += "No current alerts!";
            }
        } else {
            display = `Current Weather for ${moment.unix(data.current.dt).format("dddd MM/DD/YY")}
Temp:       ${data.current.temp} F
Feels Like: ${data.current.feels_like} F
Sunrise:    ${moment.unix(data.current.sunrise).format("hh:mm a")}
Sunset:     ${moment.unix(data.current.sunset).format("hh:mm a")} 
Weather:
            `;
            let weather = data.current.weather.map(i => `${i.main}`);
            display += weather.join(",");

            display += "\nCurrent Alerts:\n";
            if (data.alerts) {
                let alerts = data.alerts.map(i => `${i.event} > ${moment.unix(i.start).format("dddd hh:mm a")} - ${moment.unix(i.end).format("dddd hh:mm a")}`);
                display += alerts.join(',\n');
            } else {
                display += "No current alerts!";
            }
        }
        console.log(boxen(display, {padding: 1, borderColor: "green", dimBorder: true}));
    }
});