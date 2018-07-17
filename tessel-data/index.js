'use strict';

const tessel = require('tessel');
const ambientlib = require('ambient-attx4');
const firebase = require('firebase');

const ambient = ambientlib.use(tessel.port['A']);
const moisture = tessel.port.B.pin[7];

const config = {
  apiKey: "AIzaSyCTYB1-h-j2wBbksyKXKWQNmac-T3tpwYA",
  authDomain: "love-of-plants.firebaseapp.com",
  databaseURL: "https://love-of-plants.firebaseio.com",
  projectId: "love-of-plants",
  storageBucket: "love-of-plants.appspot.com",
  messagingSenderId: "255399180971"
}

const db = firebase.database();
const ref = db.ref('plants');
const lightSensorRef = ref.child('sensor/lightSensor');

firebase.initializeApp(config);

ambient.on('ready', function () {
  ambient.setLightTrigger(0.1);
})

ambient.on('light-trigger', function (data) {
   lightSensorRef.push().set({
    data: data.toFixed(4) * 100,
    time: Date.now()
  });

  console.log('The plant is getting direct sun ☀:', data)

  ambient.clearLightTrigger();
  setTimeout(function () {
    ambient.setLightTrigger(0.1);
  }, 1500)
})

ambient.on('error', function (err) {
  console.log(err);
})

setInterval(() => {
  moisture.analogRead((error, number) => {

    if (error) {
      throw error;
    }
    
    if (number < 0.4) {
      console.log('Plant needs water! ', number)
    }
  });
}, 1500);