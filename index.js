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
    database: 'admin_db'
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
            viewDepartments();
            break;
        
          case 'View all Employees':
            viewEmployees();
            break;    

          case 'View all Roles':
            viewRoles();
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

  // Shows all departments present in the table
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
      start();
    });
  }
  
  
  // Shows all employees present in the table
  function viewEmployees() {
      db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', function (err, results) {
          console.table(results);
          start();
        });
    }
    
    // Shows all roles present in the table
  function viewRoles() {
      db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        start();
      });
    }

  // Inserts new department to be present in the table
  function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the desired department?',
        name: 'department_name',
      }
    ])
      .then((answers) => {
        db.query('INSERT INTO department(name) VALUES(?)', answers.department_name, function (err, results) {
          console.table(results);
          start();
        })
      })
  }
  
  // Inserts new roles to be present in the table
  function addRole() {
    db.query('SELECT * FROM department', (err, results) => {
      let departmentName = results.map((department) => {
        return {
          name: department.name,
          value: department.id,
        };
      });
  
      inquirer.prompt([
        {
          type: 'input',
          message: 'What is the name of the desired role?',
          name: 'role_name',
        },
        {
          type: 'input',
          message: 'What is the Salary of the role?',
          name: 'role_salary',
        },
        {
          type: 'list',
          message: 'What is the department that this role belongs to?',
          name: 'department_name',
          choices: departmentName
        }
      ])
        .then((answers) => {
          db.query('INSERT INTO role SET ?',
            {
              title: answers.role_name,
              salary: answers.role_salary,
              department_id: answers.department_name
            },
            function (err) {
              if (err) throw err;
            }
          );
          viewRoles()
        });
    });
  };
  
  // Inserts new employees to be present in the table
  function addEmployee() {
    db.query('SELECT * FROM role', (err, results) => {
      let roleName = results.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
  
      inquirer.prompt([
        {
          type: 'input',
          message: 'Employees first name?',
          name: 'first_name',
        },
        {
          type: 'input',
          message: 'Employees last name?',
          name: 'last_name',
        },
        {
          type: 'input',
          message: 'What is their manager id number?',
          name: 'manager_id',
        },
        {
          type: 'list',
          message: 'Role the employee is in?',
          name: 'role',
          choices: roleName
        }
      ])
        .then((answers) => {
          db.query('INSERT INTO employee SET ?',
            {
              first_name: answers.first_name,
              last_name: answers.last_name,
              role_id: answers.role,
              manager_id: answers.manager_id
            },
            function (err) {
              if (err) throw err;
            }
          );
          viewEmployees()
        });
    });
  };
  
  // Query database to update a current employee from the table
  function updateEmployee() {
    db.query('SELECT * FROM employee', (err, results) => {
      let employeeName = results.map((employee) => {
        return {
          name: employee.first_name,
          value: employee.id,
        };
      });
  
      // Query database to grab all roles and map each one into there own array
      db.query('SELECT * FROM role', (err, results) => {
        let roleName = results.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
  
        inquirer.prompt([
          {
            type: 'list',
            message: 'What is the name of employee?',
            name: 'name',
            choices: employeeName
          },
          {
            type: 'list',
            message: 'What is the name of the new role?',
            name: 'newRole',
            choices: roleName
          }
        ])
          .then((answers) => {
            db.query('UPDATE employee SET ? WHERE ?',
              [
                {
                  role_id: answers.newRole
                },
                {
                  id: answers.name
                },
              ],
              function (err) {
                if (err) throw err;
              }
            );
            viewEmployees()
          });
      });
    });
  };