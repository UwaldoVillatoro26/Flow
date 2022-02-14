const express = require('express');
const jwt = require('jwt-simple');
const UserService = require('../services/activate-user');

function userApi(app) {
    const router = express.Router();
    app.use("/api/activate-user", router);

    const userService = new UserService();
    console.log();

    router.put("/", async function (req, res, next) {
        const { body: user } = req;
        try {
            const usr = await userService.getUser(user.id);
            if (usr) {
                const decoded = jwt.decode(usr.token, 'dog');
                if (decoded.exp && decoded.sub === user.tk) {
                    usr.status = true;
                    const updateUsr = await userService.updateUser(usr, usr._id);
                    res.status(200).json({
                        data: updateUsr,
                        example: updateUsr,
                        message: 'user selected successfully'
                    });
                }
            }
        } catch (err) {
            next(err);
        }
    });

}

module.exports = userApi;