var mongoose = require('mongoose');
var user = require('../app/models/user');
var success = 0;

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.changePassword = function(username,oldPassword,newPassword,callbackfn) {

	//console.log(oldPassword);
	//console.log(newPassword);
	user.find({
		'username':username,
		'password':encrypt(oldPassword)
	},function(err,userReceived){
//console.log(userReceived.length);
if(userReceived==0){
	//console.log(err)
	callbackfn(false);

}
	
else{
	if(userReceived.length==1){
		//console.log(username);
		console.log("zdfsdfsfdsf")
		user.findOne({username:username},function(err,doc){
			doc.password = encrypt(newPassword);
			doc.save();
			console.log("changePassword")
			callbackfn(true);
		});
//callbackfn({res:"Done save"});
}
//callbackfn(false);
}
})
}

