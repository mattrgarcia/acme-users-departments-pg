const express = require('express');
const db = require('./db.js');
const app = express();

db.syncAndSeed();
