// rest handler
//var db =  require('./slack.js');

var slack = require("./slack");
var User= slack.User;
var Channel = slack.Channel;
var Manager = slack.Manager;

var mgr = slack.mgr;
var db = require('./dbHandler.js');
    
exports.sendMessage = function (req, res) {
  console.log('send message');
   var userid =  req.params.channel;
   var message = JSON.stringify(req.body);
  // console.log ("userid" + userid);
   // console.log ("meesage" + message);
    console.log(req.body);
  mgr.updateChannel(userid,message).then(
  (data) => {

        console.log("data" + data);
          res.send(data);
         }
         ).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
}

//Start : add existing channel to the given user
exports.addChannel = function (req, res) {
    console.log('Add channel to the user');
	console.log('req: ' + req);
    console.log('path= ' + req.path);
    var parts = req.path.split('/');
	console.log('user id: ' + parts[3] + ", channel id: "+ parts[5])
	if (parts.length > 5 && parts[4] == 'addChannel') {
		console.log('calling update statement for channel id ' + parts[5]);
		var userid = parts[3]; 
		var channelid = parts[5]; 		
		db.addChannel(userid, channelid).then(
        (userJSON) => {
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
			});
	} else {
		
	}

	}
//End

//Start : Remove Channel from given user
exports.removeChannel = function (req, res) {
    console.log('Remove Channel from given user');
	console.log('req: ' + req);
    console.log('path= ' + req.path);
    var parts = req.path.split('/');
	console.log('user id: ' + parts[3] + ", channel id: "+ parts[5])
	if (parts.length > 5 && parts[4] == 'removeChannel') {
		console.log('calling update statement for channel id ' + parts[5]);
		var userid = parts[3]; 
		var channelid = parts[5]; 		
		db.removeChannel(userid, channelid).then(
        (userJSON) => {
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
			});
	} else {
		
	}

	}
//End

//Start : add new channel to the given user
exports.addNewChannel = function (req, res) {
    console.log('Add New channel');
	console.log('req: ' + req);
    console.log('path= ' + req.path);
    var parts = req.path.split('/');
	console.log('user id: ' + parts[3] + ", channel name: "+ parts[5])
	if (parts.length > 5 && parts[4] == 'addNewChannel') {
		console.log('calling update statement for channel name ' + parts[5]);
		var userid = parts[3]; 
		var channelname = parts[5]; 		
		db.addNewChannel(channelname, userid).then(
        (userJSON) => {
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
			});
	} else {
		
	}

	}
//End

// list all the users

exports.user = function (req, res) {
    console.log('get user');
   
    db.getUserList().then(
        (userJSON) => {
            res.setHeader('content-type', 'application/json');
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );}
//End

//Start : List all the channels
exports.channel = function (req, res) {
 console.log('get Channel');
   
    db.getChannelList().then(
        (userJSON) => {
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );}

//End


exports.getMessages = function (req, res) {
    /*
    console.log('get messages');
    console.log("id" + req.params.channel);   
    mgr.retrieveChannelById(req.params.channel).then(
*/
    var userid = req.params.channel;
     db.getChannelJSON(userid).then(
    (data) => {

        console.log("data" + data);
          res.setHeader('content-type', 'application/json');
          res.send(data);
         }).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
}

/*
exports.getMessages = function (req, res) {
     var userid = req.params.channel;

     db.getChannelJSON(userid).then(
        (data) => {
           res.send(data);
         }).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
}

*/

// update channel message start
/*
exports.getMessages = function (req, res) {
    console.log('update messages');
    
    //var channel =  mgr.createChannel("Team Channel");
    
    mgr.updateChannel(req.params.channel).then(

    (data) => {
          res.send(data);
         }).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
}
*/


exports.getfollowedtweets = function (req, res) {
    console.log('getfollowedtweets');
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getFollowedTweetsJSON(userid).then(
        (tweetsJSON) => {
            console.log("---" + tweetsJSON);
            res.send(tweetsJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );   
}

exports.getTeam = function (req, res) {
    console.log('get team');
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];

    db.getFollowedTweetsJSON(userid).then(
        (tweetsJSON) => {
            res.send(tweetsJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );   
}

exports.getuserinfo = function (req, res) {
    console.log('getuserinfo');
    console.log('getuserinfo path= ' + req);
    var parts = req.path.split('/');
    var userid = parts[3];
    console.log("getuserinfo params " + req.params.user);
    console.log("------ user/" + userid);
    db.getUserInfoJSON(userid).then(
        (userJSON) => {
             res.setHeader('content-type', 'application/json');
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );
}