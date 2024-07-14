import type { Request, Response } from "express";
import Videos from "../models/Videos";

export class VideoController {

    static createVideo = async (req: Request, res: Response) => {
        const video = new Videos(req.body)

        // Asigna un manager
        video.manager = req.user.id
        try {
            await video.save() 
            res.send('Proyecto Creando Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static getAllVideos = async (req: Request, res: Response) => {
        try {
            const projects = await Videos.find({
                $or: [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            })
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }
}