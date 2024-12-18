import { Request, Response } from "express";
import { detail } from "../models/detail";
import { isValidUUID } from "../../utils/validateUUID";

export async function getPeople(req: Request, res: Response) {
    const { id } = req.params

    if (!id || !isValidUUID(id)) {
        res.status(404).send()
        return
    }

    try {
        const response = await detail(id)

        if (response?.rowCount && response.rowCount > 0) {
            res.status(200).json(response.rows[0])
            return
        }

        res.status(404).send()
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
    return
}