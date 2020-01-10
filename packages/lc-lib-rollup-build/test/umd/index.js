(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.RollupLibBuild = factory());
}(this, (function () { 'use strict';

  class A {
    constructor(name) {
      this.name = name;
    }

  }

  var A_1 = A;

  class App {
    constructor(name) {
      this.name = name;
    }

  }

  function* howMany() {
    console.log(A_1 + ',' + App);
  }

  var src = howMany;

  return src;

})));
