const express = require('express')
const router = express.Router()
const {getUser, getUserById, updateUser} = require('../controllers/user')
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth')

//is signed in  =>   user only signin and can see the data of other users
//is authenticated => user can access to modify the data
router.param("userId", getUserById)
router.get("/user/:userId", isSignedIn,isAuthenticated, getUser)
router.put("/user/:userId", isSignedIn,isAuthenticated,updateUser)

module.exports = router