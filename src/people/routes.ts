import { Request, Response, Router } from "express"
import { createPeople } from "./controllers/post"
import { getPeople } from "./controllers/get"
import { searchPeople } from "./controllers/search"
import { getPeopleCount } from "./controllers/count"

const routes = Router()

routes.post('/pessoas', createPeople)

routes.get('/pessoas/:id', getPeople)

routes.get('/pessoas', searchPeople)

routes.get('/contagem-pessoas', getPeopleCount)

export default routes