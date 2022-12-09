const fs = require('fs');
const strobj = require('./strobj.js');
module.exports = function(app,path,pathLen){
	const dict = 'AaBbCcDdEeFfJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456789';
	let howMuchSlash = Math.floor(Math.random()*10);
	let obj = {};
	let filePath = '/';
	for(let i=0;i<path.length;i++){
		for(let i=0;i<howMuchSlash;i++){
			for(let j=0;j<pathLen;j++){
				filePath += dict[Math.floor(Math.random()*dict.length-1)];
			}
			filePath += '/';
		}
		obj[i] = strobj(path[i][1],'.',filePath);
		app.get(filePath,(req,res)=>{
			fs.readFile(path[i][0],(err,data)=>{
				res.send(data);
			})
		})
		filePath = '/';
	}
	return obj;
}