export const UI = function(document) {
  this.document = document;

  this.options_container = document.createElement("div");
  this.options_container.id = "options_container";
  this.options_container.classList.add("options_container");
  this.document.body.appendChild(this.options_container);

  this.draw_options = new DrawOptions();
  this.algorithm_options = new AlgorithmOptions(document);
  this.dataset_options = new DatasetOptions();
};
UI.prototype = {
  setUpAlgorithm: function(algorithm) {
    this.algorithm_options.getOptionsFromAlgorithm(
      algorithm,
      this.options_container
    );
  }
};

const DrawOptions = function() {};
DrawOptions.prototype = {};

const AlgorithmOptions = function(document) {
  this.document = document;
};
AlgorithmOptions.prototype = {
  getOptionsFromAlgorithm: function(algorithm, options_container) {
    this.options_container = options_container;
    let options = algorithm.getOptions();
    this.recursive(options, this.options_container);
  },
  recursive: function(options, container) {
    if (options.type !== undefined) {
      let res = this.createProperty(options);
      for (let child in res) container.appendChild(res[child]);
    } else {
      let new_container = this.document.createElement("div");
      new_container.classList.add("container");
      for (let option in options) {
        if (option === "group") new_container.id = options.group;
        else this.recursive(options[option], new_container);
      }
      let title = this.document.createElement("p");
      title.innerHTML = new_container.id;
      container.appendChild(title);
      container.appendChild(new_container);
    }
  },
  createProperty: function(property) {
    let input = this.document.createElement("input");
    let label = this.document.createElement("label");

    for (let key in property) input[key] = property[key];
    label.innerHTML = input.id;
    label.for = input.id;

    if (input.type === "range") {
      let value = this.document.createElement("div");
      value.innerHTML = input.value;
      input.addEventListener("change", () => (value.innerHTML = input.value));
      return {
        label: label,
        input: input,
        value: value
      };
    }
    return {
      label: label,
      input: input
    };
  },
  getOptionsValue: function() {
    console.info(this.options_container); //everything is stored inside this variable
    //extract the value of any element and produce the options configuration as a json to be passed at the algorithm funciton "train"
  }
};

const DatasetOptions = function() {};
DatasetOptions.prototype = {};
