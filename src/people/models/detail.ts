import { pool } from '../../database';

export async function detail(id: string) {
    const query = `
    SELECT * FROM pessoas
    WHERE id = $1;
    `
    return pool.query(query, [
        id,
    ]);
}