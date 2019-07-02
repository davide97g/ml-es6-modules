export const Manager = function() {
  this.drawers = [];
};
Manager.prototype = {
  subscribe: function(drawer) {
    drawer.setManager(this);
    this.drawers.push(drawer);
  },
  notifyAll: function(data, labels) {
    this.drawers.forEach(drawer => drawer.draw(data, labels));
  }
};
