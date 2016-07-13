var calculateMeetingCost = {
	startButton: document.querySelector('.button-start'),
	stopButton: document.querySelector('.button-stop'),
	pauseButton: null,
	ball: document.querySelector('.ball'),
	animationBlock: document.getElementById('animation'),
	ballTopPos: 0,
	ballAnimationDirection: 1,
	timeoutRef: null,
	rafRef: null,
	growBallRef: null,
	ballSize: 1,
	ballSizeModifier: .1,
	animationState: false,
	useRaf: false,

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
			animateProps = {};

		animateProps.ballBoundingBox = _this.ball.getBoundingClientRect();
		animateProps.ballHeight = _this.ball.getBoundingClientRect().height;
		animateProps.animationBoundingBox = _this.animationBlock.getBoundingClientRect();
		animateProps.animationBlockHeight = _this.animationBlock.getBoundingClientRect().height;

		animateProps.ballMovePct = Math.floor((animateProps.animationBlockHeight / animateProps.ballHeight - 1) * 100);

		if(!_this.startTime)_this.startTime = Date.now();

		if(_this.pauseButton) {
			window.clearTimeout(_this.timeoutRef);
			window.cancelAnimationFrame(_this.rafRef);
			window.clearTimeout(_this.growBallRef);
			window.cancelAnimationFrame(_this.growBallRef);
			_this.startButton.innerHTML = 'Start Animation';
		}else {
			if(_this.useRaf) {
				_this.rafTimer(animateProps);
				_this.growBallRaf();
			}else {
				_this.setTimeOutTimer(animateProps);
				_this.growBall();
			}
			_this.startButton.innerHTML = 'Pause Animation';
		}

		_this.pauseButton = (_this.pauseButton) ? null : true;
	},

	stopAnimation: function() {
		var _this = this;
		window.clearTimeout(_this.timeoutRef);
		window.cancelAnimationFrame(_this.rafRef);
		window.clearTimeout(_this.growBallRef);
		window.cancelAnimationFrame(_this.growBallRef);

		_this.pauseButton = null;
		_this.startButton.innerHTML = 'Start Animation';
		_this.ballTopPos = 0;
		_this.ballAnimationDirection = 1;
		_this.ball.style.transform = 'translate3d(0,0,0)';
	},

	animateBall: function(animateProps) {
		var _this = this;

		if(_this.ballTopPos >= 0 && _this.ballTopPos <= animateProps.ballMovePct) {
			
			if(_this.ballTopPos === 0) {
				_this.ballAnimationDirection = 1;
			}else if(_this.ballTopPos === animateProps.ballMovePct) {
				_this.ballAnimationDirection = -1;
			}
				moveBall();
		}

		function moveBall() {
				_this.ballTopPos += _this.ballAnimationDirection;
				_this.ball.style.transform = 'translate3d(0,' + _this.ballTopPos + '%, 0)';
		}

		_this.animationState = false;
	},

	growBall: function() {
		var _this = this;

		function growAnimation() {
			if(Math.floor(_this.ballSize * 100) / 100 === 1) {
				_this.ballSizeModifier = .1;
			}else if(Math.floor(_this.ballSize * 100) / 100 === 2) {
				_this.ballSizeModifier = -.1;
			}
			_this.ballSize += _this.ballSizeModifier;
			_this.ball.style.transform += ' scale(' +_this.ballSize + ')';

			_this.growBallRef = window.setTimeout(growAnimation, 16.6);
		}

		growAnimation();
	},

	growBallRaf: function() {
		var _this = this;

		function growAnimation() {
			if(Math.floor(_this.ballSize * 100) / 100 === 1) {
				_this.ballSizeModifier = .1;
			}else if(Math.floor(_this.ballSize * 100) / 100 === 2) {
				_this.ballSizeModifier = -.1;
			}
			_this.ballSize += _this.ballSizeModifier;
			_this.ball.style.transform += ' scale(' +_this.ballSize + ')';
			
			_this.growBallRef = window.requestAnimationFrame(growAnimation);
		}

		growAnimation();
	},

	setTimeOutTimer: function(animateProps) {
		var _this = this;

		function animationLoop() {
			_this.animateBall(animateProps);
			if(!_this.animationState) {
				_this.animationState = true;
				_this.timeoutRef = window.setTimeout(animationLoop, 16.6);
			}
		}
		animationLoop();
	},

	rafTimer: function(animateProps) {
		var _this = this;

		function animationLoop() {
			_this.animateBall(animateProps);
			if(!_this.animationState) {
				_this.animationState = true;
				_this.rafRef = window.requestAnimationFrame(animationLoop);
			}
		}
		animationLoop();

	},

	init: function() {
		var _this = this;

		_this.startButton.addEventListener('click', _this, false);
		_this.stopButton.addEventListener('click', _this, false);
	}
};

calculateMeetingCost.init();

