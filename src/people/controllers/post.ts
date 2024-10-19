import { Request, Response } from "express";
import { validatePeople } from "../schemas/post";
import { create } from "../models/create";
import { v4 as uuidv4 } from 'uuid'

export async function createPeople(req: Request, res: Response) {
    const { body } = req

    const validation = validatePeople(body)
    if (validation.error) {
        return res.status(validation.statusCode).json({ error: validation.error });
    }

    try {
        const id = uuidv4()
        const response = await create(id, validation.value)

        if (response?.rowCount && response.rowCount > 0) {
            return res.status(201).header('Location', `/pessoas/${id}`).send();
        }

        return res.status(422).send()
    } catch (error) {
        console.error(error)
        return res.status(500).send()
    }
}