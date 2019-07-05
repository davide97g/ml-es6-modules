import * as inputF from "./svm/input";
import { copyArray } from "./utils";
export const Manager = function() {
  this.data = [];
  this.labels = [];
  this.drawers = [];
  this.input_boosting = [];
};
Manager.prototype = {
  subscribe: function(drawer) {
    drawer.setManager(this);
    this.drawers.push(drawer);
  },
  notifyAll: function() {
    this.drawers.forEach(drawer => {
      drawer.getAlgorithm().train(this.data, this.labels);
      drawer.draw(this.data, this.labels);
    });
  },
  setDataSet: function(data, labels) {
    this.data = data;
    this.labels = labels;
  },
  addPoint: function(point, label) {
    this.data.push(point);
    this.labels.push(label);
  }
  // input_transformation: function(data) {
  //   if (this.input_boosting.length > 0) {
  //     let boosted = copyArray(data);
  //     for (let i = 0; i < this.input_boosting.length; i++) {
  //       boosted = this.boost(boosted, this.input_boosting[i]);
  //     }
  //     return boosted;
  //   }
  // },
  // boost: function(data, f = inputF.fx2) {
  //   return data.map(point => f(point));
  // }
};
