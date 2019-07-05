import { LogisticRegression as LOGREG } from "./logreg/logreg";
import { SVM } from "./svm/svm";
import { KNN } from "./knn/knn";
import { RBF } from "./rbf/rbf";
import { RandomForest as RANDF } from "./randf/randf";
import { drawer, master_drawer } from "./drawer";
import { NeuralNet } from "./nn/nn";
import { Manager } from "./manager";
import { UI } from "./ui";
import { dataset_generator } from "./dataset";

let manager = new Manager();
let generator = new dataset_generator();

// let radioXY = document.getElementById("xy");
// radioXY.addEventListener("click", () => {
//   data = selectPredictors(multi, 0, 1);
//   drawers.forEach(drawer => drawer.draw(data, labels));
// });

// let radioYZ = document.getElementById("yz");
// radioYZ.addEventListener("click", () => {
//   data = selectPredictors(multi, 1, 2);
//   drawers.forEach(drawer => drawer.draw(data, labels));
// });

// let radioXZ = document.getElementById("xz");
// radioXZ.addEventListener("click", () => {
//   data = selectPredictors(multi, 0, 2);
//   drawers.forEach(drawer => drawer.draw(data, labels));
// });

// let MARGIN = document.getElementById("margin");
// MARGIN.addEventListener("click", () => {
//   let margin;
//   if (MARGIN.checked) margin = "soft";
//   else margin = "hard";
//   drawers.forEach(drawer => drawer.setOptions({ margin: margin }));
//   drawers.forEach(drawer => drawer.draw(data, labels));
// });

let multi = [
  [1, 0, 2],
  [2, 3, 4],
  [5, 4, 6],
  [2, 7, 5],
  [0, 3, 7],
  [-1, 0, -2],
  [-3, -4, -4],
  [-2, -2, -1],
  [-1, -1, -3],
  [-5, -2, -5]
];

let data = selectPredictors(multi, 0, 1);
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
  input_functions: {
    x2: true
  },
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
  input_functions: {},
  karpathy: true,
  timer: null
};
svm_poly.setOptions(svm_poly_options);
svm_poly.train(multi, labels);

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
  input_functions: {},
  karpathy: true,
  timer: null
};
svm_rbf.setOptions(svm_rbf_options);
svm_rbf.train(multi, labels);

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
knn.train(multi, labels);

let rbf = new RBF();
let rbf_options = {
  epsilon: 0.1,
  rbfSigma: 0.5
};
rbf.setOptions(rbf_options);
rbf.train(multi, labels);

let randf = new RANDF();
let randf_options = {
  numTrees: 100
};
randf.setOptions(randf_options);
randf.train(data, labels);

let logreg = new LOGREG();
let logreg_options = {};
logreg.setOptions(logreg_options);
logreg.train(multi, labels);

let nn = new NeuralNet();
let nn_options = {};
nn.setOptions(nn_options);
nn.train(multi, labels);

// // update canvas on mouseclick
// let mouseClick = ({ x, y, shiftPressed }) => {
//   // store point
//   data.push([
//     (x - master.WIDTH / 2) / master.ss,
//     (y - master.HEIGHT / 2) / master.ss
//   ]);
//   labels.push(shiftPressed ? 1 : -1);

//   // draw master
//   master.draw(data, labels);

//   // train
//   training(data, labels);

//   // draw all
//   manager.notifyAll(data, labels);
// };

let drawers = [];
// //master canvas with mouse click event listener
// let master_canvas = document.getElementById("draw-canvas-test");
// let master = new master_drawer(master_canvas, mouseClick, {});
// master.draw(data, labels);

//create the other drawers
drawers.push(
  new drawer(svm_linear, document.getElementById("svm-linear-canvas"), {
    margin: {
      soft: true
    }
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

let btns = document.getElementsByClassName("execute");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    ui.setAllOptions();
    manager.notifyAll();
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

//_______________

// function training(data, labels) {
//   svm_linear.train(data, labels);
//   svm_poly.train(data, labels);
//   svm_rbf.train(data, labels);
//   knn.train(data, labels);
//   rbf.train(data, labels);
//   randf.train(data, labels);
//   logreg.train(data, labels);
//   nn.train(data, labels);
// }

function selectPredictors(data, chosen1, chosen2) {
  let predictors = [];
  data.forEach(point => predictors.push([point[chosen1], point[chosen2]]));
  return predictors;
}
