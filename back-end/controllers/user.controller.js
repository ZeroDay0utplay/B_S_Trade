const { query } = require("express");
const loginService = require("../services/login.service");


async function loginController(req, res, next){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const pool = req.pool;
        const result = await loginService.login(email, password, pool);
        if (result=="user logged in successfully") res.status(200).send(result);
        else res.status(404).send(result);
    } catch (error) {
        res.status(500);
        next(error);
    }
}   


module.exports = {loginController};