class QueryService{
    constructor(psqlPool){
        this.psqlPool = psqlPool;
    }

    async query(sqlCMD) {
        const result = await this.psqlClient.query(sqlCMD);
        return result;
    }
}

module.exports = QueryService;