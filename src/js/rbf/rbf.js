export const RBF = function() {};
RBF.prototype = {
	train: function(data, labels, options) {
		this.data = data;
		this.labels = labels;
		this.options = options;
		this.epsilon = options.epsilon || 0.1;
		this.rbfSigma = options.rbfSigma || 0.5;
	},
	predict: function(point) {
		return (Math.tanh(this.rbf(point) / Math.pow(this.epsilon, 2)) + 1) / 2;
	},
	predictClass: function(point) {
		return this.rbf(point) > 0 ? 1 : -1;
	},
	rbf: function(point) {
		let value = 0;
		for (let i = 0; i < this.data.length; i++) {
			let s = 0;
			for (let j = 0; j < point.length; j++) s += Math.pow(point[j] - this.data[i][j], 2);
			value += this.labels[i] * Math.exp(-s / (2.0 * Math.pow(this.rbfSigma, 2)));
		}
		return value;
	}
};
