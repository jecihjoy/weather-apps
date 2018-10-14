'use strict';
const conn = require('./database-conn');

function getData() {
  return new Promise((resolve, reject) => {
    let querry = "SELECT * from tbl_weather, tbl_moods, tbl_activities  WHERE tbl_weather.w_id = tbl_activities.w_id AND tbl_weather.w_id = tbl_moods.w_id";
    return conn.executeQuery(querry).then((data) => {
      if (data) {
        resolve(data);
      } else {
        throw err;
      }
    }).catch((err) => {
      console.log('error', err);
    })
  });
}
function saveWeather(data) {
  var date = data.date;
  var temp = data.temp;
  var main = data.main;
  var desc = data.desc;
  return new Promise((resolve, reject) => {
    let querry = "INSERT INTO `tbl_weather` (`w_date`,`w_temp`, `w_main`, `w_description`) VALUES ('" + date + "', '" + temp + "', '" + main + "', '" + desc + "')";
    return conn.executeQuery(querry).then((result) => {
      if (result) {
        resolve(result.insertId);
      } else {
        resolve(0);
      }
    }).catch((err) => {
      console.log('error', err);
    })
  });
}
function saveMoodActivities(WeatherData, mood, activities) {
  var d_mood = mood.mood;
  var d_activities = activities.activities;
  return new Promise((resolve, reject) => {
    saveWeather(WeatherData).then((weatherId) => {

      conn.executeQuery("INSERT INTO `tbl_activities` (`w_id`, `activity`) VALUES ('" + weatherId + "', '" + d_activities + "')").then((data) => {
        conn.executeQuery("INSERT INTO `tbl_moods` (`w_id`, `mood`) VALUES ('" + weatherId + "', '" + d_mood + "')").then((result) => {
          resolve(result);
        })
      })
    })
    resolve('data inserted successfully');
  });
}

module.exports = {
  saveMoodActivities: saveMoodActivities,
  getData: getData
}