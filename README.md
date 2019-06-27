[![Build Status](https://travis-ci.com/davide97g/ml-es6-modules.svg?branch=master)](https://travis-ci.com/davide97g/ml-es6-modules)
![GitHub](https://img.shields.io/github/license/davide97g/ml-es6-modules.svg)
![Coveralls github](https://img.shields.io/coveralls/github/davide97g/ml-es6-modules.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/davide97g/ml-es6-modules.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/davide97g/ml-es6-modules.svg)

# machine-learning-es6-webpack

Some test with machine learning algorithms, es6 modules and webpack.

## es6 modules

ECMAScript standard for importing and exporting features between javascript files.

Example:

```javascript
//index.js

import {MyFunction} from './module1.js'; //named import
import {add, sub} from './module2.js'; //multiple named import
import defaultF from './module1.js'; //default import

let f = new MyFunction();
export const newFunction = function(){
    console.info("I'm a brand new function ready to be exported");
}
export default DefaultFunction(){
    console.info("I'm default");
}
```

## algorithms

- svm
  - linear
  - polynomial
  - radial-basis-function (gaussian)
- knn
- rbf
- random forest
- logistic regression
- neural net
  - multiple layers with costum definition

Every algorithm is an es6 module. All the files needed for the algorithm to work are present in his directory.

Every algorithm share the basic structure.

Example

```javascript
export const algorithm = function() {}; // expose this function
algorithm.prototype = {
  // define the function
  train: function(data, labels, options) {
    //set up the environment
    //train
    //stored results
  },
  predict: function(point) {
    //returns the value predicted
  },
  predictClass: function(point) {
    //returns the class predicted
  }
};

// helper functions if needed
```

# webpack

A bundler for javascript code: you can use nodejs modules in the brower. All js files will be merged and transpiled into one bundle (index.bundle.js), generated into the `./dist` folder.

To build the source code just run in the command line:

```
npm run build
```

To be able to watch the files and automatically build, just run the command:

```
npm run watch
```
