window.onload = function () {
	generateCalendar();
}

function generateCalendar () {
	for (var i = $('.calendar').length - 1; i >= 0; i--) {
		$('.calendar')[i].children[1].textContent = i + 1
	};
}