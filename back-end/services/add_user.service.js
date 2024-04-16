const QueryService = require("./query.service");



async function add_user(email, password, full_name, job){
    try {
        const querySerice = new QueryService(pool).psqlPool;
        const result = await querySerice.query(`SELECT * FROM users WHERE email = '${email}';`);
        const data = result.rows;
        if (data.length > 0) return "User already exists";
        
    } catch (error) {
        return "Query ERROR";
    }

}