var btnA = document.querySelector('.a');
var btnB = document.querySelector('.b');
var btnC = document.querySelector('.c');

btnA.addEventListener('click', btnOneClick, false);

function btnOneClick() {
	this.value = 'this.value exists!';
	var _this = this;

	console.log('%c' + this.value, 'font-size:30px');

	// this scope is lost within the anonymous function
	btnB.addEventListener('click', function() {
		console.log('%c' + this.value, 'font-size:30px');
	}, false);

	// reassigning will allow you to keep this value
	btnC.addEventListener('click', function() {
		console.log('%c' + _this.value, 'font-size:30px');
	})
}

