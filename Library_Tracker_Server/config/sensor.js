var sensors = require('../app/models/sensors');



exports.sensor = function(count, callback)
{

	var newSensor = new sensors({
		sensor_id :1,
		count:count,
		floornumber: 4,
		libname: "Marston",
	
	});

	var conditions = {sensor_id:1};
	var update = {$set :{sensor_id: 1, count: count, floornumber: 4, libname: "Marston"}};
	var options = {upsert: true};
	var mycallback = function(err,result){
		if(err)
			console.log(err)
	}
	sensors.update(conditions, update, options, mycallback)
	//newSensor.save()
}