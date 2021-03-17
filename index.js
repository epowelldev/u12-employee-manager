const db = require("./db/index");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const { newRole, newDepartment, newEmployee, newEmployeeRole } = require("./db/index");

function askForAction() {
  console.log("");
  inquirer
    .prompt({
      message: "Choose something to do.",
      name: "action",
      type: "list",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Role",
        "Add Employee",
        "Add Department",
        "Update Employee Role",
        "EXIT"
      ]
    }).then(function(answer) {
      switch (answer.action) {
        case "View Departments":
          // view departments
          viewDepartments();
          break;
        case "View Roles":
          // view roles
          viewRoles();
          break;
        case "View Employees":
          // view employees
          viewEmployees();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        default:
          connection.end();
      }
    })
}

function viewDepartments() {
  db.getDepartments()
    .then((results) => {
      console.log("\n");
      console.table(results);
      console.log("\n");
    }).catch((error) => console.log(error));
  
    askForAction();
  }

function viewRoles() {
  db.getRoles()
    .then((results) => {
      console.log("\n");
      console.table(results);
      console.log("\n");
    }).catch((error) => console.log(error));
  
    askForAction();
  }

function viewEmployees() {
  db.getEmployees()
    .then((results) => {
      console.log("\n");
      console.table(results);
      console.log("\n");
    }).catch((error) => console.log(error));
  
  askForAction();
}

function addDepartment() {
  inquirer
    .prompt([
      {
        message: "Enter a new department name:",
        name: "name",
        type: "input"
      }
    ])
    .then((results) => {
      newDepartment(results);
      console.log("\n New Department Added. \n")
      askForAction();
    }).catch((error) => console.log(error));
}

function addEmployee() {

  db
    .getRoles()
    .then((roles) => {
      const roleChoices = roles.map((role) => ({
          value: role.id,
          name: role.title
      }))

      db
        .getEmployees()
        .then((employees) => {
          const employeeChoices = employees.map((employee) => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
          }))

            inquirer
              .prompt([
                {
                  message: "Choose a job for the new employee:",
                  name: "role_id",
                  type: "list",
                  choices: roleChoices
                },
                {
                  message: "Enter employee's first name:",
                  type: "input",
                  name: "first_name",
                },
                {
                  message: "Enter employee's last name:",
                  type: "input",
                  name: "last_name",
                },
                {
                  message: "Choose a manager:",
                  name: "manager_id",
                  type: "list",
                  choices: employeeChoices
                }])
              .then((results) => {
                newEmployee(results);
                console.log("\n New Employee Added. \n");
                askForAction();
              }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
}

function addRole() {
  db
    .getDepartments()
    .then((departments) => {
      const departmentChoices = departments.map((department) => ({
        value: department.id,
        name: department.name
      }))

        inquirer
          .prompt([
            {
              message: "Choose a department:",
              name: "department_id",
              type: "list",
              choices: departmentChoices
            },
            {
              message: "Name your role:",
              type: "input",
              name: "title"
            },
            {
              message: "What is the salary of the role?",
              name: "salary",
              type: "number"
            }
          ]).then((results) => {
            newRole(results);
            console.log("\n Role added. \n");
            askForAction();
          }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
}

function updateEmployeeRole() {
  db
    .getRoles()
    .then((roles) => {
      const roleChoices = roles.map((role) => ({
          value: role.id,
          name: role.title
      }))

      db
        .getEmployees()
        .then((employees) => {
          const employeeChoices = employees.map((employee) => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`
          }))
          inquirer
              .prompt([
                {
                  message: "Choose a manager:",
                  name: "id",
                  type: "list",
                  choices: employeeChoices
                },
                {
                  message: "Choose a new job for employee:",
                  name: "role_id",
                  type: "list",
                  choices: roleChoices
                }])
              .then((results) => {
                newEmployeeRole(results);
                console.log("\n Employee Role Updated. \n");
                askForAction();
              }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
}

askForAction();
