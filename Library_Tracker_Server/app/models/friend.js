var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FriendSchema   = new Schema({
	
	username : {type: String, unique: true},
	friendname : Array
});


module.exports = mongoose.model('friend', FriendSchema);