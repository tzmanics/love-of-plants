'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
const ambientlib = require('ambient-attx4');

const ambient = ambientlib.use(tessel.port['A']);
const moisture = tessel.port.B.pin[7];

ambient.on('ready', function () {
  ambient.setLightTrigger(0.1);
})

ambient.on('light-trigger', function (data) {
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