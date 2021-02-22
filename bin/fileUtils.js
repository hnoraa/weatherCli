const fs = require("fs");
const configFileName = __dirname + "/config.local.json";

module.exports = { fileExists: fileExists, getConfig: getConfig, writeConfig: writeConfig };

function fileExists() {
    return fs.existsSync(configFileName);
}

function getConfig() {
    return JSON.parse(fs.readFileSync(configFileName, "utf8"));
}

function writeConfig(config) {
    if (config) {
        fs.writeFileSync(configFileName, JSON.stringify(config), { encoding: 'utf8', flag: 'w' });
    }
}