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


/*
exports.sendMessage = function (req, res) {
    console.log('send message');

    // user from somewhere
    // read channel .... receive back channel

   // channel.add messagw ( message )
   //// channel.addMessage(userA, message);        
   // mgr.updateChannel (channel)

   var userid =  req.params.channel;
   var message = req.params.channel;
   // var obj;
   mgr.retrieveChannelById(userid).then(

    (data) => {

        console.log("data" + data);
        obj = JSON.stringify(data);
        console.log("string" + obj);
         //obj = JSON.parse(data);
        // console.log("I am here" + obj);

         res.send(obj);
                 
        mgr.updateChannel(userid,obj).then(
         (message) => {
          res.send(message);
         }
         
         ).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
   
    }

    ).catch((err) => {
            console.log('db error = ' + err);
        }
   );
}
*/

  /*
    mgr.addChannel(message).then(
        
    (data) => {

        console.log("data" + data);
          res.send(data);
         }
         ).catch((err) => {
            console.log('db error = ' + err);
        }
     );   
   
}
  */

exports.getMessages = function (req, res) {
    console.log('get messages');
    
    //var channel =  mgr.createChannel("Team Channel");

    
    mgr.retrieveChannelById(req.params.channel).then(

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
    console.log('path=' + req);
    var parts = req.path.split('/');
    var userid = parts[3];
    console.log("params" + req.params.user);
    console.log("------userID" + userid);
    db.getUserInfoJSON(userid).then(
        (userJSON) => {
             res.setHeader('content-type', 'application/json');
            res.send(userJSON);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );}