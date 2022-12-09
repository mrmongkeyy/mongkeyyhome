const express = require('express');
const app = express();
const port = 3000;
const hostName = `http://localhost:${port}`;
const view = require('./module/view');
const os = require('os');
const path = require('path');
const fs = require('fs');
const fileSet = require('./module/setupScript');
const ourDb = require('./module/getDb')(10);
const buffToJSON = require('./module/buffToJSON');


const tesourDb = 'helloworld';
const scriptPath = [
[`./public/script/css/mrmongkeyy.css`,'script.css.link'],
[`./public/media/goodprofile.jpg`,'media'],
[`./public/script/js/app.js`,'script.js.homescript'],
[`./public/script/js/module.js`,'script.js.module'],
[`./public/media/more.png`,'media']];

//const tes = require('./module/tes');


const homepage = require('./module/pages/home')({ourDb});
//setting up the images.
app.use(ourDb,express.static('public'));
//app.use(require('body-parser').urlencoded({extended:false}));
//console.log(app);

app.get('/',(req,res)=>{
	//console.log('called');
	//homepage['app'] = app;
	homepage['aditional'] = fileSet(app,scriptPath,5);
	homepage.header.style.link = `${ourDb}/script/css/mrmongkeyy.css`;
	homepage.header.module = [homepage.aditional['3'].script.js.module]
	res.send(view.home(homepage));
});

app.post('/projects',(req,res)=>{
	fs.readFile('./public/db/db.json',(err,data)=>{
		//console.log(req);
		const newdata = JSON.parse(data);
		newdata.projects.forEach((x,i)=>{
			x.thumbnail = fileSet(app,[[`./public/media/${x.thumbnail}`,'url']],5);
		})
		res.send(newdata);
	});
})

app.post('/uploadFile',(req,res)=>{
	req.on('data',(ev)=>{
		fs.appendFileSync(req.headers['file-name'],ev);
		console.log('receving data');
		if(req.headers['thelastone']==='true'){
			fs.rename(req.headers['file-name'],'./'+req.headers['destination']+req.headers['file-name'],()=>{
				res.end();
			})
		}
	})
	res.send('uploaded');
})

app.post('/sendData',(req,res)=>{
	req.on('data',data=>{
		console.log('calledfromsendData');
		const newData = buffToJSON(data);
		fs.readFile('./public/db/db.json',(err,data)=>{
			const oldData = buffToJSON(data);
			oldData.projects.push(newData);
			fs.writeFile('./public/db/db.json',JSON.stringify(oldData),(err,data)=>{
				res.end();
			})
		})		
	})
})


app.listen(3000,()=>{
	console.log('listening on port 3000');
});//listening on port 3000