const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const service = require('../controllers/service');

router.post('/register',service.register);
router.post('/login',service.login)

router.get('/Get',authMiddleware(),(req,res)=>{
    return res.send(`Hello ${req.user.fullname}`)
})

module.exports = router;