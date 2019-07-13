[![Build Status](https://travis-ci.com/davide97g/ml-es6-modules.svg?branch=master)](https://travis-ci.com/davide97g/ml-es6-modules)
![GitHub](https://img.shields.io/github/license/davide97g/ml-es6-modules.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/davide97g/ml-es6-modules.svg)
![GitHub package.json version](https://img.shields.io/github/package-json/v/davide97g/ml-es6-modules.svg)

# ml-es6-modules

## Machine learning as ES6 modules

Browser-ready machine learning algorithms as ES6 modules.

> ## `Warning`:
>
> These modules are created to be used in a browser with the ES6 syntax. If you want to just use the modules in a node environment you have to do the following steps:
>
> - convert `import` to `require` notation
> - convert `export` to `module.exports` notation

## Demo

A live demo is available [here](https://davide97g.github.io/ml-es6-modules/).

# Documentation

Documentation can be found [here](https://davide97g.github.io/ml-es6-modules/docs/index.html).

## ES6 modules

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
>
> - `async defer` attributes inside script tag : no need to wrap code with jquery document-ready statement
> - `type="module"` if you want to load the script server-side (for es6 modules loading)

## Algorithms

- Support Vector Machine with different kernels:
  - linear
  - polynomial
  - radial-basis-function (gaussian)
- KNN
- Radial-basis function
- Random Forests
- Logistic Regression
- Neural Net
  - multiple layers with costum definition

All algorithms are es6 module. The files needed for the algorithm to work are located in his directory, except for the utility functions.

All algorithms share the basic structure.

Example

```javascript
export const algorithm = function() {}; // expose this function
algorithm.prototype = {
  // define the function
  train: function(data, labels) {
    //set up the environment
    //train
    //stored results
  },
  predict: function(point) {
    //returns the value predicted
  },
  predictClass: function(point) {
    //returns the class predicted
  },
  getOptions: function() {
    //returns an object to be used by the "ui" class
  },
  setOptions: function(options) {
    //set the options
  }
};

// helper functions if needed
```

# Webpack

A bundler for javascript code: you can use nodejs modules in the brower. All js files will be merged and transpiled into one bundle (index.bundle.js), generated into the `./dist` folder.

To build the source code run in the command line, inside the `package.json` directory:

```
npm install
```

Now you have installed webpack and the project dependecies. Now you can build with:

```
npm run build
```

To be able to watch the files and automatically build on changes, just run the command:

```
npm run watch
```

## Support on Beerpay

Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/davide97g/ml-es6-modules/badge.svg?style=beer-square)](https://beerpay.io/davide97g/ml-es6-modules) [![Beerpay](https://beerpay.io/davide97g/ml-es6-modules/make-wish.svg?style=flat-square)](https://beerpay.io/davide97g/ml-es6-modules?focus=wish)
