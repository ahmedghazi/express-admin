var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    _app,
    //urlSlug = require('url-slug'),
    async = require('async'),
    Options = mongoose.model('Options'),
    Posts = mongoose.model('Posts'),
    Users = mongoose.model('Users');
    

module.exports = function (app) {
    _app = app;
    app.use('/api', router);
};

router.get('/update-admin', function (req, res, next) {
    var body = {
        email:"admin76",
        password:"a27Le5GB",
        type:"admin"
    }

    Users.findOneAndUpdate({type: "admin"}, body, {}, function (err, user, raw) {
        res.redirect('/');
    });
});

router.get('/setup', function (req, res, next) {
    async.parallel([
        function(callback) {
            var user = new Users({
                email:"admin",
                password:"passssap",
                type:"admin"
            });
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                callback();
            });
        },
        function(callback) {
            var site_name = "Site name"
            var option = new Options({
                meta:{
                    key: "site_name",
                    value: site_name
                }
            });
            option.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                _app.locals.site_name = option.meta.value;
                callback();
            });
        }
    ], function(err, results) {
        res.redirect('/admin');
    });

    //_app.locals.site_name
    
});

router.post('/new', function (req, res, next) {
    console.log(req.body)
    var user = new Users(req.body);
    user.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.redirect('/admin/users/');
        
    });
});

router.get('/drop', function(req, res, next) {
    req.resetDb();
    res.redirect("/");
    //res.send("done")
});
