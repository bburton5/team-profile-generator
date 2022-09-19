// Includes packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
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
  generateWebsite("index.html", team);
};

const generateWebsite = (fileName, data) => {
  fs.writeFile(fileName, mainHtml(data), function (err, data) {
    console.log(Error);
  });
};

const generateCards = (team) => {
  const html = [];

  const managerCard = (manager) => {
    // console.log(manager);
    let managerHtml = ` <div class="card" style="width: 18rem;">
      <div class="card-body">
        <p class="card-text">
        Name: ${manager.name} <br>
        Employee ID Number: ${manager.id} <br>
        Email: <a href="mailto:${manager.email}">${manager.email}</a><br>
        Office Number: ${manager.office}</p>
      </div>
    </div>
    `;
    html.push(managerHtml);
  };

  const engineerCard = (engineer) => {
    // console.log(engineer);
    let engineerHtml = ` <div class="card" style="width: 18rem;">
      <div class="card-body">
        <p class="card-text">
        Name: ${engineer.name} <br>
        Employee ID Number: ${engineer.id} <br>
        Email: <a href="mailto:${engineer.email}">${engineer.email}</a><br>
        Github: <a href=https://github.com/${engineer.github} target="_blank">${engineer.github}</a></p>
      </div>
    </div>
    `;
    html.push(engineerHtml);
  };

  const internCard = (intern) => {
    // console.log(intern);
    let internHtml = ` <div class="card" style="width: 18rem;">
      <div class="card-body">
        <p class="card-text">
        Name: ${intern.name} <br>
        Employee ID Number: ${intern.id} <br>
        Email: <a href="mailto:${intern.email}">${intern.email}</a><br>
        School: ${intern.school}</p>
      </div>
    </div>
    `;
    html.push(internHtml);
  };

  for (let i = 0; i < team.length; i++) {
    console.log(i);
    console.log(team[i]);
    if (team[i].getRole() === "Manager") {
      managerCard(team[i]);
    } else if (team[i].getRole() === "Engineer") {
      engineerCard(team[i]);
    } else if (team[i].getRole() === "Intern") {
      internCard(team[i]);
    }
  }

  return html.join("");
};

const mainHtml = (data) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Generator</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="./dist/style.css">
    </head>
    <body>
    <header>
    <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
      Your Team
    </a>
  </nav>
  </header>
        ${generateCards(data)}
    </body>
    </html>`;
};

managerPrompts();
