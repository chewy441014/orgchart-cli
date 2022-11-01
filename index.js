// Import and require mysql2
const mysql = require('mysql2');
// Import and require inquirer
const inquirer = require('inquirer');
// Import and configure dotenv
require('dotenv').config();

// setup questions for inquirer
// with this structure, the bulk of the flow is handled by the inquirer question object itself
// when is used to ask questions based on previous choices
const questions = [
  {
    type: 'list', name: 'menu', message: 'Select a database option: ', choices:
      ["View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department", // needs user prompt
        "Edit Department", // needs user prompt
        "Add Role", // needs user prompt
        "Add Employee", // needs user prompt
        "Update Employee Role", // needs user prompt
        "Update Employee Manager", // needs user prompt
        "View Employee by Manager", // needs user prompt
        "View Employee by Department", // needs user prompt
        "View Budgets of All Departments",
        "---- Quit ----"],
  },
  // With each block of relevant questions, the related function which will use the user's input are listed
  // addDepartment(name)
  {
    type: 'input', name: 'addDept', message: 'What is the department name? ', when: (answers) => answers.menu === "Add Department"
  },
  // editDepartment(newName, id)
  {
    type: 'input', name: 'editDeptName', message: 'Enter the modified department name: ', when: (answers) => answers.menu === "Edit Department"
  },
  {
    type: 'number', name: 'editDeptID', message: 'Enter the modified department id: ', when: (answers) => answers.menu === "Edit Department"
  },
  // addRole(jobTitle, salary, department_id) 
  {
    type: 'input', name: 'addRoleJob', message: 'Enter the new job title: ', when: (answers) => answers.menu === "Add Role"
  },
  {
    type: 'number', name: 'addRoleSalary', message: 'Enter the new salary: ', when: (answers) => answers.menu === "Add Role"
  },
  {
    type: 'number', name: 'addRoleDeptID', message: 'Enter the department id for this role: ', when: (answers) => answers.menu === "Add Role"
  },
  //addEmployee(firstName, lastName, roleID, managerID)
  {
    type: 'input', name: 'addEmployeeFirst', message: 'Enter the employee first name: ', when: (answers) => answers.menu === "Add Employee"
  },
  {
    type: 'input', name: 'addEmployeeLast', message: 'Enter the employee last name: ', when: (answers) => answers.menu === "Add Employee"
  },
  {
    type: 'number', name: 'addEmployeeRole', message: 'Enter the employees role id : ', when: (answers) => answers.menu === "Add Employee"
  },
  {
    type: 'number', name: 'addEmployeeManager', message: 'Enter the employee manager id: ', when: (answers) => answers.menu === "Add Employee"
  },
  //updateEmployeeRole(roleID, employeeID)
  {
    type: 'number', name: 'updateEmployeeRoleID', message: 'Enter the new employee role id: ', when: (answers) => answers.menu === "Update Employee Role"
  },
  {
    type: 'number', name: 'updateEmployeeID', message: 'Enter the employee id: ', when: (answers) => answers.menu === "Update Employee Role"
  },
  // updateEmployeeManager(managerID, employeeID)
  {
    type: 'number', name: 'updateManagerID', message: 'Enter the new manager id: ', when: (answers) => answers.menu === "Update Employee Manager"
  },
  {
    type: 'number', name: 'updateManagerEmployeeID', message: 'Enter the employee id: ', when: (answers) => answers.menu === "Update Employee Manager"
  },
  // viewEmployeesByManager(managerID)
  {
    type: 'number', name: 'viewByManager', message: 'Enter the manager id: ', when: (answers) => answers.menu === "View Employee by Manager"
  },
  // viewEmployeesByDepartment(departmentID)
  {
    type: 'number', name: 'viewByDept', message: 'Enter the department id: ', when: (answers) => answers.menu === "View Employee by Department"
  }
];

