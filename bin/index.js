#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const boxen = require("boxen");
const request = require("request");
const fileUtils = require("./fileUtils.js");
const urlUtils = require("./urlUtils.js");
const displayUtils = require("./displayUtils.js");

// check that the config file exists
if (!fileUtils.fileExists()) {
    console.error(chalk.red("Config file does not exist, please ensure that config.local.json exists in your /bin directory!"));
    return;
}

// load config
let config = fileUtils.getConfig();

// set up arguments and options
const usage = chalk.hex(config.theme.usageTextColor)("\nUsage: weather <flag>[options]");
const options = yargs
    .usage(usage)
    .option("c", {alias: "config", describe: "Lists your configuration.", type: "boolean", demandOption: false})
    .option("h", {alias: "hourly", describe: "Get hourly forecast.", type: "boolean", demandOption: false})
    .option("d", {alias: "daily", describe: "Get daily forecast.", type: "boolean", demandOption: false})
    .option("a", {alias: "alerts", describe: "Get alerts.", type: "boolean", demandOption: false})
    .help()
    .argv;

// -c flag
if (yargs.argv.c == true || yargs.argv.config == true) {
    console.log(boxen(chalk.hex(config.theme.textColor)(displayUtils.formatConfig(config)), {padding: config.theme.padding, borderColor: config.theme.borderColor, dimBorder: config.theme.dimBorder}));
    return;
}

// get the url
let url = urlUtils.createUrl(config);

// get data
request.get(url, (e, r, b) => {
    if (e) {
        // error
        console.error(chalk.hex(config.theme.errorTextColor)(e));
    } else {
        let data = JSON.parse(b);
        let display = "";

        // format the data based on flag (default, no flag == current forecast)
        if (yargs.argv.h == true || yargs.argv.hourly == true) {
            display = displayUtils.formatHourly(data);
        } else if (yargs.argv.d == true || yargs.argv.daily == true) {
            display = displayUtils.formatDaily(data);
        } else if (yargs.argv.a == true || yargs.argv.alerts == true) {
            display = displayUtils.formatAlerts(data);
        } else {
            display = displayUtils.formatCurrent(data);
        }

        // display the results
        console.log(boxen(chalk.hex(config.theme.textColor)(display), {padding: config.theme.padding, borderColor: config.theme.borderColor, dimBorder: config.theme.dimBorder}));
    }
});