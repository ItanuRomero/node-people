import { Request, Response, Router } from "express"
import { createPeople } from "./controllers/post"
import { getPeople } from "./controllers/get"
import { searchPeople } from "./controllers/search"

const routes = Router()

routes.post('/pessoas', createPeople)

routes.get('/pessoas/:id', getPeople)

routes.get('/pessoas', searchPeople)

routes.get('/contagem-pessoas', (req: Request, res: Response) => {
    res.status(201).send()
})

export default routes