window.onload = function() {
	let moviesCounterAll = document.getElementById("moviesCounterAll");
	let moviesCounterSeen = document.getElementById("moviesCounterSeen");
	let seenCount = 0;
	
	moviesData.forEach(function(item) {
		if (item.seen == 'T') {
			++seenCount;
		}			
	});
	
	moviesCounterSeen.innerHTML = seenCount;
	moviesCounterAll.innerHTML = moviesData.length;
}