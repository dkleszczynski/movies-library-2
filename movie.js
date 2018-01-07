export default class Movie {
	constructor(object) {
		let fields = ['id', 'title', 'year', 'genre', 'summary'];
		
		for (let field of fields) {
			this[field] = object[field];
		}
	}
}