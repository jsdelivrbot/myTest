var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
var db ;
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://PRIYANKAGUPTA22:priya1234@ds227858.mlab.com:27858/priyanka_todolist', (err, client) => {
	if(err){
		console.log(err);
	}
	else{
		 db = client.db('priyanka_todolist');
		 app.listen('3001',function(){
			console.log("Listening on port 3001");
		});
	}
  })

app.set('view engine','ejs');
app.set('views',__dirname+'/public/views');
app.use(express.static(__dirname+'/public'));
// Home Page 
app.get('/',function(req,res){
	// res.send("Hello, This is Priyanka!!!");
	res.sendFile(__dirname,"/public/index.html");
});

// Add a Quote :Get
app.get('/addQuote',(req,res) =>{
	res.sendFile(path.join(__dirname,'/public/addQuote.html'));
});

// Add a Quote :POST
app.post('/add_quote',urlencodedParser,function(req,res){
	db.collection('quotes').save(req.body,(err,result) =>{
		if(err){
			return console.log(err);
		}
		console.log("Saved....",result);
		res.redirect("/");
	})
});

// Show All Quotes :Get

app.get('/quotes',(req,res) =>{
	db.collection('quotes').find().toArray((err,result) =>{
		if(err){
			return console.log(err);
		}
		res.render('quotes.ejs',{quotes:result});
	});
});


