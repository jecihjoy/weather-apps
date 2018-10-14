'use strict';
const weather_service = require('../data/weather-endpoints');

module.exports = function() {
    var routes = [
        {
            method: 'POST',
            path: '/saveData',
            config: {
                handler: function (request, h) {
                    console.log(request.payload);
                    var weatherData = request.payload.weatherInfo;
                    var moods = request.payload.moodInfo;
                    var activities = request.payload.activities;
                    return new Promise((resolve, reject) => {
                        weather_service.saveMoodActivities(weatherData, moods, activities).then((success) => {
                          resolve(success);
                        }).catch((err) => {
                            console.log(err);
                          reject(err);
                        });
                      });
                },
                description: 'Endpoint for testing',
                tags: ['api', 'weatherapp']
            }
        },
        {
            method: 'GET',
            path: '/getData',
            config: {
                handler: function (request, h) {
                    console.log(request.payload);
                    return new Promise((resolve, reject) => {
                        weather_service.getData().then((result) => {
                          resolve(result);
                        }).catch((err) => {
                            console.log(err);
                          reject(err);
                        });
                      });
                },
                description: 'Endpoint getting data',
                tags: ['api', 'weatherapp']
            }
        },
        {
            method: 'GET',
            path: '/test',
            config: {
                handler: function (request, h) {
                    return 'hello weather22'
                },
                description: 'Endpoint for testing',
                tags: ['api', 'weatherapp']
            }
        }
    ];
    return routes;
}();