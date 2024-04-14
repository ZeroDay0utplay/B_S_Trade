class QueryService{
    constructor(psqlPool){
        this.psqlPool = psqlPool;
    }

    async query(sqlCMD) {
        try {
            const result = await this.psqlClient.query(sqlCMD);
            return result;
        } catch (error) {
            return "Query ERROR";
        }
    }
}

module.exports = QueryService;