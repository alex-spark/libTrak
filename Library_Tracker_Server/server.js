// This file is the entry point for the app.

//===================================BASE SETUP======================================
// Create objects for all the dependency modules
var express = require('express');

var bodyParser = require('body-parser'); // extracting the contents of json
var morgan = require('morgan');        // logging
var mongoose   = require('mongoose');  // DB connection

var app = express();  // creating the express instance.
var port = 8191;  // If you change this , then change the port in sendJson.py as well.

//----------------BEGIN: PATH FOR ALL FUNCTIONS FOR DIFFERENT ROUTES SUPPORTED---------
var register = require('./config/register');
var changePassword = require('./config/changePassword');
var viewCapacity = require('./config/viewCapacity');
var viewSensorCapacity=require('./config/viewSensorCapacity');
var login = require ('./config/login')
var addfriend = require ('./config/addfriend')
var user = require('./app/models/user');
var sensor = require('./config/sensor');
//----------------BEGIN: PATH FOR ALL FUNCTIONS FOR DIFFERENT ROUTES SUPPORTED---------

// using the modules imported above.
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Cloud DB connection - log in to mongolab.com to see.
var username = "anurag"
var password = "anurag";
//var address = '@ds053090.mongolab.com:53090/mobilecomputingtest';
var address = 'localhost:27017/MCfinaldemo';
/*var username = "mobile"
var password = "mobile123";
var address = '@ds047940.mongolab.com:47940/mobile';
var url = 'mongodb://' + username + ':' + password + address;
*/

//var url = 'mongodb://' + username + ':' + password + address;
var url = 'mongodb://'+ address
//Connect DB
mongoose.connect(url);
module.exports = mongoose.connection

//--------------------BEGIN: CODE FOR CALLING THE ROUTER-PYTHON SCRIPT REGULARLY ---------------------

var fs = require("fs");
var outputFilepath = "./output.txt";
var routTable = require('./app/models/routTable');

var pythonScriptCallingFunction = function(){

	var PythonShell = require('python-shell');
	var scriptpath = "../attachedDevices.py";

	PythonShell.run(scriptpath, function (err) {
		if (err)
			console.log(err);

	});



	require('readline').createInterface({
		input: fs.createReadStream(outputFilepath),
		terminal: false
	}).on('line', function(line){
   //console.log('Line: ' + line);
   var dataArr = line.split(' ');

   var newRouterData = new routTable();
   newRouterData.ip = dataArr[0];
   newRouterData.mac = dataArr[1];
   newRouterData.device_name = dataArr[2];
   newRouterData.floor = 4;
   newRouterData.lib_name = "Marston";
   newRouterData.saved_on = new Date();


   var conditions = { mac: dataArr[1] };
   var update = { $set: { saved_on: new Date(), ip:dataArr[0],floor : 4, lib_name:"Marston",device_name:dataArr[2]}};
   var options = { upsert: true };
   var mycallback = function(err,result){
   	if(err)
   		console.log(err);
   }

   routTable.update(conditions, update, options, mycallback);



});//End of the linewise dealing function


}// End of function : pythonSciptCalling function

var setDelay = 10*1000; // This is the delay time for each call. Its in milli seconds.

console.log("Router table updating")

setInterval(pythonScriptCallingFunction, setDelay);


//--------------------END: CODE FOR CALLING THE ROUTER-PYTHON SCRIPT REGULARLY ---------------------



//------------------CODE FOR SENSOR ----------------------------------------------------------------

var net = require('net');

var HOST = '192.168.1.5';
var PORT = 1338;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
        console.log(data);
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');
       sensor.sensor(data, function (found) {
			//console.log(found);
			//res.json(found);
		});

    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(PORT, HOST);

console.log('Server for sensor listening on ' + HOST +':'+ PORT);



//==================================ROUTE SETUP=====================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
// do logging
//console.log('Pre-processing happening.');
next();
});

// This is just for testing. Android Client shall not handle this.
router.get('/', function(req, res) {
	res.json({ message: '!! welcome to our LibTrac !!' });
	
});

// Begin : Registration done
router.route('/register')

.post(function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var email_id = req.body.email_id;
	var mac_address = req.body.mac_address;
		//console.log('The username '+username);
		register.register(username, password, email_id, mac_address, function (found) {
			console.log(found);
			res.json(found);
		});
	});

router.route('/sensor')

.post(function(req, res){
	
	//console.log("got ittt")
	var count = req.body.count;
	
		//console.log('The username '+username);
		sensor.sensor(count, function (found) {
			console.log(found);
			//res.json(found);
		});
	});

//Begin: login done
router.route('/login')

.post(function(req, res){
	var username = req.body.username;
	var password = req.body.password;
		//console.log('The username '+username);
		login.login(username, password, function (found) {
			console.log(found);
			res.json(found);
		});
	});

//Begin: add friend
router.route('/addfriend')

