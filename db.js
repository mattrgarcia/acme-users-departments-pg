const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');
const client = new Client('postgres://localhost/acme-users-departments');

client.connect();

const hrId = uuid.v4();
const salesId = uuid.v4();
const marketingId = uuid.v4();
const itId = uuid.v4();
const user1Id = uuid.v4();

const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS departments;
  CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255)
  );
  CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    department_id UUID REFERENCES departments(id)
  );
  INSERT INTO departments (id, name) values('${hrId}', 'HR Department');
  INSERT INTO departments (id, name) values('${salesId}', 'Sales Department');
  INSERT INTO departments (id, name) values('${marketingId}', 'Marketing Department');
  INSERT INTO departments (id, name) values('${itId}', 'IT Department');
  INSERT INTO users(id, name, department_id) values('${user1Id}', 'Matt','${itId}');
`;

const syncAndSeed = async ()=> {
  await client.query(SQL);
};
const findAllDepartments = async ()=> {
  const response = await client.query('SELECT * FROM departments');
  return response.rows;
};
const findAllUsers = async ()=> {
  const response = await client.query('SELECT * FROM users');
  return response.rows;
};


module.exports = {
  syncAndSeed,
  findAllDepartments,
  findAllUsers
}
