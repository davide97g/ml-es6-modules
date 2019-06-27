export const drawer = function(algorithm, canvas, options) {
	this.algorithm = algorithm;
	this.ctx = canvas.getContext('2d');
	this.WIDTH = canvas.width;
	this.HEIGHT = canvas.height;
	this.options = options || { margin: 'soft' };
	this.ss = options.ss || 20;
	this.density = options.density || 3;
};

drawer.prototype = {
	setAlgorithm: function(algorithm) {
		this.algorithm = algorithm;
	},
	setOptions: function(options) {
		this.options = options || {};
	},
	draw: function(points, labels) {
		//clear
		this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		//draw grid
		this.drawGrid();
		//draw axes
		this.drawAxes();
		//draw data points
		this.drawPoints(points, labels);
		//draw test points
		//@TODO draw test function
	},
	drawGrid: function() {
		//draw screen
		for (let x = 0.0; x <= this.WIDTH; x += this.density) {
			for (let y = 0.0; y <= this.HEIGHT; y += this.density) {
				let prediction = 0;
				if (this.options.margin === 'soft')
					prediction = this.algorithm.predict([
						(x - this.WIDTH / 2) / this.ss,
						(y - this.HEIGHT / 2) / this.ss
					]);
				else
					prediction = this.algorithm.predictClass([
						(x - this.WIDTH / 2) / this.ss,
						(y - this.HEIGHT / 2) / this.ss
					]);
				this.ctx.fillStyle = getColor(prediction);
				this.ctx.fillRect(x - this.density / 2 - 1, y - this.density - 1, this.density + 2, this.density + 2);
			}
		}
	},
	drawAxes: function() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'rgb(50,50,50)';
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(0, this.HEIGHT / 2);
		this.ctx.lineTo(this.WIDTH, this.HEIGHT / 2);
		this.ctx.moveTo(this.WIDTH / 2, 0);
		this.ctx.lineTo(this.WIDTH / 2, this.HEIGHT);
		this.ctx.stroke();
	},
	drawPoints: function(points, labels) {
		let radius = 6;
		for (let i = 0; i < points.length; i++) {
			let prediction = this.algorithm.predictClass(points[i]);
			this.ctx.fillStyle = getPointColor(prediction, labels[i]);
			this.drawCircle(points[i][0] * this.ss + this.WIDTH / 2, points[i][1] * this.ss + this.HEIGHT / 2, radius);
		}
	},
	drawCircle: function(x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}
};

export const master_drawer = function(canvas, callback, options) {
	this.ctx = canvas.getContext('2d');
	canvas.addEventListener('click', (e) => callback(eventClick(canvas, e)));
	this.WIDTH = canvas.width;
	this.HEIGHT = canvas.height;
	this.options = options;
	this.ss = options.ss || 20;
	this.density = options.density || 3;
};

master_drawer.prototype = {
	draw: function(points, labels) {
		//clear
		this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		//draw axes
		this.drawAxes();
		//draw data points
		this.drawPoints(points, labels);
		//draw test points
		//@TODO draw test function
	},
	drawAxes: function() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'rgb(50,50,50)';
		this.ctx.lineWidth = 1;
		this.ctx.moveTo(0, this.HEIGHT / 2);
		this.ctx.lineTo(this.WIDTH, this.HEIGHT / 2);
		this.ctx.moveTo(this.WIDTH / 2, 0);
		this.ctx.lineTo(this.WIDTH / 2, this.HEIGHT);
		this.ctx.stroke();
	},
	drawPoints: function(points, labels) {
		let radius = 6;
		for (let i = 0; i < points.length; i++) {
			this.ctx.fillStyle = getPointColor(labels[i], labels[i]);
			this.drawCircle(points[i][0] * this.ss + this.WIDTH / 2, points[i][1] * this.ss + this.HEIGHT / 2, radius);
		}
	},
	drawCircle: function(x, y, r) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.stroke();
		this.ctx.fill();
	}
};

function eventClick(canvas, e) {
	//get position of cursor relative to top left of canvas
	let x = 0;
	let y = 0;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	return {
		x: x,
		y: y,
		shiftPressed: e.shiftKey,
		ctrlPressed: e.ctrlKey
	};
}

function getPointColor(predicted, real) {
	if (predicted * real > 0) {
		if (predicted > 0) return 'rgb(150,250,150)';
		else return 'rgb(250,150,150)';
	} else {
		if (predicted > 0) return 'rgb(105,147,250)';
		else return 'rgb(240,226,63)';
	}
}

function getColor(prediction) {
	let ri, gi;
	if (prediction < 0) {
		// less red 250-150
		ri = 150 - 100 * prediction; //with value = -1 ===> ri = 250
		gi = 250 + 100 * prediction; //with value = -1 ===> gi = 150
	} else {
		//less green 150-250
		ri = 250 - 100 * prediction; //with value = 1 ===> ri = 150
		gi = 150 + 100 * prediction; //with value = 1 ===> gi = 250
	}
	return 'rgb(' + Math.floor(ri) + ',' + Math.floor(gi) + ',150)';
}
