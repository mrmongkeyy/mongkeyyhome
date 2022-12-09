const getDb = function(howmuch){
	const dict = 'AaBbCcDdEeFfJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz123456789';
	let db = '/';
	for(let i=0;i<howmuch;i++){
		db+=dict[Math.floor(Math.random()*dict.length)];
	}
	return db;
}
module.exports = getDb;