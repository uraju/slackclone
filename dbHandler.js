var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.initdb = initdb;
function initdb() {
    var filename = 'slack.db';
    var dbexists = false;
    try {
        fs.accessSync(filename);
        dbexists = true;
    } catch (ex) {
        dbexists = false;
    }

    var db = new sqlite3.Database('slack.db');

    if (!dbexists) {
        db.serialize(function() {
            var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                        "(ID         INTEGER    PRIMARY KEY   AUTOINCREMENT," +
                        " NAME        CHAR(50)                    NOT NULL)"; 

            var createChannelTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                        "(ID       INTEGER    PRIMARY KEY AUTOINCREMENT," +
                        " STUFF     VARCHAR(20000)   NOT NULL)";

           

            db.run(createUserTableSql);
            db.run(createChannelTableSql);
           
            var insertUserSql = "INSERT INTO USER (ID, NAME) " +
                "VALUES (1,   'Shuvo Ahmed')," +
                    "(2,     'Abu Moinuddin')," +
                    "(3, 'Charles Walsek')," +
                    "(4, 'Beiying Chen')," +
                    "(5,  'Swarup Khatri');"; 
            
                               

            var insertChannelSql = "INSERT INTO CHANNEL (ID, STUFF) " +
                "VALUES (1 ,     'Welcome to Tweeter Clone'), " +
                        "(2,        'Tweet by Abu'), " +
                        "(3,        'Lets do Node.js'), " +
                        "(4,        'Lunch Time!'), " +
                        "(5,        'We are in 2-nd week of boot camp training!'), " +
                        "(6,      'SQLite is easy configuration!'), " +
                        "(7,      'Rio Olympic!'), " +
                        "(8,      'Welcome to 2nd week of boot camp...'), " +
                        "(9,    'SQLite is cool!'), " +
                        "(10,    'Not bad for a Mainframe developer...'), " +
                        "(11,    'Having fun with HTML / CSS!'), " +
                        "(12,    'Github!'), " +
                        "(13,    'Twitter - Cloned!'), " +
                        "(14,     'Tweet, tweet!'), " +
                        "(15,      'First week of boot camp complete!');"; 
        
            console.log("testing the insertion"+db.run(insertUserSql));
            db.run(insertChannelSql);
            

            db.each("SELECT * FROM CHANNEL", function(err, row) {
                console.log(row.ID + ": " + row.STUFF);
            });
        });
    }   
    db.close();
}
// updating the channel TABLE

exports.updateChannel = updateChannel;
function updateChannel(userId, msg) {
    return new Promise((resolve, reject) => {
    console.log('updateChannel');
      var content = msg;
       var db = new sqlite3.Database('slack.db');
         var channel;
      
         var query = "UPDATE CHANNEL SET STUFF = ? WHERE ID = ?";

         console.log(query);
        db.each(query,[content,userId],
            function(err, row) {
             //var channel = row.STUFF;
            //channel.push(row.STUFF);
            //console.log(row.STUFF);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve("Updated successfully");
                   // console.log("channel" + channel);
                    //channel.sort(descDateCompare);
                    //resolve(JSON.parse(channel));
                }
        });
    });
}



/*
        var content = JSON.stringify(msg);
        console.log ("This is the conent" + content);
        var db = new sqlite3.Database('slack.db');
        var updateChannelSql = "UPDATE CHANNEL " +
        "SET STUFF = '" + content + "' WHERE ID = " + userId;
        db.run(updateChannelSql, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(JSON.stringify(followers));
            }
        });
    });
}
*/
// inserting the message into channel
/*
exports.addMessage = addMessage;
function addMessage(userId, msg) {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database('slack.db');
        var insertTweetSql = "INSERT INTO CHANNEL (USERID, STUFF) " +
                "VALUES ('" + userId + "','" + msg + "');";
        db.run(insertTweetSql, (err) => {
            if(err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

*/



exports.getFollowersJSON = getFollowersJSON;
function getFollowersJSON(userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT USERID, FOLLOWERID FROM FOLLOWER "
            + "  WHERE USERID = '" + userId + "'";
        var followers = [];
        db.each(query,
            function(err, row) {
                followers.push(row.FOLLOWERID);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(JSON.stringify(followers));
                }
        });
    });
}

