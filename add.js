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
		"title": inputTitle.value.trim(),
		"year": inputYear.value,
		"genre": inputGenre.value,
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
	clearValidationErrors();
	
	if (inputTitle.value.trim() === '') {
		inputTitle.style.border = "2px solid salmon";
		errorLabelTitle.innerText = "A title cannot be empty.";
		return false;
	}
	
	if (storage.get().find(m => m.title === inputTitle.value.trim())) {
		inputTitle.style.border = "2px solid salmon";
		errorLabelTitle.innerText = "Movie with this title already exists.";
		return false;
	}
		
	var pattern = /^[1-9]\d{3}$/;
	
    if (!pattern.test(inputYear.value)) {
		inputYear.style.border = "2px solid salmon";
		errorLabelYear.innerText = "A year must be a number that consists of 4 digits!";
		return false;
	}
	
	if (inputGenre.value.trim() === '') {
		inputGenre.style.border = "2px solid salmon";
		errorLabelGenre.innerText = "Choose or type a genre.";
		return false;
	}
	
	return true;
}

function clearFields() {
	inputTitle.value = "";
	inputYear.value = "";
    inputGenre.value = "";
	inputSummary.value = "";
	inputSeen.checked = false;
}

function clearValidationErrors() {
	if (errorLabelTitle.innerText !== "") {
		inputTitle.style.border = "";
		errorLabelTitle.innerText = "";
	}
	
	if (errorLabelYear.innerText !== "") {
		inputYear.style.border = "";
		errorLabelYear.innerText = "";
	}
	
	if (errorLabelGenre.innerText !== "") {
		inputGenre.style.border = "";
		errorLabelGenre.innerText = "";
	}
}