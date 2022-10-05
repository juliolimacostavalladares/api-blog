import { getConnection, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Post } from "../entity/Post";

export default {
    async index(request: Request, response: Response) {
        const post = await getRepository(Post).find();

        if (!post) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        return response.status(200).json(post)
    },

    async findByCategory(request: Request, response: Response) {
        const { category_name } = request.params
        const post = await getRepository(Post).find({
            relations: ['category'],
            where: {
                category: {
                    category: category_name,
                }
            }
        });

        if (!post) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        return response.status(200).json(post)
    },

    async last(request: Request, response: Response) {
        const post = await getRepository(Post).findOne({ select: ["id", "post", "title", "author", "mainImage", "images", "created_at", "updated_at"], order: { id: 'DESC' } });

        if (!post) {
            return response.status(404).json({ message_error: 'Not exists posts' })
        }

        return response.status(200).json(post)
    },

    async paginating(request: Request, response: Response) {
        const { init, limit } = request.params
        const init_ = +init
        const limit_ = +limit

        const post = await getRepository(Post).find({ order: { id: 'ASC' }, skip: init_, take: limit_ })

        post.forEach(images => {
            delete images.images
        })

        if (!post) {
            return response.status(404).json({ message_error: 'Not exists this page' })
        }

        return response.status(200).json(post)
    },

    async findOne(request: Request, response: Response) {
        const { id } = request.params

        const post = await getRepository(Post).findOne(id)

        if (!post) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        return response.status(200).json(post)
    },

    async drop(request: Request, response: Response) {
        const { id } = request.params

        const post = await getRepository(Post).findOne(id)

        if (!post) {
            return response.status(404).json({ message_error: 'Post not exists' })
        }

        await getRepository(Post).delete(post)

        return response.status(200).json(post)
    },

    async save(request: Request, response: Response) {
        const postRepo = getConnection().getRepository(Post);

        const { title, post, author, mainImage, images, category } = request.body

        const posts = postRepo.create({ post, title, author, mainImage, images, category })

        if (!title || !author || !post || !mainImage || !images) {
            return response.status(400).json({ message_error: 'Insert all data needed' })
        }

        await postRepo.save(posts)
        return response.status(201).json(posts)
    }
}