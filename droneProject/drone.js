const express = require('express');
const app = express();
const path = require('path');



//setting up the drone
const Drone = require('parrot-minidrone');
const drone = new Drone({
    autoconnect: true,
});
drone.on('connected', () => drone.takeOff());
drone.on('flightStatusChange', (status) => {
    if (status === 'hovering') {
        drone.land();
        process.exit();
    }
});

//angular routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
});

// setup localhost:8888
app.listen(8888);
