import { Request, Response } from "express";
import { validatePeople } from "../schemas/post";

export function createPeople(req: Request, res: Response) {
    const { body } = req

    const validation = validatePeople(body)
    if (validation.error) {
        return res.status(validation.statusCode).json({ error: validation.error });
    }

    const user = validation.value

    res.status(201).json({ message: 'User created', user });
}