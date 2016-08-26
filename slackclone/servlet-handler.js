// Servlet handler

exports.signon = function(req, res) {
    console.log('signon');
    var userId = req.body.uidtxt;
    var password = req.body.passtxt;
    console.log('userId=' + userId + ', ' + 'password=' + password);

    res.cookie('userid', userId, {expire : new Date() + 9999});
    res.redirect('/main.html');
}

exports.signup = function(req, res) {
    console.log('signup');
}
