import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Category } from "../entity/Category";

export default {
    async index(request: Request, response: Response) {
        const category = await getRepository(Category).find();

        if (!category) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        return response.status(200).json(category)
    },

    async findOne(request: Request, response: Response) {
        const { id } = request.params

        const category = await getRepository(Category).findOne(id)

        if (!category) {
            return response.status(404).json({ message_error: "Category don't exists" })
        }

        return response.status(200).json(category)
    },

    async drop(request: Request, response: Response) {
        const { id } = request.params

        const category = await getRepository(Category).findOne({
            relations: ['posts'],
            where: {
                id: id
            }
        })

        if (!category) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        await getRepository(Category).remove(category)

        return response.status(200).json(category)
    },

    async save(request: Request, response: Response) {
        const { category_name, image_category } = request.body
        const category = await getRepository(Category).create({ category: category_name, imageCategory: image_category });


        if (!category) {
            return response.status(400).json({ message_error: 'Insert some category' })
        }

        await getRepository(Category).save(category)

        return response.status(201).json(category)
    },

    async relate(request: Request, response: Response) {
        const { category_name } = request.body
        const category = await getRepository(Category).findOne({ relations: category_name })


        if (!category) {
            return response.status(400).json({ message_error: 'Insert some category' })
        }

        await getRepository(Category).save(category)

        return response.status(201).json(category)
    }
}