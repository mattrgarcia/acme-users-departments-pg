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


const tierOneId = uuid.v4();
const tierTwoId = uuid.v4();
const tierThreeId = uuid.v4();



const randBio = () => {
  return faker.lorem.paragraph();
};


const SQL = `
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS tiers;
  DROP TABLE IF EXISTS departments;

  CREATE TABLE tiers (
    id UUID PRIMARY KEY,
    tier VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255)
  );

  CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    bio TEXT,
    department_id UUID REFERENCES departments(id),
    tier_id UUID REFERENCES tiers(id)
  );




  INSERT INTO departments (id, name) values('${hrId}', 'HR Department');
  INSERT INTO departments (id, name) values('${salesId}', 'Sales Department');
  INSERT INTO departments (id, name) values('${marketingId}', 'Marketing Department');
  INSERT INTO departments (id, name) values('${itId}', 'IT Department');

  INSERT INTO tiers (id, tier) values('${tierOneId}', 'Tier 1');
  INSERT INTO tiers (id, tier) values('${tierTwoId}', 'Tier 2');
  INSERT INTO tiers (id, tier) values('${tierThreeId}', 'Tier 3');

  INSERT INTO users(id, name, bio, tier_id, department_id) values('${mattId}', 'Matt', '${randBio()}', '${tierOneId}', '${itId}');
  INSERT INTO users(id, name, bio, tier_id, department_id) values('${robId}', 'Rob', '${randBio()}', '${tierOneId}', '${marketingId}');
  INSERT INTO users(id, name,  bio, tier_id, department_id) values('${moeid}', 'Moe', '${randBio()}', '${tierOneId}', '${salesId}');
  INSERT INTO users(id, name,  bio, tier_id, department_id) values('${curlyId}', 'Curly', '${randBio()}', '${tierOneId}', '${hrId}');
  INSERT INTO users(id, name,  bio, tier_id, department_id) values('${larryId}', 'Larry','${randBio()}', '${tierOneId}', '${marketingId}');
  INSERT INTO users(id, name,  bio, tier_id, department_id) values('${newId}', 'New Employee', '${randBio()}', '${tierOneId}', NULL);
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
