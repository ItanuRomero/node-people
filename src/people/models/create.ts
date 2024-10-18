import { pool } from '../../database';
import { People } from '../schemas/post'
import { v4 as uuidv4 } from 'uuid'

export async function create(people: People) {
  const id = uuidv4()
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