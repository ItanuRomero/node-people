import { pool } from '../../database';
import { People } from '../schemas/post'

export async function create(id: string, people: People) {

  try {
    const query = `
    INSERT INTO
     pessoas(
        id,
        apelido,
        nome,
        nascimento,
        stack
     )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5::json
    )
    ON CONFLICT (apelido) DO NOTHING;
    `
    return pool.query(query, [
      id,
      people.apelido,
      people.nome,
      people.nascimento,
      JSON.stringify(people.stack)
    ]);
  } catch (error) {
    console.error(error)
  }
}