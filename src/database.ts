import pg from 'pg'

const URL = 'postgresql://postgres:minhasenha@localhost:5432/postgres'

const pool = new pg.Pool({
    connectionString: URL,
    max: (Number(process.env.DB_POOL) || 200),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 10000
});

pool.on('error', connect);

async function connect() {
    try {
        console.log(`Connecting to db ${URL}`);
        await pool.connect();
    } catch (err) {
        setTimeout(() => {
            connect();
            console.log(`database.js: an error occured when connecting ${err} retrying connection on 3 secs`);
        }, 3000)
    }
}

pool.once('connect', () => {
    console.log(`database.js: Connected  to db ${URL}`)
    console.log(`Creating table "pessoas" if not exists`);
    return pool.query(`
        CREATE EXTENSION IF NOT EXISTS pg_trgm;

        CREATE OR REPLACE FUNCTION generate_searchable(_nome VARCHAR, _apelido VARCHAR, _stack JSON)
            RETURNS TEXT AS $$
            BEGIN
            RETURN _nome || _apelido || _stack;
            END;
        $$ LANGUAGE plpgsql IMMUTABLE;

        CREATE TABLE IF NOT EXISTS pessoas (
            id uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
            apelido TEXT UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            nascimento DATE NOT NULL,
            stack JSON,
            searchable text GENERATED ALWAYS AS (generate_searchable(nome, apelido, stack)) STORED
        );

        CREATE INDEX IF NOT EXISTS idx_pessoas_searchable ON public.pessoas USING gist (searchable public.gist_trgm_ops (siglen='64'));

        CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_index ON public.pessoas USING btree (apelido);
        `)
});

connect()

export { pool }