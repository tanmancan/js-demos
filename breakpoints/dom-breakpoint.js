var btnDomBreakpoint = document.querySelector('.btn-dom-break');
var domBreakpoint = document.querySelector('.dom-break');

btnDomBreakpoint.addEventListener('click', function() {
	domBreakpoint.className += ' new-class';
}, false);