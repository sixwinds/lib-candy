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

export default src;
