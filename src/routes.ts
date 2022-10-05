import { Router } from "express";
import CategoryController from "./controller/CategoryController";
import PostController from "./controller/PostController";

const routes = Router()

//Posts Routes
routes.get('/posts/list', PostController.index)
routes.get('/post/last_post', PostController.last)
routes.get('/post/:id', PostController.findOne)
routes.get('/post/category/:category_name', PostController.findByCategory)
routes.get('/post/init=:init/limit=:limit', PostController.paginating)
routes.post('/post/create', PostController.save)
routes.delete('/post/delete/:id', PostController.drop)

//Category Routes
routes.get('/category/list', CategoryController.index)
routes.get('/category/:id', CategoryController.findOne)
routes.post('/category/create', CategoryController.save)
routes.delete('/category/delete/:id', CategoryController.drop)

export { routes }