var calculateMeetingCost = {
	startButton: document.querySelector('.button-start'),
	stopButton: document.querySelector('.button-stop'),
	pauseButton: null,
	animationBlock: document.getElementById('animation'),
	ballTopPos: 0,
	ballAnimationDirection: 1,
	timeoutRef: null,
	rafRef: null,
	useRaf: false,
	animationState: false,

	createBall: function() {
		var _this = this,
			ball = document.createElement('div');

		ball.className += 'ball';

		return ball;
	},

	handleEvent: function(e) {
		var _this = this;
		if(e.target === _this.startButton) {
			_this.startAnimation();
		}else if(e.target === _this.stopButton) {
			_this.stopAnimation();
		}
	},

	startAnimation: function() {
		var _this = this,
			currBalls = document.querySelectorAll('.ball').length,
			ballCount = Number(document.getElementById('balls').value);

		if(currBalls < ballCount) {
			for(var i=0;i<(ballCount - currBalls);i++) {
				console.log('inserting');
				_this.animationBlock.appendChild(_this.createBall());
			}
		}

		if(!_this.startTime)_this.startTime = Date.now();

		if(_this.pauseButton) {
			window.clearTimeout(_this.timeoutRef);
			window.cancelAnimationFrame(_this.rafRef);
			_this.startButton.innerHTML = 'Start Animation';
			console.log('Start Animation');
		}else {
			if(_this.useRaf) {
				_this.rafTimer();
			}else {
				_this.setTimeOutTimer();
			}
			_this.startButton.innerHTML = 'Pause Animation';
			console.log('Pause Animation');
		}

		_this.pauseButton = (_this.pauseButton) ? null : true;

	},

	stopAnimation: function() {
		var _this = this;
		window.clearTimeout(_this.timeoutRef);
		window.cancelAnimationFrame(_this.rafRef);

		_this.pauseButton = null;
		_this.startButton.innerHTML = 'Start Animation';
		_this.ballTopPos = null;
		_this.animationBlock.innerHTML = '';
		console.log('Reset Animation');
	},

	animateBall: function(time) {
		var _this = this,
			balls = document.querySelectorAll('.ball'),
			animationBlockBoundingBox = _this.animationBlock.getBoundingClientRect();

		Object(balls).forEach(function(el, idx) {
			var ballBoundingBox = el.getBoundingClientRect();

			if(ballBoundingBox.top >= animationBlockBoundingBox.top && ballBoundingBox.bottom <= animationBlockBoundingBox.bottom) {
				
				console.log(ballBoundingBox.top, animationBlockBoundingBox.top);
				console.log(ballBoundingBox.bottom, animationBlockBoundingBox.bottom);
				if(ballBoundingBox.top === animationBlockBoundingBox.top) {
					_this.ballAnimationDirection = 1;
					console.log('top');
				}else if(ballBoundingBox.bottom === animationBlockBoundingBox.bottom) {
					_this.ballAnimationDirection = -1;
					console.log('bottom');
				}
					moveBall();
			}

			function moveBall() {
					_this.ballTopPos += _this.ballAnimationDirection;
					el.style.top = _this.ballTopPos + 'px';
					console.log(_this.ballAnimationDirection);
			}
		});

		window.setTimeout(function() {
			console.log('slowing it down');
		}, 1700);
		_this.animationState = false;
	},

	setTimeOutTimer: function() {
		var _this = this;

		function animationLoop() {
			_this.animateBall();
			if(!_this.animationState) {
				_this.animationState = true;
				_this.timeoutRef = window.setTimeout(animationLoop, 17);
			}
		}
		_this.timeoutRef = window.setTimeout(animationLoop, 17);
	},

	rafTimer: function() {
		var _this = this;

		function animationLoop() {
			_this.animateBall();
			if(!_this.animationState) {
				_this.animationState = true;
				_this.rafRef = window.requestAnimationFrame(animationLoop);
			}
		}
		_this.rafRef = window.requestAnimationFrame(animationLoop);

	},

	init: function() {
		var _this = this;

		_this.startButton.addEventListener('click', _this, false);
		_this.stopButton.addEventListener('click', _this, false);
	}
};

calculateMeetingCost.init();

