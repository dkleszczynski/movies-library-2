import Movie from "/movie.js";

let instance = null;

export default class MoviesStorage {
	static getInstance() {
		return new MoviesStorage();
	}
	
	constructor(){
		if(!instance){
              instance = this;
        }
		
		this.movies = [];
		this.nextId = 1; 
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
			return id;
		}

		var updateMovie = function(id, data) {
  			let index = instance.movies.findIndex(m => m.id === id);
			
			if (index === -1) {
				throw "Movie with id: " + id + " does not exist.";
			}
			
			instance.movies[index] = new Movie(id, data);
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
