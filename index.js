// Importing inquirer/mysql/and cTable
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Put MySQL username
    user: '',
    // Put MySQL password
    password: '',
    database: 'company_db'
  },
  console.log(`Congrats - You are connected to the Companies Database.`)
);

start();

function start() {
    // Call inquirer to ask the users what they want to do
    inquirer
      .prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'board',
          choices: ['View all Departments', 'View all Employees', 'View all Roles',
            'Add a Department', 'Add an Employee', 'Add a Role', 'Update an Employee Role']
        }
      ])
      .then((answers) => {
        console.log(answers.board);
        switch (answers.board) {
          case 'View all Departments':
            viewAllDepatments();
            break;
        
          case 'View all Employees':
            viewAllEmployees();
            break;    

          case 'View all Roles':
            viewAllRoles();
            break;
  
          case 'Add a Department':
            addDepartment();
            break;
        
          case 'Add a Role':
            addRole();
            break;

          case 'Add an Employee':
            addEmployee();
            break;
  
          case 'Update an Employee Role':
            updateEmployee();
            break;
  
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }