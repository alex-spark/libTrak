
var friendSchema = require('../app/models/friend');
var routerSchema = require('../app/models/routTable');
var userSchema = require('../app/models/user');

/* Returns the names of the friends of a user */
exports.getfriendListofUser = function(req, res){
    var user  = req.param('user');
    var  fList = [];
    friendSchema.count({username : user}, function(err, count) {
          if(err){
            var arr = new Array('No');
          	res.json(arr);
            return;
          }
          if(count == 0){
          var arr = new Array('No Friend Exists');
            res.json(arr);
            return;
         // res.json("No Friend Exists");
          //console.log("There are " + count + " records.");
          //return;          
          }
          friendSchema.find({username : user}, {friendname:1, _id:0}, function(err, records){
            if(err)
              res.json("NO SUCH USER IN TABLE");
            else{
            	if(records == null){
            		res.json("No Such records Exist");
            	}
              fList = records[0].friendname;
              console.log({friends:fList});
              /*Send FriendList as response */
              res.json(fList);
            }
          }); 
    });
};

/* Returns the MacAddress of the User */

exports.getMacofUser = function(req, res){
	var user = req.param('user');
	userSchema.count({username: user}, function(err, count){
		console.log("There are " + count + "records.");
    if(count == 0){
      res.json("NO SUCH USER IN TABLE");
              return;
    }
		  userSchema.find({username : user}, {mac_address:1, _id:0}, function(err, records){
            if(err){
              res.json("NO SUCH USER IN TABLE");
              return;
            }
              

            else{
              console.log(records);
              /* Send Mac Address as Response*/
              res.json({mac:records[0].mac_address});
            }
          }); 
	});
}

/*Returns the Location of the Friends of the User */

exports.getFriendDetails = function(req, res){
	var macAddress = req.param('mac');
	routerSchema.count({mac: macAddress}, function(err, count){
    if(count == 0){
      res.json({location: 'not found'});
      return;
    }
		console.log("There are " + count + "records.");
		  routerSchema.find({mac : macAddress}, {floor:1, lib_name:1, saved_on:1, _id:0}, function(err, records){
            if(err)
              console.log("");
            else{
              console.log(records);
              console.log(records[0].floor);
              res.json({floor: records[0].floor, saved_on:records[0].saved_on, lib_name:records[0].lib_name, location:'found'});
            }
          }); 
	});
} 
