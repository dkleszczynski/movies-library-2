import Movie from "/movie.js";
import MoviesStorage from "/movies-storage.js";

window.onload = function() {
	let btnAdd = document.getElementById("btnAdd");
	let listGenres = document.getElementById("listGenres");
		
	btnAdd.onclick = addMovie;
}

function addMovie() {
	if (!validate()) {
		return;
	}
	
	let storage = new MoviesStorage();
	storage.set({
		"title": inputTitle.value,
		"year": inputYear.value,
		"genre": inputGenres.value,
		"summary": inputSummary.value,
		"seen": inputSeen.checked
	});
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