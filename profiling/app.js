var calculateMeetingCost = {
	timeDisplay: document.querySelector('.time'),
	costDisplay: document.querySelector('.cost'),
	startButton: document.querySelector('.button-start'),
	stopButton: document.querySelector('.button-stop'),
	rate: document.getElementById('rate').value,
	participants: document.getElementById('participants').value,
	timeoutRef: null,
	rafRef: null,
	startTime: null,
	totalCost: 0,
	totalTimeSecondsCounter: 0,
	totalTimeMinuteCounter: 0,
	totalTimeHourCounter: 0,
	useRaf: true,

	handleEvent: function(e) {
		var _this = this;
		if(e.target === _this.startButton) {
			_this.startCount();
		}else if(e.target === _this.stopButton) {
			_this.stopCount();
		}
	},

	startCount: function() {
		var _this = this;
		
		_this.rate = document.getElementById('rate').value;
		_this.participants = document.getElementById('participants').value;
		
		if(!_this.startTime)_this.startTime = Date.now();

		if(_this.useRaf) {
			_this.rafTimer();
		}else {
			_this.setTimeOutTimer();
		}

		console.log('start counting');
	},

	stopCount: function() {
		var _this = this;
		window.clearTimeout(_this.timeoutRef);
		window.cancelAnimationFrame(_this.rafRef);

		console.log('stop counting');
	},

	calcCost: function(time) {
		var _this = this,
			totalTime = time || 1,
			totalTimeHour;


		totalTimeHour = totalTime / 3600;
		_this.totalTimeSecondsCounter = (Math.ceil(totalTime) % 60 === 0) ? 0 : _this.totalTimeSecondsCounter + 1;
		_this.totalCost = totalTimeHour * _this.rate * _this.participants;
		_this.timeDisplay.innerHTML = Math.floor(time / 3600) + ':' + Math.floor(time / 60) + ':' + _this.totalTimeSecondsCounter;
		_this.costDisplay.innerHTML = '$' + Math.floor(_this.totalCost * 100) / 100;
	},

	setTimeOutTimer: function() {
		var _this = this;

		function countTime() {
			var totalTime,
				currTime = Date.now();

			totalTime = (currTime - _this.startTime) / 1000;
			_this.calcCost(totalTime);
			_this.timeoutRef = window.setTimeout(countTime);
		}
		_this.timeoutRef = window.setTimeout(countTime);
	},

	rafTimer: function() {
		var _this = this;

		function countTime() {
			var totalTime,
				currTime = Date.now();

			totalTime = (currTime - _this.startTime) / 1000;
			_this.calcCost(totalTime);
			_this.rafRef = window.requestAnimationFrame(countTime);
		}
		_this.rafRef = window.requestAnimationFrame(countTime);

	},

	init: function() {
		var _this = this;
		
		_this.startButton.addEventListener('click', _this, false);
		_this.stopButton.addEventListener('click', _this, false);
	}
};

calculateMeetingCost.init();

