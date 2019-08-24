const express = require('express');
const opn = require('opn');
const ip = require('ip');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var expressSession = require('express-session');
var cookiesParser = require('cookie-parser');

var view = require('./routes/view');
var api = require('./routes/api');
const app = express();

// var urlencoderParser = bodyParser.urlencoded({extended:false});


const options = process.argv.reduce((acc, arg) => {
	const pair = arg.split('=');
	if (pair.length === 2) {
		acc[pair[0]] = pair[1];
	}
	return acc;
}, {});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SalamTrade',{useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log('connected to mongodb database:SalamTrade')});
db.on('disconnected',function(){
   mongoose.connect('mongodb://localhost:27017/SalamTrade',{useMongoClient:true});
   db = mongoose.connection;
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookiesParser());


// app.use(expressSession({
//     secret:'MySESSionKeY',
//     resave:true,
//     saveUninitialized:true
// }));
app.use('/',view);
app.use('/api',api);

// console.log('yyyyyyyyyy',db);


app.get('/ip', (req, res) => {
	res.send(ip.address());
});

app.get('/index',function(req,res){
    db.employee.find(function(err,docs){
        console.log(docs);
        res.render('index',{emplistmongodb:docs});
    });
});


app.get('/create',function(req,res){
    res.render('create');
});
// app.post('/create',urlencoderParser,function(req,res){
//     console.log("Employee data recieved.");
//     var i=parseInt(req.body.id);
//     var n=req.body.name;
//     var g=req.body.gender;
//     var c=req.body.city;
//     var s=parseInt(req.body.salary);
//     db.employee.insert({"id":i,"name":n,"gender":g,"city":c,"salary":s},function(err,doc){
// 		console.log('///////////////////',err);
//         console.log(doc)
//         res.redirect("/");
//     });
// });




app.get('/', (req, res) => {
	res.redirect('/create');
});

app.get(/\/create(.*)(\/|\.html)$/, (req, res, next) => {
	if (req.query.key || !options.key) {
		next();
	} else {
		if (req.originalUrl.slice(-10) === 'index.html') {
			res.redirect(`${req.originalUrl}?key=${options.key}`)
		} else {
			res.redirect(`./index.html?key=${options.key}`)
		}
	}
});

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: true }));



app.use('/samples', express.static('samples'));
app.use('/doc', express.static('doc'));
app.use('/lib', express.static('lib'));

app.listen(3000, '0.0.0.0', (err) => {
	if (err) {
		console.error(err);
	} else {
		console.info(`Listening at localhost:3000 (http://${ip.address()}:3000)`);
		if (process.argv[2] === 'create') {
			opn(`http://localhost:3000/create`);
		} else if (process.argv[2] === 'doc') {
			opn('http://localhost:3000/doc');
		}
	}
});