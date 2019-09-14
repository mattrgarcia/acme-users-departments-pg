const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');
const client = new Client('postgres://localhost/acme-users-departments');

client.connect();

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
`;

const syncAndSeed = async()=> {
  await client.query(SQL);
};

syncAndSeed();


