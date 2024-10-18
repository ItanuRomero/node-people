import { Request, Response } from "express";
import { validatePeople } from "../schemas/post";
import { create } from "../models/create";

export async function createPeople(req: Request, res: Response) {
    const { body } = req

    const validation = validatePeople(body)
    if (validation.error) {
        res.status(validation.statusCode).json({ error: validation.error });
    }

    const response = await create(validation.value)

    res.status(201).json({ message: 'User created', response });
}