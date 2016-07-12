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
	animationState: false,
	useRaf: true,

	handleEvent: function(e) {
		var _this = this;
		if(e.target === _this.startButton) {
			_this.startAnimation();
		}else if(e.target === _this.stopButton) {
			_this.stopAnimation();
		}
	},

	startAnimation: function() {
		var _this = this;

		if(!_this.startTime)_this.startTime = Date.now();

		if(_this.pauseButton) {
			window.clearTimeout(_this.timeoutRef);
			window.cancelAnimationFrame(_this.rafRef);
			_this.startButton.innerHTML = 'Start Animation';
		}else {
			if(_this.useRaf) {
				_this.rafTimer();
			}else {
				_this.setTimeOutTimer();
			}
			_this.startButton.innerHTML = 'Pause Animation';
		}

		_this.pauseButton = (_this.pauseButton) ? null : true;

	},

	stopAnimation: function() {
		var _this = this;
		window.clearTimeout(_this.timeoutRef);
		window.cancelAnimationFrame(_this.rafRef);

		_this.pauseButton = null;
		_this.startButton.innerHTML = 'Start Animation';
		_this.ballTopPos = 0;
		_this.ballAnimationDirection = 1;
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

	setTimeOutTimer: function() {
		var _this = this,
			animateProps = {};

		animateProps.ballBoundingBox = _this.ball.getBoundingClientRect();
		animateProps.ballHeight = _this.ball.getBoundingClientRect().height;
		animateProps.animationBoundingBox = _this.animationBlock.getBoundingClientRect();
		animateProps.animationBlockHeight = _this.animationBlock.getBoundingClientRect().height;

		animateProps.ballMovePct = (animateProps.animationBlockHeight / animateProps.ballHeight - 1) * 100;

		function animationLoop() {
			_this.animateBall(animateProps);
			if(!_this.animationState) {
				_this.animationState = true;
				_this.timeoutRef = window.setTimeout(animationLoop, 17);
			}
		}
		_this.timeoutRef = window.setTimeout(animationLoop, 17);
	},

	rafTimer: function() {
		var _this = this,
			animateProps = {};

		animateProps.ballBoundingBox = _this.ball.getBoundingClientRect();
		animateProps.ballHeight = _this.ball.getBoundingClientRect().height;
		animateProps.animationBoundingBox = _this.animationBlock.getBoundingClientRect();
		animateProps.animationBlockHeight = _this.animationBlock.getBoundingClientRect().height;

		animateProps.ballMovePct = (animateProps.animationBlockHeight / animateProps.ballHeight - 1) * 100;

		function animationLoop() {
			_this.animateBall(animateProps);
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

