require("must/register");
var _ = require('lodash');
var slack = require("./slack");
var User= slack.User;
var Channel = slack.Channel;
var Manager = slack.Manager;


describe('Test Slack', function () {
  it('Test User Name', function () {
    var input = new User(0,'Charles');
    var expected = 'Charles';
    var actual = input.name;   // <----- Edit this line
    actual.must.eql(expected);
  });

    it('Test Create Channel', function () {
        var input = new Channel(0,'Charles','Charles Private Channel','private');
        var expected = 'Charles';
        var actual = input.name;   // <----- Edit this line
        actual.must.eql(expected);
    }); 

    it('Test Create user with Private Channel', function () {
         
        var mgr = new Manager();
        var user = mgr.createNewUser('Charles');
        var actual = user.name;
        var expected = 'Charles';
        actual.must.eql(expected);

        
        var channel = mgr.getPrivateChannel( user );
        actual = channel.name;

        actual.must.eql(expected);


    });   


     it('Test add user to channel', function (done) {
         
        var mgr = new Manager();
        var userA = mgr.createNewUser('Alice');
        var userB = mgr.createNewUser('Bob');
        var userC = mgr.createNewUser('Charles');
        
       var channel =  mgr.createChannel("Team Channel");
        
        var actual = channel.name;
        var expected = 'Team Channel';
        actual.must.eql(expected);

        actual = channel.type;
        expected = 'team';
        actual.must.eql(expected);

        channel.addUser(userA);
        channel.addUser(userB);
        channel.addUser(userC);

        actual = channel.team.members.length;
        expected = 3;
        actual.must.eql(expected);

        //console.log(channel);
        var channel;
        mgr.retrieveChannelById(6).then(

            (data) => {
                channel = data;

                //console.log("Log :"  + channel);
                actual = channel.name;
                //console.log("actual :"  + actual);
                expected = 'Team Channel';
                actual.must.eql(expected);
                done();

                }).catch((err) => {
                    console.log('db error = ' + err);
                }
            );      

       
    


    });   

// update channel
it('Test update channel', function (done) {
         
        var mgr = new Manager();
        var channel;
        var expectedname = "channel 5";
        
        mgr.retrieveChannelById(5)
          .then(
            (data) => {
                channel = data;

                
                var actual = channel.name;
                
                var expected = 'Team Channel5';
                actual.must.eql(expected);

                channel.name = expectedname;
                
                return mgr.updateChannel(5, channel);
                })
           .then( () =>
               {

                return  mgr.retrieveChannelById(5);
               })
            .then(
                (w) => {
                    actual = w.name;
                    actual.must.equal(expectedname);
                    
                    done();
                }

            )
           .catch((err) => {
                    console.log('db error = ' + err);
                });
            


    });   



// update method ends

it('Test add message to channel', function () {
         
        var mgr = new Manager();
        var userA = mgr.createNewUser('Alice');
        var userB = mgr.createNewUser('Bob');
        var userC = mgr.createNewUser('Charles');
        
       var channel =  mgr.createChannel("Team Channel");
        
        var actual = channel.name;
        var expected = 'Team Channel';
        actual.must.eql(expected);

        actual = channel.type;
        expected = 'team';
        actual.must.eql(expected);

        channel.addUser(userA);
        channel.addUser(userB);
        channel.addUser(userC);

        actual = channel.showUsers().length;
        expected = 3;
        actual.must.eql(expected);

        channel.addMessage(userA, "This is a test message1!");
        channel.addMessage(userB, "This is a test message2!");
        channel.addMessage(userC, "This is a test message3!");
        actual = channel.showMessages().length;
        expected = 3;
        actual.must.eql(expected);

        //console.log(channel.showMessages());

    });   

it('Test add message to two channels', function () {
         
        var mgr = new Manager();
        var userA = mgr.createNewUser('Alice');
        var userB = mgr.createNewUser('Bob');
        var userC = mgr.createNewUser('Charles');
        
       var channel =  mgr.createChannel("Team Channel");
        
        var actual = channel.name;
        var expected = 'Team Channel';
        actual.must.eql(expected);

        actual = channel.type;
        expected = 'team';
        actual.must.eql(expected);

        channel.addUser(userA);
        channel.addUser(userB);
        channel.addUser(userC);

        var channel2 =  mgr.createChannel("Team Channel 2");
        channel2.addUser(userA);
        channel2.addUser(userB);
        channel2.addUser(userC);


        actual = channel.showUsers().length;
        expected = 3;
        actual.must.eql(expected);

        channel.addMessage(userA, "This is a test message1!");
        channel.addMessage(userB, "This is a test message2!");
        channel.addMessage(userC, "This is a test message3!");
        channel2.addMessage(userA, "This is a test message4!");
        channel2.addMessage(userB, "This is a test message5!");
        
        actual = channel.showMessages().length;
        expected = 3;
        actual.must.eql(expected);

        actual = channel2.showMessages().length;
        expected = 2;
        actual.must.eql(expected);

        //console.log(channel.showMessages());
        //console.log("Start ------------");
       // console.log(JSON.stringify(channel));
         //console.log("End ------------");
    });   

  });