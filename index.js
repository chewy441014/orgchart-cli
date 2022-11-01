/*
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/

// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

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
  {
    type: 'input', name: 'addDept', message: 'What is the department name? ', when: (answers) => answers.menu === "Add Department"
  },
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
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the org_chart database.`)
);

// Query database
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
    console.log(`\n`);
    console.log(`\n`);
  });
}

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
    console.log(`\n`);
    console.log(`\n`);
  });
}

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
    console.log(`\n`);
    console.log(`\n`);
  });
}

function addDepartment(name) {
  console.log(name);
  db.query(`INSERT INTO department (name) VALUES (?)`, name, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

function editDepartment(newName, id) {
  const params = [newName, id];
  db.query(`UPDATE department SET name = ? WHERE id = ?`, params, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

function addRole(jobTitle, salary, department_id) {
  const values = [jobTitle, salary, department_id];
  console.log(values);
  db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

function addEmployee(firstName, lastName, roleID, managerID) {
  const values = [firstName, lastName, roleID, managerID];
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, values, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(`\n`);
    console.table(results);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
    console.log(`\n`);
  });
}

function updateEmployeeRole(roleID, employeeID) {
  const values = [roleID, employeeID];
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;
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
    console.log(`\n`);
    console.log(`\n`);
  });
}

function updateEmployeeManager(managerID, employeeID) {
  const values = [managerID, employeeID];
  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
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
    console.log(`\n`);
    console.log(`\n`);
  });
}

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
    console.log(`\n`);
    console.log(`\n`);
  });
}

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
    console.log(`\n`);
    console.log(`\n`);
  });
}

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
    console.log(`\n`);
    console.log(`\n`);

  });
}

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
/*
["View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department", // needs user prompt
        "Edit Department", // needs user prompt
        "Add Role", // needs user prompt
        "Add Employee", // needs user prompt
        "Update Employee Role", // needs user prompt
        "Update Employee Manager", // needs user prompt
        "View Employee by Manager",
        "View Employee by Department",
        "View Budgets of All Departments",
        "---- Quit ----"]
*/

function answerHandler(answers) {
  // To Do
  // console.log(answers);
  let questionText = questions[0].choices;
  switch (answers.menu) {
    case questionText[0]:
      // console.log(questionText[0], " AND ", answers.menu)
      viewAllDepartments();
      break;
    case questionText[1]:
      // console.log(questionText[1], " AND ", answers.menu)
      viewAllRoles();
      break;
    case questionText[2]:
      // console.log(questionText[2], " AND ", answers.menu)
      viewAllEmployees();
      break;
    case questionText[3]:
      // console.log(questionText[3], " AND ", answers.menu)
      addDepartment(answers.addDept);
      break;
    case questionText[4]:
      // console.log(questionText[4], " AND ", answers.menu)
      editDepartment(answers.editDeptName, answers.editDeptID);
      break;
    case questionText[5]:
      // console.log(questionText[5], " AND ", answers.menu)
      // console.log(answers);
      addRole(answers.addRoleJob, answers.addRoleSalary, answers.addRoleDeptID);
      break;
    case questionText[6]:
      // console.log(questionText[6], " AND ", answers.menu)
      addEmployee(answers.addEmployeeFirst, answers.addEmployeeLast, answers.addEmployeeRole, answers.addEmployeeManager);
      break;
    case questionText[7]:
      // console.log(questionText[7], " AND ", answers.menu)
      updateEmployeeRole(answers.updateEmployeeRoleID, answers.updateEmployeeID);
      break;
    case questionText[8]:
      // console.log(questionText[8], " AND ", answers.menu)
      updateEmployeeManager(answers.updateManagerID, answers.updateManagerEmployeeID);
      break;
    case questionText[9]:
      // console.log(questionText[9], " AND ", answers.menu)
      viewEmployeesByManager(answers.viewByManager);
      break;
    case questionText[10]:
      // console.log(questionText[10], " AND ", answers.menu)
      viewEmployeesByDepartment(answers.viewByDept);
      break;
    case questionText[11]:
      // console.log(questionText[11], " AND ", answers.menu)
      viewDepartmentBudgets();
      break;
  }
}

function onLoad() {
  questionLoop();
}

onLoad();