import { Request, Response, Router } from "express"
import { createPeople } from "./controllers/post"

const routes = Router()

routes.post('/pessoas', createPeople)

routes.get('/pessoas/:id', (req: Request, res: Response) => {
    res.status(201).send()
})

routes.get('/pessoas', (req: Request, res: Response) => {
    res.status(201).send()
})

routes.get('/contagem-pessoas', (req: Request, res: Response) => {
    res.status(201).send()
})

export default routes