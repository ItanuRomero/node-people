
import express from 'express'
import routes from './people/routes';

const PORT = 8080

const app = express()

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
