const A = require('./A');

class App {
  constructor(name) {
    this.name = name;
  }
}


function* howMany() {
  console.log(A + ',' + App);
}



module.exports = howMany;

