import { Request, Response } from "express";
import { search } from "../models/search";

export async function searchPeople(req: Request, res: Response) {
    const { t } = req.query

    if (!t || typeof t !== 'string') {
        res.status(400).send()
        return
    }

    try {
        const response = await search(t)

        if (response?.rowCount && response.rowCount > 0) {
            res.status(200).json(response.rows)
            return
        }

        res.status(200).json([])
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
    return
}