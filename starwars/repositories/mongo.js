const MongoClient = require('mongodb').MongoClient;

class MongoConnection {

    static async getConnection(){
        // Connection URL
        const url = process.env.MONGO_URL;
        const dbName = process.env.MONGO_DB;
        let client;
        try {
            client = await MongoClient.connect(url);
            const db = client.db(dbName);
            return {client, db};
        } catch (err) {
            console.log(err.stack);
        }
        this.close(client);
    }

    static close(client){
        if (client) {
            client.close();
        }
    }

    static async testConnection(){
        let {client, db} = await this.getConnection();
        this.close(client);
        return db !== undefined;
    }

}

module.exports = MongoConnection;
