export const UI = function(document) {
  this.document = document;

  this.options_container = document.createElement("div");
  this.options_container.id = "options_container";
  this.options_container.classList.add("options_container");
  this.document.body.appendChild(this.options_container);

  this.config = {};

  this.draw_options = new DrawOptions();
  this.algorithm_options = new AlgorithmOptions(document);
  this.dataset_options = new DatasetOptions();
};
UI.prototype = {
  setUpAlgorithm: function(algorithm) {
    this.algorithm_options.getOptionsFromAlgorithm(
      algorithm,
      this.options_container,
      this.config
    );
  },
  getOptionsValue: function() {
    this.algorithm_options.getOptionsValue();
  },
  getConfig: function() {
    return this.algorithm_options.getConfig();
  }
};

const DrawOptions = function() {};
DrawOptions.prototype = {};

const AlgorithmOptions = function(document) {
  this.document = document;
};
AlgorithmOptions.prototype = {
  getConfig: function() {
    return this.config;
  },
  getOptionsFromAlgorithm: function(algorithm, options_container, config) {
    this.options_container = options_container || {};
    this.config = config || {};
    this.algorithm_options = algorithm.getOptions();
    this.recursive(this.algorithm_options, this.options_container, this.config);
  },
  recursive: function(options, container, config) {
    if (options.type !== undefined) {
      let res = this.createProperty(options, config);
      for (let child in res) {
        container.appendChild(res[child]);
      }
    } else {
      let new_container = this.document.createElement("div");
      new_container.classList.add("container");
      let new_config = {};
      for (let option in options) {
        if (option === "group") {
          new_container.id = options.group;
        } else {
          this.recursive(options[option], new_container, new_config);
        }
      }
      config[new_container.id] = new_config;
      let title = this.document.createElement("p");
      title.innerHTML = new_container.id;
      container.appendChild(title);
      container.appendChild(new_container);
    }
  },
  createProperty: function(property, config) {
    let input = this.document.createElement("input");
    let label = this.document.createElement("label");

    for (let key in property) {
      input[key] = property[key];
    }

    label.innerHTML = input.id;
    label.for = input.id;

    if (input.type === "range") {
      config[input.id] = input.value;
      let value = this.document.createElement("div");
      value.innerHTML = input.value;
      input.addEventListener("change", () => {
        value.innerHTML = input.value;
        config[input.id] = input.value;
      });
      return {
        label: label,
        input: input,
        value: value
      };
    } else {
      //choice
      config[input.id] = input.checked;
      input.addEventListener("change", () => {
        for(let c in config) config[c] = false;
        config[input.id] = input.checked;
      });
      return {
        label: label,
        input: input
      };
    }
  }
  // getOptionsValue: function() {
  //   let containers = this.options_container.getElementsByClassName("container");
  //   for (let i = 0; i < containers.length; i++)
  //     this.generateOptionsForAlgorithm(containers[i]);
  // },
  // generateOptionsForAlgorithm(algorithm_options) {
  //   if(algorithm_options.id!== undefined)
  //     console.info(algorithm_options);
  // }
};

const DatasetOptions = function() {};
DatasetOptions.prototype = {};