exports.getChannelJSON = getChannelJSON;
function getChannelJSON(userId) {


    return new Promise((resolve, reject) => {
        console.log('getChannelJSON');
        var db = new sqlite3.Database('slack.db');
        console.log("userId --------->" + userId);
        var query = "SELECT STUFF FROM CHANNEL "
            + "  WHERE ID IN (" + userId + ")";

        console.log(query);
        var channel = [];
        db.each(query,
            function(err, row) {
             //var channel = row.STUFF;
            channel.push(JSON.parse(row.STUFF));
            console.log(row.STUFF);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    console.log("channel" + channel);
                    //channel.sort(descDateCompare);
                    resolve(channel);
                }
        });
    });
}

/*
// start :updating the messages to channel
exports.updateChannelJSON = updateChannelJSON;
function addChannelJSON(message) {
    return new Promise((resolve, reject) => {
        console.log('getChannelJSON');
        console.log("------------"+ message);
        var db = new sqlite3.Database('slack.db');

        var query = "INSERT  INTO CHANNEL (STUFF) VALUES  ('"+ message +"')";
        console.log(query);
        var channel = [];
        db.each(query,
            function(err, row) {
             //var channel = row.STUFF;
            //channel.push(row.STUFF);
            //console.log("IIIIIIIII" + row.STUFF);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve("Added successfully");
                    //console.log("channelkkkkk" + channel[0]);
                    //channel.sort(descDateCompare);
                    //resolve(JSON.parse(channel[0]));
                }
        });
    });
}

*/





//end
exports.getFollowedTweetsJSON = getFollowedTweetsJSON;
function getFollowedTweetsJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getFollowedTweetsJSON');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT T.USERID, T.TWEET, T.DATE, F.USERID as FOLLOWERID FROM TWEET T, FOLLOWER F "
            + " WHERE T.USERID = F.USERID AND F.FOLLOWERID = '" + userId + "'";
        console.log('query=' + query);
        var tweets = [];
        db.each(query,
            function(err, row) {
                var tweet = { userId: row.USERID, msg: row.TWEET, 
                            date: row.DATE };
                tweets.push(tweet);
                console.log(JSON.stringify(tweet));
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    tweets.sort(descDateCompare);
                    resolve(JSON.stringify(tweets));
                }
        });
    });
}

function descDateCompare(a, b) {
    // sort in descending date order
    var aDate = new Date(a.date);
    var bDate = new Date(b.date);

    if(bDate > aDate) {

        return(-1);
    }
    else if(bDate < aDate) {

        return(1);
    }
    else {

        return(0);
    }  
}

// comemnted by Uma. Reason : Duplicate methods
/*
exports.getUserInfoJSON = getUserInfoJSON;
function getUserInfoJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserInfo');
        var db = new sqlite3.Database('scratch.db');
        var query = "SELECT NAME FROM USER "
            + "  WHERE USERID = '" + userId + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { userId: userId, name: row.NAME };
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(JSON.stringify(user));
                }
        });
    });
}
*/
exports.getUserList = getUserList;
function getUserList() {
    return new Promise((resolve, reject) => {
    console.log('get user list');
       var db = new sqlite3.Database('slack.db');
       var query = "SELECT * FROM USER";
        var userList = [];
        db.each(query,
            function(err, row) {
                var user = { Id: row.ID, Name: row.NAME};
                userList.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(JSON.stringify(userList));
                }
        });
    });
}


exports.getUserInfoJSON = getUserInfoJSON;
function getUserInfoJSON(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserInfo');
        var db = new sqlite3.Database('slack.db');
        var query = "SELECT NAME,INFO FROM USER "
             + "  WHERE ID = " + userId + "";
            console.log("user query" + query);
        var user;
        db.each(query,
            function(err, row) {
                user = { id: userId, name: row.NAME,channels:row.INFO};
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    db.close();
                    resolve(JSON.stringify(user));
                }
        });
    });
}

//initdb();
//var db = new sqlite3.Database('slack.db');
// getFollowersJSON('abu').then(
//     (followers) => {
//         console.log('followers = ' + followers);
//     }).catch((err) => {
//         console.log('db error = ' + err);
//     }
// );

//db.close();
