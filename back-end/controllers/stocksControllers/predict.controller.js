async function predict(req, res, next){
    try {
        res.status(200).json({message: 200});
    } catch (error) {
        res.status(500);
    }
}


module.exports = {predict}