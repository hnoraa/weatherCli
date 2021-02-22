module.exports = { createUrl: createUrl };

function createUrl(config) {
    // configure the url
    let url = config.apiUrl + config.geo.urlPart;
    url = url.replace("{lat}", config.geo.lat);
    url = url.replace("{long}", config.geo.long);
    url = url.replace("{key}", config.apiKey);

    return url;
}