import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(public connection:DataSource) { }

    public async getRepository<T>(entity: any): Promise<Repository<T>> {
        return this.connection.getRepository(entity);
    }
}