// Connect to database
// Using the environment variables from .env file here
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the org_chart database.`)
);

// function to view all departments
function viewAllDepartments() {
  db.query(`SELECT 
  id AS "Dept Num", 
  name AS "Department Name" 
  FROM department`, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// function to view all roles
function viewAllRoles() {
  db.query(`SELECT 
  role.id AS "Role ID", 
  title AS "Job Title", 
  salary AS Salary, 
  name AS Department 
  FROM role JOIN department ON role.department_id = department.id`, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// function to view all employees
function viewAllEmployees() {
  db.query(`SELECT 
  employee.id AS ID,
  employee.first_name AS "First Name", 
  employee.last_name as "Last Name", 
  role.title AS "Job Title", 
  department.name AS Department, 
  role.salary AS Salary, 
  manager.first_name AS "Manager"
  FROM employee JOIN role ON employee.role_id = role.id 
  JOIN department ON role.department_id = department.id 
  LEFT OUTER JOIN employee manager ON employee.manager_id = manager.id`, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// function to add department name
function addDepartment(name) {
  console.log(name);
  db.query(`INSERT INTO department (name) VALUES (?)`, name, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to edit department name for deparment id
function editDepartment(newName, id) {
  const params = [newName, id];
  db.query(`UPDATE department SET name = ? WHERE id = ?`, params, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to add a role
function addRole(jobTitle, salary, department_id) {
  const values = [jobTitle, salary, department_id];
  console.log(values);
  db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to add employee
function addEmployee(firstName, lastName, roleID, managerID) {
  const values = [firstName, lastName, roleID, managerID];
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to update employee role
function updateEmployeeRole(roleID, employeeID) {
  const values = [roleID, employeeID];
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to update employee manager
function updateEmployeeManager(managerID, employeeID) {
  const values = [managerID, employeeID];
  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.log("Changes made: ", results.affectedRows);
    console.log(`\n`);
  });
}

// function to view employees by manager
function viewEmployeesByManager(managerID) {
  const values = [managerID];
  const sql = `SELECT first_name AS "First Name", last_name AS "Last Name" FROM employee WHERE manager_id = ?`;
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// function to view employees by department
function viewEmployeesByDepartment(departmentID) {
  const values = [departmentID];
  const sql = `SELECT first_name AS "First Name", last_name AS "Last Name" 
  FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department_id = ?`;
  db.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// function to view the budget for all departments
function viewDepartmentBudgets() {
  const sql = `SELECT 
  department.name AS Department, 
  SUM(role.salary) AS Budget 
  FROM employee JOIN role ON employee.role_id = role.id 
  JOIN department ON role.department_id = department.id GROUP BY department.name`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

// recursively navigates through the inquirer prompt and passes the answers to a large switch case
// process.exit on quit takes the user back to the terminal when they quit
function questionLoop() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      if (answers.menu !== "---- Quit ----") {
        answerHandler(answers);
        questionLoop();
      } else {
        process.exit(0);
      }
    });
}

// function to call the relevant database function based on the answers provided
// each case corresponds to one of the selections on the main menu, 
// the answers object is available with additional properties, for querying
function answerHandler(answers) {
  let questionText = questions[0].choices;
  switch (answers.menu) {
    case questionText[0]:
      viewAllDepartments();
      break;
    case questionText[1]:
      viewAllRoles();
      break;
    case questionText[2]:
      viewAllEmployees();
      break;
    case questionText[3]:
      addDepartment(answers.addDept);
      break;
    case questionText[4]:
      editDepartment(answers.editDeptName, answers.editDeptID);
      break;
    case questionText[5]:
      addRole(answers.addRoleJob, answers.addRoleSalary, answers.addRoleDeptID);
      break;
    case questionText[6]:
      addEmployee(answers.addEmployeeFirst, answers.addEmployeeLast, answers.addEmployeeRole, answers.addEmployeeManager);
      break;
    case questionText[7]:
      updateEmployeeRole(answers.updateEmployeeRoleID, answers.updateEmployeeID);
      break;
    case questionText[8]:
      updateEmployeeManager(answers.updateManagerID, answers.updateManagerEmployeeID);
      break;
    case questionText[9]:
      viewEmployeesByManager(answers.viewByManager);
      break;
    case questionText[10]:
      viewEmployeesByDepartment(answers.viewByDept);
      break;
    case questionText[11]:
      viewDepartmentBudgets();
      break;
  }
}

// function to start the program
function onLoad() {
  questionLoop();
}

onLoad();