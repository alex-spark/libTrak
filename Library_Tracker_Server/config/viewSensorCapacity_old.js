var sensors = require('../app/models/sensors');
exports.viewSensorCapacity= function(libname,callback)
{
	
		var previousDate = new Date();
		previousDate.setMinutes(previousDate.getMinutes()-40000);
		sensors.count({saved_on:{$gt:previousDate}},function(err, sensorsData){
		console.log(sensorsData);
		if (!err) {			         
					 callback(sensorsData);
				  }
		else	  {
					 console.log(err)
			      }
		})
}