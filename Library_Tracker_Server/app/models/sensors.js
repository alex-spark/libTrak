var mongoose =require("mongoose");
var Schema       = mongoose.Schema;

var SensorSchema   = new Schema({
	
	//id: {type: Number, unique: true},
	sensor_id : Number,
	count:Number,
	floornumber: Number,
	libname: String,
	//saved_on : {type : Date, default : Date.now }

});

module.exports = mongoose.model('sensors', SensorSchema);