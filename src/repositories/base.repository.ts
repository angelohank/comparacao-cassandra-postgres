export interface BaseRepository {
  insert(data: any): Promise<any>;
}