.post(function(req, res){
	var username = req.body.username;
	var friendname = req.body.friendname;
	
	user.find({username: friendname}, function(err, friend)
	{
		var len = friend.length
		if(len == 0){
			console.log("Friend does not exist in our database", false)
			res.json({'message' : "Friend does not exist in DB", 'boolean' : false})
			return;	
		}
		else {
			addfriend.addfriend(username, friendname, function (found) {
			console.log(found);
			res.json({'message' : "Friend added", 'boolean' : true});
		});
		}
		})

		//console.log('The username '+username);
		
	});

//Begin : changePassword
router.route('/changePassword')
.post(function(req, res){
	var username = req.body.username;
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	changePassword.changePassword(username, oldPassword, newPassword, function (result){
		console.log(result);
		res.json(result);
	});

});

//---------------------------BEGIN : ROUTES BY RASHMI----------------------------------------------
router.route('/viewCapacity')
router.get('/viewCapacity', function(req, res) {
	var libraryList = ['Marston', 'Smathers', 'West'] ;
	
	res.json(libraryList);
});

/*var lib_capacity_marston=120;
router.route('/viewCapacity/*')
router.get('/viewCapacity/*', function(req, res) {
	var lib_name=req.url;
	lib_name=lib_name.slice(14);

	viewCapacity.viewCapacity(lib_name,function (routerCount) {
		console.log(routerCount,"routerCount")
		viewSensorCapacity.viewSensorCapacity(lib_name,function (sensorCount){
			console.log(sensorCount,"sensorCount")
			var cap=Math.round((routerCount+sensorCount)*100/(2*lib_capacity_marston));
			cap=cap+"%";
			res.json({"lib_capacity":cap});
		});
	});

});
*/

var lib_capacity_marston=360;
var floor_max_cap=30;
var floor_no1=0,floor_no2=0,floor_no3=0; floor_no4 = 0; floor_no5=0;
var floor_no1_sensor=0,floor_no2_sensor=0,floor_no3_sensor=0; floor_no4_sensor = 0; floor_no5_sensor=0;
router.route('/viewCapacity/*')
router.get('/viewCapacity/*', function(req, res) {
	var lib_name=req.url;
	lib_name=lib_name.slice(14);

	viewCapacity.viewCapacity(lib_name,function (routerCount) {
		console.log(routerCount,"routerCount")
		for (var i = 0; i < routerCount.length; i++) {
				if(routerCount[i]._id==1) floor_no1=routerCount[i].count;
				else if(routerCount[i]._id==2) floor_no2=routerCount[i].count;
				else if(routerCount[i]._id==3) floor_no3 = routerCount[i].count;
				else if(routerCount[i]._id==4) floor_no4 = routerCount[i].count;
				else floor_no5=routerCount[i].count;
			};
		viewSensorCapacity.viewSensorCapacity(lib_name,function (sensorCount){
			console.log(sensorCount,"sensorCount")
			
			for (var i = 0; i <sensorCount.length; i++) {
				if(sensorCount[i]._id==1) floor_no1+=sensorCount[i].count;
				else if(sensorCount[i]._id==2) floor_no2+=sensorCount[i].count;
				else if(sensorCount[i]._id==3) floor_no3 += sensorCount[i].count;
				else if(sensorCount[i]._id==4) floor_no4 += sensorCount[i].count;
				else floor_no5+=sensorCount[i].count;
			};
			//if(sensorCount)
			//var cap=Math.round((routerCount+sensorCount)*100/(2*lib_capacity_marston));
			//cap=cap+"%";//res.json({"lib_capacity":cap});
			floor_no1=Math.round((floor_no1)*100/(2*floor_max_cap)); floor_no1=floor_no1+"%";
			floor_no2=Math.round((floor_no2)*100/(2*floor_max_cap)); floor_no2=floor_no2+"%";
			floor_no3=Math.round((floor_no3)*100/(2*floor_max_cap)); floor_no3=floor_no3+"%";
			floor_no4=Math.round((floor_no4)*100/(2*floor_max_cap)); floor_no4=floor_no4+"%";
			floor_no5=Math.round((floor_no5)*100/(2*floor_max_cap)); floor_no5=floor_no5+"%";
			/*floor_no1=10;
			floor_no2=100;floor_no3=10;*/
			console.log();
			res.json({'floor1':floor_no1, 'floor2':floor_no2, 'floor3':floor_no3, 'floor4' : floor_no4,
				'floor5' : floor_no5})
		});
	});

});
//---------------------------END: ROUTES BY RASHMI----------------------------------------------



/*<--------------------------SATYA ROUTES *---------------------------->*/


var friendModule = require('./FriendFinder');

/*Get The Friend List of the User*/
app.get('/fetch/:user', friendModule.getfriendListofUser);
/*Get the Mac address of the user */
app.get('/fetch/mac/:user', friendModule.getMacofUser);
/*Get the location of friends from the Router table */
app.get('/fetch/location/:mac', friendModule.getFriendDetails);


/*--------------------------- END OF SATYA ROUTES -------------------*/

// ---------------------------ALL OUR ROUTES END HERE--------------------------------------------


// all of our routes will be prefixed with /
app.use('/', router);


// START THE SERVER
// =============================================================================

app.listen(port);
console.log('The server runs on port ' + port);
