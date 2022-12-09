module.exports = {
	get(document,p){
		return document.querySelector(p);
	},
	getAll(document,p){return document.querySelectorAll(p)},
}