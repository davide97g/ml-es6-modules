import { LogisticRegression as LOGREG } from "./logreg/logreg.js";
import { SVM } from "./svm/svm.js";
import { KNN } from "./knn/knn.js";
import { RBF } from "./rbf/rbf.js";
import { RandomForest as RANDF } from "./randf/randf.js";
import { drawer } from "./drawer.js";
import { NeuralNet } from "./nn/nn.js";
import { Manager } from "./manager.js";
import { UI } from "./ui.js";
import { dataset_generator } from "./dataset.js";

let manager = new Manager();
let generator = new dataset_generator();

let data = [
  [1, 0],
  [2, 3],
  [5, 4],
  [2, 7],
  [0, 3],
  [-1, 0],
  [-3, -4],
  [-2, -2],
  [-1, -1],
  [-5, -2]
];
let labels = [1, 1, 1, 1, 1, -1, -1, -1, -1, -1];

manager.setDataSet(data, labels);

let svm_linear = new SVM();
let svm_linear_options = {
  kernel: {
    linear: true
  },
  degree: 1,
  influence: 0,
  C: 1,
  SSCA: false,
  UB: 0.5,
  memoize: true,
  input_functions: {},
  karpathy: true,
  timer: null
};
svm_linear.setOptions(svm_linear_options);
svm_linear.train(data, labels);

let svm_poly = new SVM();
let svm_poly_options = {
  kernel: {
    poly: true
  },
  degree: 2,
  influence: 0,
  C: 1,
  SSCA: false,
  UB: 0.5,
  memoize: true,
  karpathy: true,
  timer: null
};
svm_poly.setOptions(svm_poly_options);
svm_poly.train(data, labels);

let svm_rbf = new SVM();
let svm_rbf_options = {
  kernel: {
    rbf: true
  },
  degree: 2,
  influence: 0,
  C: 1,
  SSCA: false,
  UB: 0.5,
  memoize: true,
  karpathy: true,
  timer: null
};
svm_rbf.setOptions(svm_rbf_options);
svm_rbf.train(data, labels);

let knn = new KNN();
let knn_options = {
  k: 3,
  distance: {
    mahalanobis: false,
    chebyshev: true,
    minkowski: false
  },
  p: 1.5
};
knn.setOptions(knn_options);
knn.train(data, labels);

let rbf = new RBF();
let rbf_options = {
  epsilon: 0.1,
  rbfSigma: 0.5
};
rbf.setOptions(rbf_options);
rbf.train(data, labels);

let randf = new RANDF();
let randf_options = {
  numTrees: 100
};
randf.setOptions(randf_options);
randf.train(data, labels);

let logreg = new LOGREG();
let logreg_options = {};
logreg.setOptions(logreg_options);
logreg.train(data, labels);

let nn = new NeuralNet();
let nn_options = {};
nn.setOptions(nn_options);
nn.train(data, labels);

let drawers = [];
//create the other drawers
drawers.push(
  new drawer(svm_linear, document.getElementById("svm-linear-canvas"), {
    margin: {
      soft: true
    },
    boosted: true
  })
);
drawers.push(
  new drawer(svm_poly, document.getElementById("svm-poly-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(svm_rbf, document.getElementById("svm-rbf-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(knn, document.getElementById("knn-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(rbf, document.getElementById("rbf-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(randf, document.getElementById("randf-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(logreg, document.getElementById("logreg-canvas"), {
    margin: {
      soft: true
    }
  })
);
drawers.push(
  new drawer(nn, document.getElementById("nn-canvas"), {
    margin: {
      soft: true
    }
  })
);

document.getElementById("go").addEventListener("click", () => {
  ui.setAllOptions();
  manager.notifyAll();
});

let btns = document.getElementsByClassName("execute");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    ui.setOptionsOfSet(drawers[i]);
    manager.notify(drawers[i]);
  });
}

let N = 50;
let label_slider = document.createElement("label");
label_slider.innerHTML = "N:" + N;
label_slider.for = "N";
let slider = document.createElement("input");
slider.id = "N";
slider.type = "range";
slider.value = 50;
slider.min = 10;
slider.max = 300;
slider.step = 10;
slider.addEventListener("change", () => {
  N = slider.value;
  label_slider.innerHTML = "N:" + N;
});
document.getElementById("datasets").appendChild(label_slider);
document.getElementById("datasets").appendChild(slider);
let ui = new UI(document, generator);

let dataset_btns = document.getElementsByClassName("datasets");
for (let i = 0; i < dataset_btns.length; i++) {
  dataset_btns[i].addEventListener("click", () => {
    let res = ui.generateDataSet(dataset_btns[i].id, N);
    manager.setDataSet(res.data, res.labels);
    manager.notifyAll();
  });
}

ui.createOptionsFrom(svm_linear, document.getElementById("svm-linear-options"));
ui.createOptionsFrom(drawers[0], document.getElementById("svm-linear-options"));
ui.createOptionsFrom(svm_poly, document.getElementById("svm-poly-options"));
ui.createOptionsFrom(drawers[1], document.getElementById("svm-poly-options"));
ui.createOptionsFrom(svm_rbf, document.getElementById("svm-rbf-options"));
ui.createOptionsFrom(drawers[2], document.getElementById("svm-rbf-options"));
ui.createOptionsFrom(knn, document.getElementById("knn-options"));
ui.createOptionsFrom(drawers[3], document.getElementById("knn-options"));
ui.createOptionsFrom(rbf, document.getElementById("rbf-options"));
ui.createOptionsFrom(drawers[4], document.getElementById("rbf-options"));
ui.createOptionsFrom(randf, document.getElementById("randf-options"));
ui.createOptionsFrom(drawers[5], document.getElementById("randf-options"));
ui.createOptionsFrom(logreg, document.getElementById("logreg-options"));
ui.createOptionsFrom(drawers[6], document.getElementById("logreg-options"));
ui.createOptionsFrom(nn, document.getElementById("nn-options"));
ui.createOptionsFrom(drawers[7], document.getElementById("nn-options"));

drawers.forEach(drawer => manager.subscribe(drawer));
manager.notifyAll();
