/*jshint node:true*/

// app.js

var cloudantUser = '';
var cloudantPass = '';
var cloudantURL = '';
var cloudantDB = '';
var appId = '';
var appR = '';
var appS = '';

var express = require('express'),
    bodyparser = require('body-parser'),
    ibmbluemix = require('ibmbluemix'),
    ibmpush = require('ibmpush'),
	Cloudant = require('cloudant');
	
console.log("Getting deployed environment variables");

if (process.env.VCAP_SERVICES != null) {	
	try{
		obj = JSON.parse(process.env.VCAP_SERVICES);
			
		cloudantUser = obj.cloudantNoSQLDB[0].credentials.username;
		cloudantPass = obj.cloudantNoSQLDB[0].credentials.password;	
		cloudantURL = obj.cloudantNoSQLDB[0].credentials.url;	
		var aurl = obj.MAS[0].credentials.admin_url;	
		appId = aurl.substring(aurl.lastIndexOf("/")+1, aurl.length);	
		
		obj = JSON.parse(process.env.VCAP_APPLICATION);
		appR = "http://" + obj.application_uris[0];
		
	}
	catch(fail){
		console.log("Failed to parse required info from VCAP_Services - look out, we're about to fail!")
	}
	console.log("Cloudant Logon: " + cloudantUser + " / " + cloudantPass);
	console.log("App ID: " + appId);
	console.log("App Route: " + appR);
}
if (process.env.AppS != null) {	
	try{
		appS = process.env.AppS;
	}
	catch(fail){
		console.log("Failed to parse required info from User-Provided - look out, we're about to fail!")
	}
	console.log("App S: " + appS);
}
else{
	console.log("Set the application secret user environment variable: AppS")
}

var appConfig = {
    applicationId: appId,
    applicationRoute: appR,
	applicationSecret: appS
};

ibmbluemix.initialize(appConfig);

var app = express();
var appContext=express.Router();
var logger = ibmbluemix.getLogger();
var ibmconfig = ibmbluemix.getConfig();
var contextRoot = ibmconfig.getContextRoot();
var push = ibmpush.initializeService();
console.log("contextRoot: " + contextRoot);

app.use(function(req, res, next) {
	req.logger = logger;
	next();
});

Cloudant({account:cloudantUser, password:cloudantPass}, function(er, cloudant) {
	  if (er){
		return console.log('Error connecting to Cloudant account %s: %s', cloudantUser, er.message);
	  }
	console.log('Connected to Cloudant');
	cloudant.ping(function(er, reply) {
	  if (er){
		return console.log('Failed to ping Cloudant');
	  }
	  console.log('Server version = %s', reply.version);
	  console.log('Logged in as %s and my roles are %j', reply.userCtx.name, reply.userCtx.roles);
	});

	var icdb = undefined;
	
	cloudant.db.list(function(err, body) {
	  body.forEach(function(db) {
		cloudantDB = db;
		icdb = cloudant.db.use(db);
		icdb.follow({since: "now"}, function(error, change) {
			if (error){
			return console.log('Error following database: ', error);
		  }
		  else{
			console.log("Change Occurred, sending Broadcast Push");
			var message = {alert : "New data is available", url : "https://www.mybluemix.net"};
			
			push.sendBroadcastNotification(message,null).then(function (response) {
				console.log("Push Broadcast Sent", response);
			}, function(err) {
				console.log("Failed to send Push");
				console.log(err);
			});
		  }
		});
	  });
	});
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});
app.get('/cloudanturl', function(req, res){
	res.json({"cloudantURL" : cloudantURL + "/"});
});
app.use(contextRoot, appContext);
app.listen(ibmconfig.getPort());
console.log('Server started at port: '+ibmconfig.getPort());




