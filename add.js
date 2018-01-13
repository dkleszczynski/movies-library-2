import setCounterOfTo from "/movies-counter.js";
import Movie from "/movie.js";
import MoviesStorage from "/movies-storage.js";

let storage;
let moviesCounterAll;
let moviesCounterSeen;

window.onload = function() {
	let btnAdd = document.getElementById("btnAdd");
	let listGenres = document.getElementById("listGenres");
	moviesCounterAll = document.getElementById("anotherMoviesCounterAll");
	moviesCounterSeen = document.getElementById("anotherMoviesCounterSeen");
	storage = new MoviesStorage();
	
	setCounterOfTo(moviesCounterSeen, storage.seenCount);
	setCounterOfTo(moviesCounterAll, storage.get().length);
	btnAdd.onclick = addMovie;
}

function addMovie() {
	if (!validate()) {
		return;
	}
		
	storage.set({
		"title": inputTitle.value,
		"year": inputYear.value,
		"genre": inputGenres.value,
		"summary": inputSummary.value,
		"seen": Boolean(inputSeen.checked)
	});
	
	if (Boolean(inputSeen.checked) === true) {
		storage.seenCount++;
    }
	
	setCounterOfTo(moviesCounterSeen, storage.seenCount);
	setCounterOfTo(moviesCounterAll, storage.get().length);
	clearFields();
}

function validate() {
	if (inputTitle.value === '') {
		alert("Empty title");
		return false;
	}
		
	var pattern = /^\d{4}$/;
	
    if (!pattern.test(inputYear.value)) {
		alert("A year must consist of 4 digits!");
		return false;
	}
	
	if (inputTitle.value === '') {
		alert("Empty genre");
		return false;
	}
	
	return true;
}

function clearFields() {
	inputTitle.value = "";
	inputYear.value = "";
    inputGenres.value = "";
	inputSummary.value = "";
	inputSeen.checked = false;
}