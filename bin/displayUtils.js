const moment = require("moment");

module.exports = { formatHourly: formatHourly, formatDaily: formatDaily, formatCurrent: formatCurrent, formatAlerts: formatAlerts, formatConfig: formatConfig };

function formatHourly(data) {
    // hourly
    let display = `Hourly Forecast starting on ${moment.unix(data.hourly[0].dt).format("dddd MM/DD/YY")}\n`;

    for (var i = 0; i < data.hourly.length; i++) {
        display += `\n${moment.unix(data.hourly[i].dt).format("MM/DD/YY hh:mm a")}
Temp: ${data.hourly[i].temp} F
Weather: `;

        let weather = data.hourly[i].weather.map(i => `${i.main}`);
        display += "    " + weather.join(",");
    }

    return display;
}

function formatDaily(data) {
    // daily
    let display = `Daily Forecast starting on ${moment.unix(data.daily[0].dt).format("dddd MM/DD/YY")}\n`;

    for (var i = 0; i < data.daily.length; i++) {
        display += `\n${moment.unix(data.daily[i].dt).format("MM/DD/YY hh:mm a")}
Min/Max: (${data.daily[i].temp.min} F, ${data.daily[i].temp.max} F) 
Morning: ${data.daily[i].temp.morn} F
Day: ${data.daily[i].temp.day} F
Evening: ${data.daily[i].temp.eve} F
Night: ${data.daily[i].temp.night} F
Weather: 
`;

        let weather = data.daily[i].weather.map(i => `${i.main}`);
        display += "    " + weather.join(",");
    }

    return display;
}

function formatCurrent(data) {
    // current forecast
    let display = `Current Weather for ${moment.unix(data.current.dt).format("dddd MM/DD/YY")}
Temp:       ${data.current.temp} F
Feels Like: ${data.current.feels_like} F
Sunrise:    ${moment.unix(data.current.sunrise).format("hh:mm a")}
Sunset:     ${moment.unix(data.current.sunset).format("hh:mm a")} 
Weather: `;

    let weather = data.current.weather.map(i => `${i.main}`);
    display += weather.join(",");

    display += "\n\nCurrent Alerts:\n";
    if (data.alerts) {
        let alerts = data.alerts.map(i => `${i.event} > ${moment.unix(i.start).format("dddd hh:mm a")} - ${moment.unix(i.end).format("dddd hh:mm a")}`);
        display += alerts.join(',\n');
    } else {
        display += "No current alerts!";
    }

    return display;
}

function formatAlerts(data) {
    // alerts
    let display = "Current Alerts:\n";

    if (data.alerts) {
        let alerts = data.alerts.map(i => `${i.event} - From: ${moment.unix(i.start).format("dddd hh:mm a")} To: ${moment.unix(i.end).format("dddd hh:mm a")}`);
        display += alerts.join(',\n');
    } else {
        display += "No current alerts!";
    }

    return display;
}

function formatConfig(config) {
    let display = `Latitude: ${config.geo.lat}\nLongitude: ${config.geo.long}\nAPI Key: ${config.apiKey}`;

    return display;
}