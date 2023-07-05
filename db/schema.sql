DROP DATABASE IF EXISTS admin_db;
-- Creation/Use admin_db --
CREATE DATABASE admin_db;

USE admin_db;

-- create the table called department in admin_db --
CREATE TABLE department (
    -- creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- makes a string column called "name" which cannot contain null --
    name VARCHAR(30) NOT NULL
);

-- create the table called employee in admin_db --
CREATE TABLE employee (
    -- creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- makes a string column called "first_name" which cannot contain null --
    first_name VARCHAR(30) NOT NULL,
    -- makes a string column called "last_name" which cannot contain null --
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);

-- create the table called role in company_db --
CREATE TABLE role (
    -- creates a numeric column called "id" which will automatically increment its default value as we create new rows --
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- makes a string column called "title" which cannot contain null --
    title VARCHAR(30) NOT NULL,
    -- makes a numeric column called "salary" which cannot contain null --
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);