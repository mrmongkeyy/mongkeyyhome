const reQ = {
	x:new XMLHttpRequest(),
	post(config){
		this.x.open('POST',config.address||'/',true);
		this.x.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		this.x.setRequestHeader('enctype','multipart/form-data');
		this.end(config);
	},
	get(config){
		this.x.open('GET',config.address);
		this.end(config);
	},
	end(config){
		this.x.send(config.data);
		this.x.onload = config.onload;
	},
	eval(data){
		let x = '';
		for(let i in data){ 
			x+=i+'='+data[i]+'&&';;
		}
		return x;
	}
}

const stateFunction = {
	find(p){
		return this.querySelector(p);
	},
	findAll(p){
		return this.querySelectorAll(p);
	},
	inject(config){
		if(typeof config.name === 'object'){
			for(let i of config.name){
				config.el[i] = this[i];
			}
			return config.el;
		}
		return config.el[config.name] = this[config.name];
	}
}

const get = function(p){
	let docx = document.querySelector(p);
	if(!docx.find){
		stateFunction.inject({el:docx,name:['find','findAll']});
	}
	return docx;
}
const getAll = function(p){return document.querySelectorAll(p)}
const responseText = function(response){return response.target.responseText}
const makeElement = function(p){
	const el = document.createElement(p);
	stateFunction.inject({el:el,name:['find','findAll']});
	return el;
}
const sendFile = function(config){
	const f = new FileReader();
	f.readAsArrayBuffer(config.file);
	f.onload = async ev =>{
		const chunkSize = config.transferRate||1000;
		const loopLen = Math.floor(ev.target.result.byteLength/chunkSize)+1;
		//console.log(chunkSize,loopLen);
		let chunk,fileName=Math.random()*1000+config.file.name;
		for(let i=0;i<loopLen;i++){
			let isThatTheLast = (i==loopLen-1)?true:false;
			console.log(isThatTheLast);
			chunk = ev.target.result.slice(i*chunkSize,i*chunkSize+chunkSize);
			await fetch(config.url,{
				'method':'POST',
				'headers':{
					'file-name':fileName,
					'content-type':'application/octet-stream',
					'content-length':chunk.length,
					destination:config.destination,
					thelastone:isThatTheLast
				},
				'body':chunk
			})
			.then((res)=>{
				res['progressCount'] = 100/loopLen;
				res['finish'] = isThatTheLast;
				res['fileName'] = fileName;
				if(config.onload)config.onload(res);	
			})
		}
	}
}

const sendData = async function(config){
	await fetch(config.url,{
		method:'POST',
		headers:{
			'content-type':'application/json',
			'req-pass':config.pass
		},
		body:JSON.stringify(config.data)
	})
	.then((res)=>{
		config.onload(res);
	})
}
const giveIMGsrc = function(config){
	const fs = new FileReader();
	fs.readAsDataURL(config.file);
	fs.onload = function(){config.el.src = fs.result}
}