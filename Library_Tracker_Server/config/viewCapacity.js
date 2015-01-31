var mongoose = require("mongoose");
var routTable = require('../app/models/routTable');
exports.viewCapacity=function(libname,callback) {
	
	
	var previousDate = new Date();
	previousDate.setMinutes(previousDate.getMinutes()-4000000);
	//routTable.count({saved_on:{$gt:previousDate}},function(err, routers){
   routTable.aggregate(
   [
      { $match: {lib_name: libname, saved_on:{$gt:previousDate}}},
      { $group: { _id: "$floor", count: { $sum: 1 } } }
   ]
  /*
  routTable.group(
   {
     key: { floor: "$floor" },
     cond: {lib_name: libname, saved_on:{$gt:previousDate}},
     reduce: function( curr, result ) {
                 //result.total += curr.item.qty;
                 count++;
             },
     initial: { count : 0 }
   } */
   ,function(err, routers){
	 //console.log(routers);
		if (!err) {
					 callback(routers);
				  }
		else	  {
					 console.log(err);
			      }
		
	})
}
