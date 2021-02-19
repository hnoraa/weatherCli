#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const request = require("request");
const fs = require("fs");

// set up arguments and options
const usage = chalk.hex("#83aaff")("\nUsage: weather ");
const options = yargs
    .usage(usage)
    .option("g", {alias: "geo", describe: "Use Geolocation (i.e. Lat/Long).", type: "boolean", demandOption: false})
    .option("c", {alias: "config", describe: "Lists your configuration.", type: "boolean", demandOption: false})
    .help(true)
    .argv;

let config = JSON.parse(fs.readFileSync("./bin/config.json", "utf8"));

if (yargs.argv.c == true || yargs.argv.config == true) {
    console.log(boxen("Latitude:  " + config.lat + "\nLongitude: " + config.long + "\nAPI Key:   " + config.apiKey, {padding: 1, borderColor: "green", dimBorder: true}));
    return;
}

if(yargs.argv.g == true || yargs.argv.geo == true) {

} else {

}

let url = config.apiUrl + config.position.urlPart;
url = url.replace("{lat}", Math.round(config.position.lat));
url = url.replace("{long}", Math.round(config.position.long));
url = url.replace("{key}", config.apiKey);

request.get(url, (e, r, b) => {
    if (e) {
        console.error(chalk.red(e));
    } else {
        console.log(b);
    }
});