import { databaseInfo } from "src/infrastructure/database/database-info";
import { DataSource } from "typeorm";

export class DatabaseUtils {
    connection: DataSource
    constructor (){
        
    }

    async initializeDB(){
        this.connection = new DataSource({...databaseInfo});
        await this.connection.initialize();
        const exists = await this.exists();
        
        if(!exists) await this.createDB();
    }


    async exists(){
        const exists = await this.connection.query(`SELECT datname FROM pg_database WHERE datname = '${process.env.TYPEORM_DATABASE}'`);
        return !!exists[0];

    }

    async createDB(){
        const result = await this.connection.query(`CREATE DATABASE "${process.env.NODE_ENV === 'test' ? process.env.TYPEORM_TEST_DATABASE : process.env.TYPEORM_DATABASE}"`);
        return !!result;
    }
};