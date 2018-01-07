import setCounterOfTo from "/movies-counter.js";
import Movie from "/movie.js";

let seenCount;

window.onload = function() {
	let moviesCounterAll = document.getElementById("moviesCounterAll");
	let moviesCounterSeen = document.getElementById("moviesCounterSeen");
	let moviesList = document.getElementById("moviesList");
	
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