const express = require('express')
const api = express.Router()
const{registerUser} = require('../controllers/userControllers')

api.post("/register", registerUser)