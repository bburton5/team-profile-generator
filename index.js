// Includes packages needed for this application
const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const team = [];

const managerPrompts = () => {
  return inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the employee's name?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the employee's id number?",
      },
      {
        name: "email",
        type: "input",
        message: "What is the employee's email?",
      },
      {
        name: "office",
        type: "input",
        message: "What is your manager's office number?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.office
      );
      team.push(manager);
      next();
    });
};

const next = () => {
  return inquirer
    .prompt([
      {
        name: "add",
        type: "list",
        message: "Would you like to add another employee to the team?",
        choices: ["Yes", "No"],
      },
    ])
    .then((confirmation) => {
      console.log(confirmation);
      console.log(confirmation.add);
      if (confirmation.add === "Yes") {
        console.log("running Yes case");
        typePrompt();
      } else if (confirmation.add === "No") {
        console.log("running No case");
        generateTeam();
      }
    });
};

const typePrompt = () => {
  console.log("typePrompt functioning");
  return inquirer
    .prompt([
      {
        name: "title",
        type: "list",
        message: "Which type of employee would you like to add?",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((type) => {
      console.log(type);
      console.log(type.title);
      if (type.title === "Engineer") {
        engineerPrompt();
      } else if (type.title === "Intern") {
        internPrompt();
      }
    });
};

const engineerPrompt = () => {
  console.log("engineerPrompt functioning");
  return inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the engineer's name?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the engineer's id number?",
      },
      {
        name: "email",
        type: "input",
        message: "What is the engineer's email?",
      },
      {
        name: "github",
        type: "input",
        message: "What is the engineer's github username?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      next();
    });
};

const internPrompt = () => {
  console.log("intern prompt functioning");
  return inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the intern's name?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the intern's id number?",
      },
      {
        name: "email",
        type: "input",
        message: "What is the intern's email?",
      },
      {
        name: "school",
        type: "input",
        message: "What school is the intern from?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
      next();
    });
};

const generateTeam = () => {
  console.log("generating team...");
  console.log(team);
};

const instructions = () => {
  console.log("Instructions:");
  console.log(
    "The first four questions are in regards to your team manager. All questions afterwards are in regards to all employee types except manager."
  );
};

instructions();
managerPrompts();
