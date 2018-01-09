import setCounterOfTo from "/movies-counter.js";
import Movie from "/movie.js";
import MoviesStorage from "/movies-storage.js";

let seenCount;

window.onload = function() {
	let moviesCounterAll = document.getElementById("moviesCounterAll");
	let moviesCounterSeen = document.getElementById("moviesCounterSeen");
	let moviesList = document.getElementById("moviesList");
	let storage = new MoviesStorage();
	
	let firstId = storage.set({
			"title": "The Sinking of Kursk.",
			"year": 2016,
			"genre": "romance-disaster",
			"summary": "Youtoube fan made video based on the orginal movie.",
			"seen": "T"
		});
	
	let secondId = storage.set({
			"title": "Some old movie",
			"year": 1962,
			"genre": "drama",
			"summary": "One of the most popular drama movies in early 60s.",
			"seen": "F"
		});
	
	storage.log("List after adding:");
	
	let title = prompt("Type the movie title:");
	storage.set(
		firstId, 
		{
			"title": title,
			"year": 2016,
			"genre": "romance-disaster",
			"summary": "Youtoube fan made video based on the orginal movie.",
			"seen": "T"
		});
	
	storage.log("List after updating:");
	
	storage.remove(secondId);
	storage.log("List after removing:");	
	
	countSeenMovies();	
	createMoviesList();

	setCounterOfTo(moviesCounterSeen, seenCount);
	setCounterOfTo(moviesCounterAll, moviesData.length);
}

function countSeenMovies() {
	seenCount = 0;
	
	moviesData.forEach(function(item) {
		if (item.seen === 'T') {
			++seenCount;
		}			
	});
}

function createMoviesList() {
	let fields = ['id', 'title', 'year', 'genre', 'summary'];
	
	moviesData.forEach(function(item) {
		let listItem = document.createElement('li');
		
		for (let field of fields) {
			let div = document.createElement('div');
			let span = document.createElement('span');
			let value = document.createTextNode(item[field] + " ");
			
			span.appendChild(document.createTextNode(field + ": "));
			div.appendChild(span);
			div.appendChild(value);
			listItem.appendChild(div);
		}
		
		let image = document.createElement("IMG");
				
		if (item.seen === 'T') {
			image.src = "img/checked.png";
		} else {
			image.src = "img/unchecked.png";
		}
		
		image.onclick = function() {
			if (item.seen === 'F') {
				item.seen = 'T';
				seenCount++;
				image.src = "img/checked.png";
			} else {
				item.seen = 'F';
				seenCount--;
				image.src = "img/unchecked.png";
			}

			setCounterOfTo(moviesCounterSeen, seenCount);
		}
		
		listItem.appendChild(image);
		moviesList.appendChild(listItem);
	});
}