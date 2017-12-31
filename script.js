window.onload = function() {
	let moviesCounterAll = document.getElementById("moviesCounterAll");
	let moviesCounterSeen = document.getElementById("moviesCounterSeen");
	let moviesList = document.getElementById("moviesList");
	let seenCount = 0;
	
	moviesData.forEach(function(item) {
		if (item.seen == 'T') {
			++seenCount;
		}			
	});
	
	createMoviesList();
	
	moviesCounterSeen.innerHTML = seenCount;
	moviesCounterAll.innerHTML = moviesData.length;
}

function createMoviesList() {
		
	moviesData.forEach(function(item) {
		let fields = ['id', 'title', 'year', 'genre', 'summary'];
		let listItem = document.createElement('li');
		
		for (let i = 0; i < fields.length; i++) {
			let div = document.createElement('div');
			let span = document.createElement('span');
			let value = document.createTextNode(item[fields[i]] + " ");
			
			span.appendChild(document.createTextNode(fields[i] + ": "));
			span.style.fontWeight = 'bold';
			
			div.appendChild(span);
			div.appendChild(value);
			listItem.appendChild(div);
		}
		
		let image = document.createElement("IMG");
		image.src = "img/checked.png";
		image.width = 20;
		image.height = 20;
		image.onclick = function() {alert("clicked");}
		
		listItem.appendChild(image);
		moviesList.appendChild(listItem);
	});
	
}