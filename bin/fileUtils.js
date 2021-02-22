const fs = require("fs");
const configFileName = __dirname + "/config.local.json";

module.exports = { fileExists: fileExists, getConfig: getConfig };

function fileExists() {
    return fs.existsSync(configFileName);
}

function getConfig() {
    return JSON.parse(fs.readFileSync(configFileName, "utf8"));
}