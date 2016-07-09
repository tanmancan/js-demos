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
	totalTimeSeconds: 0,
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

		console.log('start counting');
		_this.setTimeOutTimer();
	},
	stopCount: function() {
		var _this = this;
		console.log('stop counting');
		window.clearTimeout(_this.timeoutRef);
	},
	calcCost: function(time) {
		var _this = this,
			totalTime = time || 1,
			totalTimeHour,
			cost;


		totalTimeHour = totalTime / 3600;
		_this.totalTimeSeconds = (Math.ceil(totalTime) % 60 === 0) ? 0 : _this.totalTimeSeconds + 1;
		cost = totalTimeHour * _this.rate * _this.participants;

		console.log('COST: ', cost);
		console.log(totalTime, (totalTime % 60 === 0), 'totalTimeSeconds: ', _this.totalTimeSeconds);

		_this.timeDisplay.innerHTML = Math.floor(time / 3600) + ':' + Math.floor(time / 60) + ':' + _this.totalTimeSeconds;
		_this.costDisplay.innerHTML = '$' + Math.floor(cost * 100) / 100;
	},
	setTimeOutTimer: function() {
		var _this = this;
		_this.startTime = Date.now();

		function countTime() {
			var totalTime,
				cost,
				currTime = Date.now(),
				dispTime;

				totalTime = (currTime - _this.startTime) / 1000;
				dispTime = Date(currTime - _this.startTime);

			console.log('time time');
			console.log(dispTime, totalTime);
			_this.calcCost(totalTime);
			_this.timeoutRef = window.setTimeout(countTime, 1000);
		}
		_this.timeoutRef = window.setTimeout(countTime, 1000);
	},
	rafTimer: function() {
		var _this = this;

	},
	init: function() {
		var _this = this;
		console.log(_this.timeDisplay, _this.costDisplay, _this.startButton, _this.stopButton);
		_this.startButton.addEventListener('click', _this, false);
		_this.stopButton.addEventListener('click', _this, false);
	}
};

calculateMeetingCost.init();

