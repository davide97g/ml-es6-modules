import { copyArray } from "./utils";
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
    this.drawers.forEach(drawer => this.notify(drawer));
  },
  notify: function(drawer) {
    let input_boosting = drawer.getBoosting();
    if (input_boosting.length > 0) {
      let boosted = copyArray(this.data);
      for (let i = 0; i < boosted.length; i++)
        boosted[i] = this.boost(input_boosting, this.data[i]);
      drawer.getAlgorithm().train(boosted, this.labels);
      drawer.draw(boosted, this.labels);
    } else {
      drawer.getAlgorithm().train(this.data, this.labels);
      drawer.draw(this.data, this.labels);
    }
  },
  setDataSet: function(data, labels) {
    this.data = data;
    this.labels = labels;
  },
  addPoint: function(point, label) {
    this.data.push(point);
    this.labels.push(label);
  },
  boost: function(input_boosting, point) {
    if (input_boosting.length) {
      let boosted = copyArray(point);
      for (let i = 0; i < input_boosting.length; i++) {
        boosted = input_boosting[i](boosted);
      }
      return boosted;
    } else return point;
  }
};
