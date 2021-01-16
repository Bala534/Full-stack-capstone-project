var express=require('express')

var app=express()

var mongojs = require('mongojs')

var cString='mongodb+srv://mahesh:mahesh@cluster0.qe4fh.mongodb.net/vedic?retryWrites=true&w=majority'

var db = mongojs(cString, ['things'])

app.use(express.static('public'))


app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/hello.html')
})


app.get('/dashboard',function(req,res){
	res.sendFile(__dirname+'/public/dashboard.html')
})


app.get('/profile',function(req,res){
	res.sendFile(__dirname+'/public/profile.html')
})


app.get('/signup',function(req,res){
	res.sendFile(__dirname+'/public/signup.html')
})


app.get('/login',function(req,res){
	res.sendFile(__dirname+'/public/login.html')
})


app.get('/successful',function(req,res){

	var a={
		Name:req.query.name,
		password:req.query.pswd,
		email:req.query.mail
	}
    
    db.things.insert(a,function(err,docs){
    	if(err){
    		res.send('Something went wrong')
    	}
    	else{
    		res.sendFile(__dirname+'/public/successful.html')
    	}
    })
   
})


app.get('/valid',function(req,res){



	var a={
		Name:req.query.uname,
		password:req.query.pass
	}

	db.things.find(a,function(err,docs){
		if(err){
			res.send('Something went wrong')
		}
		


		if(docs.length>0){
			res.sendFile(__dirname+'/public/dashboard.html')
		}
		else{
			res.send('Invalid username or password')
		}
	})
})


app.get('/signin',function(req,res){
	res.sendFile(__dirname+'/public/signin.html')
})


app.get('/firstvalid',function(req,res){




	var a={
		Name:req.query.uname,
		password:req.query.pass
	}

	db.things.find(a,function(err,docs){
		if(err){
			res.send('Something went wrong')
		}
		


		if(docs.length>0){
			res.sendFile(__dirname+'/public/firstdash.html')
		}
		else{
			res.send('Invalid username or password')
		}
	})
})



app.listen(3000,function(){
	console.log('server started')
})


