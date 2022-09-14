const Employee = require("./employee");

class Manager extends Employee {
  constructor(officeNumber) {
    super(Employee);
    this.officeNumber = officeNumber;
  }
  getRole() {
    console.log(`Manager`);
  }
}

module.exports = Manager;
