var mongoose = require('mongoose');
var user = require('../app/models/user');

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

exports.login = function(username,password,callback) {
  //console.log('The username '+username);
  //console.log('The password '+password);
  var newUser = new user ({
    username : username,
    password : encrypt(password),
  });

  user.find({username:username, password:encrypt(password)}, function(err, users){
    var len = users.length;
    if(len == 0){
      //newUser.save(function(err){
        callback(false);
      
    }
    else{
      callback(true);
    }
  })
}