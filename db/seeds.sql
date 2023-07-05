USE admin_db;

INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Lead Engineer', 165000, 1),
('Software Engineer', 130000, 1),
('Sales Lead', 115000, 2),
('Salesperson', 70000, 2),
('Account Manager', 120000, 3),
('Acountant', 100000, 3),
('Legal Team Lead', 215000, 4),
('Lawyer', 175000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES
('Jon', 'Blohm', null, 1),
('Stephen', 'Eades', null, 2),
('Jeff', 'Cripe', null, 3),
('Dan', 'Cipollone', 1, 4),
('Dom', 'Yorio', 4, 5),
('Alex', 'Popp', 1, 6),
('Jacob', 'Connor', 2, 7),
('Justin', 'Drushal', 3, 8);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;