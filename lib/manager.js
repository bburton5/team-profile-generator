const Employee = require("./employee");

class Manager extends Employee {
  constructor(office) {
    super(Employee);
    this.office = office;
  }
  getRole() {
    console.log(`Manager`);
  }
}

module.exports = Manager;
