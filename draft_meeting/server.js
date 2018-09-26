var express = require('express');
var app = express();

// app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/public/dist/public"));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('MeetingDB', 'root', 'root',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//test database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Cononeciton has been established successfuly")
    })
    .catch(err=>{
        console.log("Error in database connection: ", err)
    });

// app.get('/', (req, res) =>{
//     res.sendFile(__dirname+'/views/index.html');
// })

// FIRST MYSQL MODEL
// the set up
const User = sequelize.define('muser', {
    firstName: {
        type:Sequelize.STRING
    },
    lastName: {
        type:Sequelize.STRING
    }
}, {underscored: true, freezeTableName: true});
// the create  *force: true will drop the table if it already extis
User.sync({force:true}).then(() => {
    //Table created
    return User.create({
        firstName: 'Dnaiel',
        lastName: "Josuha"
    });
});

// //first query
// User.findAll().then(data => {
//     console.log(data)
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