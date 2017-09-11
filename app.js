/*jshint node:true*/

// app.js

var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');

var app = express();

var db;

var cloudant;

var dbCredentials = {
    dbName: 'my_sample_db'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var manifest = require('cache-manifest-generator');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Cache-Control from cache-manifest-generator docs
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache');
    next();
});

app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));







// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set

        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }
    var icdb;
    cloudant = require('cloudant')(dbCredentials.url);

    //db = cloudant.use(dbCredentials.dbName);
    cloudant.db.list(function(err, body) {
	  body.forEach(function(dbc) {
		cloudantDB = dbc;
		icdb = cloudant.db.use(dbc);
		icdb.follow({since: "now"}, function(error, change) {
			if (error){
			return console.log('Error following database: ', error);
		  }
		  else{
			console.log("Change Occurred, sending Broadcast Push");
			var message = {alert : "New data is available", url : "https://www.mybluemix.net"};
		  }
		});
	  });
});
}

initDBConnection();

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});
app.get('/cloudanturl', function(req, res){
	res.json({"cloudantURL" : cloudantURL + "/"});
});

app.get('/cache.manifest', manifest([{ file: 'public', url: '/' }]));

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});




