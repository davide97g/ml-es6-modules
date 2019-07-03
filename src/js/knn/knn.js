import { Distances } from "./distances/distances.js";
export const KNN = function() {};
KNN.prototype = {
  train: function(data, labels, options) {
    this.data = data;
    this.labels = labels;
    this.options = options || {};
    let k = this.options.k || 1;
    if (k < 1) k = 1;
    if (k > this.data.length) {
      console.warn(
        "need more data: KNN with K: " + k + " and #data: " + this.data.length
      );
      return 0;
    }
    this.k = k;
    this.distances = new Distances();
    this.distances.setDataSet(data);
    let distance = this.options.distance || "minkowski";
    this.distances.setDefault(distance);
    if (distance === "minkowski") {
      let p = this.options.p || 1;
      this.distances.setMinkowskiDegree(p);
    }
  },
  predict: function(point) {
    if (!this.k) console.warn("k not defined");
    else return (this.knn(point, this.k) + 1) / 2;
  },
  predictClass: function(point) {
    if (!this.k) console.warn("k not defined");
    else return this.knn(point, this.k) > 0 ? 1 : -1;
  },
  knn: function(point, k) {
    let nearest = new Array(k);
    for (let i = 0; i < k; i++) {
      nearest[i] = {};
      nearest[i].distance = this.distances.of(point, this.data[i]);
      nearest[i].label = this.labels[i];
    }

    nearest.sort(function(a, b) {
      return b.distance - a.distance;
    }); //ordino decrescente

    let d = 0;

    for (let i = k; i < this.data.length; i++) {
      d = this.distances.of(point, this.data[i]);
      if (nearest[0].distance > d) {
        //se è più distante il più distante dei nearest, aggiorno la lista
        nearest[0].distance = d;
        nearest[0].label = this.labels[i];
        nearest.sort((a, b) => b.distance - a.distance); //ordino decrescente
      }
    }

    let c = 0;
    let class1 = 0;
    let class2 = 0;
    for (let i = 0; i < k; i++) {
      c += nearest[i].label;
      if (nearest[i].label === 1) class2++;
      else class1++;
    }
    if (c === 0) return 0;
    if (c > 0) return class2 / k;
    //greenish
    else return -class1 / k; //reddish
  },
  getOptions: function() {
    let options = {
      group: "knn",
      k: {
        id: "K",
        type: "range",
        min: 1,
        max: 20,
        step: 1,
        value: 3
      },
      p: {
        id: "P",
        type: "range",
        min: 1,
        max: 10,
        step: 1,
        value: 2
      },
      distance: {
        group: "distances",
        values: [
          {
            id: "minkowski",
            type: "radio",
            name: "distances",
            value: "minkowski",
            checked: true
          },
          {
            id: "chebyshev",
            type: "radio",
            name: "distances",
            value: "chebyshev"
          },
          {
            id: "mahalanobis",
            type: "radio",
            name: "distances",
            value: "mahalanobis"
          }
        ]
      }
    };
    return options;
  }
};
