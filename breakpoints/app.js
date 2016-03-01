"user strict";

var a = function() {
		return new Promise(
			function(resolve,reject) {
				resolve('Hello World');
			}
		);
	},
	b = function() {
		return new Promise(
			function(resolve,reject) {
				var response = {
					a: 1,
					b: 2,
					c: 3,
					d: 4
				};
				resolve(response);
			}
		);
	},
	c = function() {
		return new Promise(
			function(resolve,reject) {
				var el = document.createElement('div');
				el.id = 'Element';
				el.style.background = 'red';
				resolve(el);
			}
		);
	};


a().then(function(a) {
	return b();
// Add breakpoint on line below to see value returned by the Promise
}).then(function(b) {
	return c();
// Add breakpoint on line below to see value returned by the Promise
}).then(function(c) {

// Add breakpoint on line below to see value returned by the Promise
}).catch(function(err) {

});
