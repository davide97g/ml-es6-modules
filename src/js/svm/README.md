# svm

Simple implementation of Nearest Neighbor algorithm for binary classification in javascript.

## Usage

### Import

#### ES6 syntax

```javascript
import { SVM } from "./path/svm";
```

#### npm module

```javascript
const SVM require('./path/svm');
```

### Variables

```javascript
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

let options = {
  kernel: "linear"
};
```

### Initialize

```javascript
let svm = new SVM();
```

### Training

```javascript
svm.train(data, labels, options);
```

#### Prediction

```javascript
let point = [2, 4];
svm.predict(point); // 0 <= value <= 1
svm.predictClass(point); // value = 1 || value = -1
```

### Options

```javascript
options = {
  kernel: "linear", // "linear" | "poly" | "rbf" | "sigm"
  C: 1, // number > 0
  tol: 1e-4, // numerical tolerance
  alphatol: 0, // non-support vector tolerance
  maxiter: 10000, // max # of iterations in partial SMO
  numpasses: 10, // # of passes over data with no change
  SSCA: false, // smoothed separable case approximation algorithm
  .
  .
  .
};
```
