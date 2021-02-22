module.exports = { createUrl: createUrl };

function createUrl(config) {
    // configure the url
    let url = config.apiUrl + config.position.urlPart;
    url = url.replace("{lat}", config.position.lat);
    url = url.replace("{long}", config.position.long);
    url = url.replace("{key}", config.apiKey);

    return url;
}