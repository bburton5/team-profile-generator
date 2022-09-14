const Employee = require("./employee");

class Engineer extends Employee {
  constructor(github) {
    super(Employee);
    this.github = github;
  }
  getGithub() {
    console.log(`${this.github}`);
  }
  getRole() {
    console.log(`Engineer`);
  }
}

module.exports = Engineer;
