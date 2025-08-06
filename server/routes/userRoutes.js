const { Router } = require('express');
const router= Router()

const {registerUser,loginUser,getAllUserLists,deleteUserById} = require('../controller/userControllers')
router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/users",getAllUserLists);

router.delete("/users/:id",deleteUserById);

module.exports = router;