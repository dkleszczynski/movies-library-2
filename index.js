import setCounterOfTo from "/movies-counter.js";
import Movie from "/movie.js";
import MoviesStorage from "/movies-storage.js";

window.onload = function() {
	let moviesCounterAll = document.getElementById("moviesCounterAll");
	let moviesCounterSeen = document.getElementById("moviesCounterSeen");
	let moviesList = document.getElementById("moviesList");

	let storage = new MoviesStorage();
	storage.countSeenMovies();	
	createMoviesList(storage);
	
	setCounterOfTo(moviesCounterSeen, storage.seenCount);
	setCounterOfTo(moviesCounterAll, storage.get().length);
}

function createMoviesList(storage) {
	let fields = ['id', 'title', 'year', 'genre', 'summary'];
	
	storage.get().forEach(function(item) {
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
				
		if (item.seen === true) {
			image.src = "img/checked.png";
		} else {
			image.src = "img/unchecked.png";
		}
		
		image.onclick = function() {
			if (item.seen === false) {
				item.seen = true;
				storage.seenCount++;
				image.src = "img/checked.png";
			} else {
				item.seen = false;
				storage.seenCount--;
				image.src = "img/unchecked.png";
			}
			
			storage.set(item.id, item);
			setCounterOfTo(moviesCounterSeen, storage.seenCount);
		}
		
		listItem.appendChild(image);
		moviesList.appendChild(listItem);
	});
}