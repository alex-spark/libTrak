var mongoose = require("mongoose");
var routTable = require('../app/models/routTable');
exports.viewCapacity=function(libname,callback) {
	
	
	/*var previousDate = new Date();
	previousDate.setMinutes(previousDate.getMinutes()-40000);
	routTable.count({saved_on:{$gt:previousDate}},function(err, routers){*/
	var previousDate = new Date();
	previousDate.setMinutes(previousDate.getMinutes()-40000);
	//routTable.count({saved_on:{$gt:previousDate}},function(err, routers){
	routTable.aggregate( [
   {
     $group: {
        _id: "$floor",
        lib_name:libname,
        total: { $count: "$mac" }
     }
   }
] ,function(err, routers){
	console.log(routers);
		if (!err) {
					 callback(routers);
				  }
		else	  {
					 console.log(err);
			      }
		
	})
}
