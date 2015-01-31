// Here define the 'router' model
//Location : /app/models/router.js


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;



var RouterSchema   = new Schema({
	
	//userid : {type: Number, unique: true},
	ip : {type : String },
	mac : {type :String, unique : true},
	device_name : {type:String,default:"myAndroid"},
	floor : {type : Number, default:4},
	lib_name : {type: String, default:"Marston"},
	saved_on : {type : Date, default : Date.now } // This is timestamp

});


module.exports = mongoose.model('routTable', RouterSchema);
