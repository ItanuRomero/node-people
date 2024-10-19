import { pool } from '../../database';

export async function search(term: string) {
    const query = `
    SELECT * FROM pessoas
    WHERE searchable ILIKE $1 
    LIMIT 50;
    `
    return pool.query(query, [
        `%${term}%`
    ]);
}