import { BaseRepository } from "./base.repository";

export class CassandraRepository implements BaseRepository {
  insert(data: any): Promise<any> {
    return Promise.resolve(null);
  }

  findById(id: string): Promise<any> {
    return Promise.resolve(null);
  }
}
