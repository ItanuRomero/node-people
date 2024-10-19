import { Request, Response } from "express";
import { count } from "../models/count";

export async function getPeopleCount(req: Request, res: Response) {
    try {
        const response = await count()

        if (response?.rowCount && response.rowCount > 0) {
            const row = response.rows[0]
            const { count } = row
            res.status(200).send(count)
            return
        }

        res.status(400).send()
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
    return
}