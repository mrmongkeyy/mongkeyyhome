module.exports = function(data,indicator,enddata){
	const words = [];
	let i;
	const objBucket = [];
	while(true){
		i = data.indexOf(indicator);
		if(i!=-1){
			words.push(data.slice(0,i));
			data = data.slice(i+1,data.length);
		}else{
			words.push(data);
			break;
		}
	}
	let obj;
	for(let i=words.length;i>0;i--){
		obj = {}
		if(objBucket.length==0){
			obj[words[i-1]] = enddata;
			objBucket[words.length-i] = obj;
			continue;
		}
		obj[words[i-1]] = objBucket[words.length-(i+1)]
		objBucket[words.length-i] = obj;

	}
	return objBucket[objBucket.length-1];
}