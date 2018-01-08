export default class Movie {
	constructor(id, object) {
		let fields = ['title', 'year', 'genre', 'summary'];
		this.id = id;
		
		for (let field of fields) {
			if (!object.hasOwnProperty(field)) {
				throw "Object passed to movie constructor does not "
						+ "containts " + field + " field.";
			}
			
			this[field] = object[field];
		}
	}
}