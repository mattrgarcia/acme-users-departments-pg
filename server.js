const express = require('express');
const db = require('./db.js');
const path =  require('path');
const app = express();

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/departments', async(req, res, next)=> {
  try {
    const departments = await db.findAllDepartments();
    res.send(departments);
  }
  catch(ex){
    next(ex)
  }
});
app.get('/api/users', async(req, res, next)=> {
  try {
    const users = await db.findAllUsers();
    res.send(users);
  }
  catch(ex){
    next(ex)
  }
});

db.syncAndSeed()
.then (()=> app.listen(3000, ()=> console.log('listening on port 3000')));
;
