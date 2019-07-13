# Logistic Regression

Simple implementation of Logistic Regression for binary classification in javascript.

## Usage

### Import

#### ES6 syntax

```javascript
import { LogisticRegression } from "./path/logreg";
```

#### npm module

```javascript
const LogisticRegression = require("./path/nn").LogisticRegression;
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
let options = {};
```

### Initialize

```javascript
let logreg = new LogisticRegression();
```

### Training

```javascript
logreg.train(data, labels, options);
```

#### Prediction

```javascript
let point = [2, 4];
nn.predict(point); // 0 <= value <= 1
nn.predictClass(point); // value = 1 || value = -1
```

### Options

```javascript
options = {
  alpha: 0.001,
  iterations: 100,
  lambda: 0
};
```
