const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');
const client = new Client('postgres://localhost/acme-users-departments');
const faker = require('faker');

client.connect();

const hrId = uuid.v4();
const salesId = uuid.v4();
const marketingId = uuid.v4();
const itId = uuid.v4();

const mattId = uuid.v4();
const robId = uuid.v4();
const moeid = uuid.v4();
const curlyId = uuid.v4();
const larryId = uuid.v4();
const newId = uuid.v4();

const randBio = () => {
  return faker.lorem.paragraph();
};



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
    bio TEXT,
    department_id UUID REFERENCES departments(id)
  );
  INSERT INTO departments (id, name) values('${hrId}', 'HR Department');
  INSERT INTO departments (id, name) values('${salesId}', 'Sales Department');
  INSERT INTO departments (id, name) values('${marketingId}', 'Marketing Department');
  INSERT INTO departments (id, name) values('${itId}', 'IT Department');
  INSERT INTO users(id, name, bio, department_id) values('${mattId}', 'Matt', '${randBio()}', '${itId}');
  INSERT INTO users(id, name, bio, department_id) values('${robId}', 'Rob', '${randBio()}', '${marketingId}');
  INSERT INTO users(id, name,  bio, department_id) values('${moeid}', 'Moe', '${randBio()}', '${salesId}');
  INSERT INTO users(id, name,  bio, department_id) values('${curlyId}', 'Curly', '${randBio()}', '${hrId}');
  INSERT INTO users(id, name,  bio, department_id) values('${larryId}', 'Larry','${randBio()}', '${marketingId}');
  INSERT INTO users(id, name,  bio, department_id) values('${newId}', 'New Employee', '${randBio()}', NULL);
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
