import { pool } from '../../database';

export async function count() {
    const query = `
    SELECT COUNT(1) FROM pessoas;
    `
    return pool.query(query);
}