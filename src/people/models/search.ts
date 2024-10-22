import { pool } from '../../database';

export async function search(term: string) {
    const query = `
    SELECT 
        id,
        apelido,
        nome,
        nascimento,
        stack
    FROM pessoas
    WHERE searchable ILIKE $1 
    LIMIT 10;
    `
    return pool.query(query, [
        `%${term}%`
    ]);
}