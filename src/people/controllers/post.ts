import { Request, Response } from "express";
import { validatePeople } from "../schemas/post";
import { create } from "../models/create";
import { v4 as uuidv4 } from 'uuid'

export async function createPeople(req: Request, res: Response) {
    const { body } = req

    const validation = validatePeople(body)
    if (validation.error) {
        res.status(validation.statusCode).json({ error: validation.error });
    }

    const id = uuidv4()

    const response = await create(id, validation.value)

    if (response?.rowCount && response.rowCount > 0) {
        res.status(201).header('Location', `/pessoas/${id}`).send();
    }
    res.status(422).send()
}