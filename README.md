[![Build Status](https://travis-ci.com/davide97g/ml-es6-modules.svg?branch=master)](https://travis-ci.com/davide97g/ml-es6-modules)
![GitHub](https://img.shields.io/github/license/davide97g/ml-es6-modules.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/davide97g/ml-es6-modules.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/davide97g/ml-es6-modules.svg)

# machine-learning-es6-webpack

Some test with machine learning algorithms, es6 modules and webpack.

## demo
A live demo is available [here](https://davide97g.github.io/ml-es6-modules/).

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

> Script loading into html file could be done in different ways depending on your needs:
> - `async defer` attributes inside script tag : no need to wrap code with jquery document-ready statement
> - `type="module"` if you want to load the script server-side (for es6 modules loading) 

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

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/davide97g/ml-es6-modules/badge.svg?style=beer-square)](https://beerpay.io/davide97g/ml-es6-modules)  [![Beerpay](https://beerpay.io/davide97g/ml-es6-modules/make-wish.svg?style=flat-square)](https://beerpay.io/davide97g/ml-es6-modules?focus=wish)