import Movie from "/movie.js";

let instance = null;

export default class MoviesStorage {
	static getInstance() {
		return new MoviesStorage();
	}
	
	constructor(){
		if(!instance){
		    instance = this;
			this.movies = [];
			this.nextId = 1; 
			this.init();
        }
    }
	
	init() {
		let storageMovies = JSON.parse(localStorage.getItem("movies"));
		
		if (storageMovies !== null && Array.isArray(storageMovies)) {
			this.movies = storageMovies;
		} else {
			this.set({
				"title": "The Shawshank Redemption",
				"year": 1994,
				"genre": "drama",
				"summary": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
				"seen": "T"
    });
	
			this.set({
				"title": "The Godfather",
				"year": 1972,
				"genre": "crime",
				"summary": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
				"seen": "T"
			});
			
			this.set({
				"title": "The Dark Knight",
				"year": 2008,
				"genre": "action",
				"summary": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
				"seen": "T"
			});
			
			this.set({
				"title": "12 Angry Men",
				"year": 1957,
				"genre": "drama",
				"summary": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
				"seen": "F"
			});
			
			this.set({
				"title": "Schindler's List",
				"year": 1993,
				"genre": "biography",
				"summary": "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
				"seen": "F"
			});
			
			this.set({
				"title": "Pulp Fiction",
				"year": 1994,
				"genre": "crime",
				"summary": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
				"seen": "T"
			});
			
			this.set({
				"title": "The Good, the Bad and the Ugly",
				"year": 1966,
				"genre": "western",
				"summary": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
				"seen": "F"
			});
    	}
	}
	
	get() {	
		var getMovies = function() {
			return instance.movies;
		}

		var getMovie = function(id) {
			return instance.movies.find(m => m.id === id);
		}
    
		if (arguments.length === 0) {
		   return getMovies();
		}
		else if (arguments.length === 1 && typeof(arguments[0]) === 'number') {
		  return getMovie(arguments[0]);
		}
		else {
			throw "Incorrect arguments in method get.";
		}
	}
	
	set() {	
		var addMovie = function(data) {
			let id = instance.getFreeId();
			instance.movies.push(new Movie(id, data));
			localStorage.setItem("movies", JSON.stringify(instance.movies));
			return id;
		}

		var updateMovie = function(id, data) {
  			let index = instance.movies.findIndex(m => m.id === id);
			
			if (index === -1) {
				throw "Movie with id: " + id + " does not exist.";
			}
			
			instance.movies[index] = new Movie(id, data);
			localStorage.setItem("movies", JSON.stringify(instance.movies));
			return id;
		}
    
		if (arguments.length === 1) {
		   return addMovie(arguments[0]);
		}
		else if (arguments.length === 2 && typeof(arguments[0]) === 'number') {
		  return updateMovie(arguments[0], arguments[1]);
		}
		else {
			throw "Incorrect arguments in method get.";
		}
	}
	
	remove(id) {
		let index = instance.movies.findIndex(m => m.id === id);
		instance.movies.splice(index, 1);
		localStorage.setItem("movies", JSON.stringify(this.movies));
	}
	
	getFreeId() {
		while (instance.movies.findIndex(m => m.id === this.nextId) != -1) {
			this.nextId++;
		}
		
		return this.nextId;
	}
	
	log(label) {
		console.log(label);
		
		for (let movie of instance.movies) {
			console.log("Id: " + movie.id + " => " + movie.title);
		}
	}
}
