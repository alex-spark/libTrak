var sensors = require('../app/models/sensors');
exports.viewSensorCapacity= function(libname,callback)
{
	
		var previousDate = new Date();
		previousDate.setMinutes(previousDate.getMinutes()-400000000);
		//sensors.count({saved_on:{$gt:previousDate}}
		sensors.aggregate(
   		[
      		{ $match: {libname: libname}},
      		{ $group: { _id: "$floornumber", count: { $sum: "$count" } }} 
   		]
			,function(err, sensorsData){
		//console.log(sensorsData);
		if (!err) {			         
					 callback(sensorsData);
				  }
		else	  {
					 console.log(err)
			      }
		})
}