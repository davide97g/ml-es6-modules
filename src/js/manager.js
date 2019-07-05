import * as inputF from "./input";
export const Manager = function() {
  this.data = [];
  this.labels = [];
  this.drawers = [];
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
  setDataSet(data, labels) {
    this.data = data;
    this.labels = labels;
  },
  addPoint(point, label) {
    this.data.push(point);
    this.labels.push(label);
  }
};
