// Here define the 'user' model
//Location : /app/models/user.js


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


// This schema for user may or may not be final. Mac-Address and some more columns may come.

var CapacitySchema   = new Schema({
	
	userid: {type: String, unique: true},
	ip_address : String,
	mac_address:String,
	device_name:String,
	floor_num: Number,
	lib_name:String,
	insert_date:Date
});

//console.log("inside capacity.js");
module.exports = mongoose.model('capacity', CapacitySchema);