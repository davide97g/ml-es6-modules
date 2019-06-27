/**
 *
 * @description
 * Class used to handle distances functions
 * @example
 * //new instance
 * let distances = new Distances();
 * //define two points
 * let point1 = {x:1,y:3};
 * let point2 = {x:4,y:-2};
 * //minkowski distance from two points
 * let minkowski_distance = distances.minkowski(point1,point2);
 * //chebyshev distance from two points
 * let chebyshev_distance = distances.chebyshev(point1,point2);
 * //mahalanobis distance from two points
 * let mahalanobis_distance = distances.mahalanobis(point1,point2);
 * //setting the grade for minkowski
 * distances.setMinkowskiDegree(2);
 */
export const Distances = function() {
	this.p = 1;
	this.data = [];
	this.variance = 0;
	this.default = function() {};
};

Distances.prototype = {
	/**
     * Sets the dataset and calculate the variance
     * @param data {data} dataset to be used for the distances calculations
     */
	setDataSet: function(data) {
		this.data = data;
		this.variance = variance(data);
	},

	/**
	 * Set the default function for the distance calculation
	 * @param {String} algorithm 
	 */
	setDefault: function(algorithm) {
		if (algorithm === 'minkowski') this.default = this.minkowski;
		else if (algorithm === 'chebyshev') this.default = this.chebyshev;
		else if (algorithm === 'mahalanobis') this.default = this.mahalanobis;
		else this.default = this.minkowski;
	},

	/**
	 * Returns the distance between two points using the default algorithm
	 * @param point1 {point} first point
     * @param point2 {point} second point
     * @returns {number} distance
	 */
	of: function(point1, point2) {
		try {
			return this.default(point1, point2);
		} catch (e) {
			console.warn(e);
		}
	},

	/**
     * Sets the degree of the minkowski distance
     * @param p {Number} the degree for minkowski distance
     */
	setMinkowskiDegree: function(p) {
		this.p = p || this.p;
		if (this.p < 1) this.p = 1;
	},

	/**
     * Returns the minkowski distance between two points
     * @param point1 {point} first point
     * @param point2 {point} second point
     * @returns {number} minkowski distance
     */
	minkowski: function(point1, point2) {
		return Math.pow(
			Math.pow(Math.abs(point1.x - point2.x), this.p) + Math.pow(Math.abs(point1.y - point2.y), this.p),
			1 / this.p
		);
	},

	/**
     * Returns the chebyshev distance between two points
     * @param point1 {point} first point
     * @param point2 {point} second point
     * @returns {number} chebyshev distance between the two points
     */
	chebyshev: function(point1, point2) {
		return Math.max(Math.abs(point2.x - point1.x), Math.abs(point2.y - point1.y));
	},

	/**
     * Returns the mahalanobis distance between two points
     * @param point1 {point} first point
     * @param point2 {point} second point
     * @returns {number} mahalanobis distance between the two points
     */
	mahalanobis: function(point1, point2) {
		if (this.data.length === 0) throw 'no data';
		let sum =
			Math.pow(point1.x - point2.x, 2) / Math.pow(this.variance.x, 2) +
			Math.pow(point1.y - point2.y, 2) / Math.pow(this.variance.y, 2);
		return Math.sqrt(sum);
	}
};

function variance(data) {
	let avg = average(data);
	let variance = { x: 0, y: 0 };
	let N = data.length;
	for (let j = 0; j < N; j++) {
		variance.x += Math.pow(data[j][0] - avg[0], 2);
		variance.y += Math.pow(data[j][1] - avg[1], 2);
	}
	variance.x = Math.sqrt(variance.x / N);
	variance.y = Math.sqrt(variance.y / N);
	return variance;
}

function average(data) {
	let avg = [ 0, 0 ];
	let N = data.length;
	for (let i = 0; i < N; i++) {
		avg[0] += data[i][0];
		avg[1] += data[i][1];
	}
	avg[0] /= N;
	avg[1] /= N;
	return avg;
}
