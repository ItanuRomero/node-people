
import express from 'express'
import routes from './people/routes';

const app = express();

app.use(express.json())

app.use(routes)

app.listen(9999, () => console.log('server running on port 3333'))
