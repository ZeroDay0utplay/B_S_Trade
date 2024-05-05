async function getController(req, res, next){
    try {
        res.status(200);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
}

module.exports = {getController};