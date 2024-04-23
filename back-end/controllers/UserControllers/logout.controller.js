

async function logout(req, res, next){
    try {
        res.clearCookie("access_token");
        res.status(200).json({message: "Logged out"});
    } catch (error) {
        res.status(500);
        next(error);
    }
}

module.exports = {logout};