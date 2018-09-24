var express = require('express');
var app = express();

// app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/public/dist/public"));

// app.get('/', (req, res) =>{
//     res.sendFile(__dirname+'/views/index.html');
// })

// app.get('/start', (req, res) =>{
//     res.sendFile(__dirname+'/views/start.html');
// })
// app.get("/meeting", function(req,res){
//     res.sendFile(__dirname+'/views/clickable_meeting.html');
// })
// app.get("/records", function(req,res){
//     res.sendFile(__dirname+'/views/records.html');
// })
var path = require('path');
app.get('*', (req, res)=>{
    res.sendFile(path.resolve('./public/dist/public/index.html'))
} )
app.listen(8000);