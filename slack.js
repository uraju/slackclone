/*
Table Users
ID
Name
Password
Email

Table team
id 
name


Table TeamUsers
ID
USerID FK
TeamID FK

Table Channel:
ID
Name
TeamID FK
Description
Type //  team vs private

Table Messages:
ID
Content
USerID FK //author
ChannelID FK
Timestamp


*/

var _ = require('lodash');
var db =  require('./dbHandler.js');

class User
{
    constructor(id, name,pwd,avatar,channels){
         this.id = id;
         this.name = name;
         this.pwd = pwd;
         this.avatar = avatar;
         //if( channels == undefined)
            this.channels = [];
        // this.channels = channels;         

    }  

    
}


class Manager {

    constructor(){
        this.channels = [];
        this.users = [];
        this.teams = [];
        this.globalId = 0;

    }  



    createNewUser(name){
        var user = new User(this.globalId++, name);
        var channel = new Channel(this.globalId++, user.name, user.name + ' private channel', 'private');
        user.channels.push(channel);
        this.users.push(user);
        this.channels.push(channel);
        return user;
    };

    getPrivateChannel( user ){
        return _.find(user.channels, e => e.name == user.name   );        
    }    

    retrieveChannelById(channelId){
        
        return db.getChannelJSON(channelId);

        
        /*
       return db.getChannelJSON(channelId).then(
          
                (data) => {
                    console.log("data" + data);
                }).catch((err) => {
                    console.log('db error = ' + err);
                }
            );   
*/

       //return _.find(this.channels, e => e.id == channelId   );      
    }

    updateChannel(channelId, content){

        return db.updateChannel(channelId, content);
    }

    createChannel(name){
        var channel = new Channel(this.globalId++, name, name + ' channel', 'team');
        this.channels.push(channel);
        return channel;
    } 

}

class Channel {
    constructor (id,name,description,type,team){
        this.id = id;
        this.name = name;       
        this.description= description;
        this.type = type;
         this.team = team;
        this.messages = [];
        this.globalId = 0;
    }

    addUser(user)
    {
    if( this.team === undefined ){
            this.team = new Team(this.globalId++, "" + this.global );
        }
        this.team.members.push(user);

    }

    addTeam(team){
        this.team = team;
    }

    addMessage(user, m)
    {
        var message = new Message(this.globalId++, m, user, this, new Date().getTime());
        this.messages.push(message);
        return message;
    }

    showUsers()
    {
        return this.team.members;
    }



    showMessages()
    {
        return this.messages;
    }
}



class Message{
    constructor(id,content,user,channel,timestamp){
        this.id = id;
        this.content = content;
        this.user = user;
        this.channel = Channel;
        this.timestamp = timestamp;

    }

}

class Team{
    constructor(id,name){
        this.id = id;
        this.name = name;
        this.members = [];
       }

}



exports.User = User;
exports.Channel = Channel;
exports.Message = Message;
exports.Team = Team;
exports.Manager = Manager;

exports.mgr = new Manager(); 