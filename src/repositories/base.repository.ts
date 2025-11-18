export interface BaseRepository {
  insert(data: any): Promise<any>;
  findById(id: string): Promise<any>;
}
