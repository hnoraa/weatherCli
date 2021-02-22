const prompt = require("prompt");
const fileUtils = require("./fileUtils.js");

module.exports = { setGeo: setGeo, setApi: setApi };

function setGeo() {
    let config = fileUtils.getConfig();
    let schema = {
        properties: {
            latitude: {
                type: "number",
                message: "Please enter a valid latitude!",
                required: true
            },
            longitude: {
                type: "number",
                message: "Please enter a valid longitude!",
                required: true
            }
        }
    };

    prompt.start();

    prompt.get(schema, function (e, r) {
        if (e) {
            // error
            return;
        }

        // write to the config file
        config.geo.lat = r.latitude;
        config.geo.long = r.longitude;

        fileUtils.writeConfig(config);
    });
}

function setApi() {
    let config = fileUtils.getConfig();
    let schema = {
        properties: {
            key: {
                type: "string",
                message: "Please enter a valid string!",
                required: true
            }
        }
    };

    prompt.start();

    prompt.get(schema, function (e, r) {
        if (e) {
            // error
            return;
        }

        // write to the config file
        config.apiKey = r.key;

        fileUtils.writeConfig(config);
    });
}